import React, { useState, useEffect, useReducer } from 'react';
import {
  GlobalStyle,
  Container,
  Content,
  Builds,
  StyledHero,
  EmptyHero,
  Synergies,
  EmptyBuilds,
  SelectedHeroesPanel,
  SelectedHeroesGroup,
  Synergy,
  SynergyNumbers,
  Button,
  ButtonGroup,
  SynergyIcon,
  SynergyNumber,
  SynergyTextContent,
  SynergyTotalCount,
} from './components/styles';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import heroes from './heroes.json';
import sum from 'hash-sum';
import { BuildListing } from './components/BuildListing';
import { synergies } from './utils/constants';
import { darkTheme } from './utils/theme';
import { formatAlliance } from './utils/helpers';
import { HeroList } from './components/HeroList';

function App() {
  const [selectedAlliances, setSelectedAlliances] = useState([]);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [selectedBuild, setSelectedBuild] = useState();
  const [activeSynergies, dispatch] = useReducer(synergyReducer, synergies);
  const [builds, setBuilds] = useState({});
  useEffect(() => {
    const storedBuilds = JSON.parse(localStorage.getItem('localStorageBuilds')) || null;
    if (storedBuilds !== null) {
      setBuilds(storedBuilds);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('localStorageBuilds', JSON.stringify(builds));
  }, [builds]);

  function synergyReducer(activeSynergies, [type, payload]) {
    const nextState = {};
    switch (type) {
      case 'increment':
        payload.forEach((alliance) => {
          nextState[alliance] = {
            ...activeSynergies[alliance],
            points: activeSynergies[alliance].points + 1,
          };
        });
        return {
          ...activeSynergies,
          ...nextState,
        };
      case 'decrement':
        payload.forEach((alliance) => {
          nextState[alliance] = {
            ...activeSynergies[alliance],
            points: activeSynergies[alliance].points - 1,
          };
        });
        return {
          ...activeSynergies,
          ...nextState,
        };
      case 'load':
        return payload;
      default:
        return activeSynergies;
    }
  }

  const onAllianceClick = (alliance) => {
    if (selectedAlliances.includes(alliance)) {
      setSelectedAlliances(selectedAlliances.filter((selectedAlliance) => selectedAlliance !== alliance));
    } else {
      setSelectedAlliances([...selectedAlliances, alliance]);
    }
  };

  const removeSelectedHero = (e, alliances, selectedHero) => {
    // if user clicks within an alliance icon, they're filtering and not removing the selected hero
    if (e.target.id.startsWith('alliance')) return;
    setSelectedHeroes(selectedHeroes.filter((hero) => hero !== selectedHero));
    setSelectedBuild('');
    dispatch(['decrement', alliances]);
  };

  const loadBuild = ({ heroes, synergies }, key) => {
    setSelectedHeroes(heroes);
    setSelectedBuild(key);
    dispatch(['load', synergies]);
  };

  const favoriteBuild = (value, key) => {
    setBuilds({
      ...builds,
      [key]: { ...value, isFavorite: !value.isFavorite },
    });
  };

  const updateBuild = (value, key, name) => {
    setBuilds({
      ...builds,
      [key]: { ...value, name },
    });
  };

  const saveBuild = () => {
    const hashedBuild = sum({
      heroes: selectedHeroes,
      synergies: activeSynergies,
    });
    setSelectedBuild(hashedBuild);
    setBuilds({
      ...builds,
      [hashedBuild]: {
        name: 'Enter a name',
        isFavorite: false,
        heroes: selectedHeroes,
        synergies: activeSynergies,
      },
    });
  };

  const clearBuild = () => {
    setSelectedHeroes([]);
    setSelectedBuild('');
    dispatch(['load', synergies]);
  };

  const deleteBuild = () => {
    setSelectedHeroes([]);
    dispatch(['load', synergies]);
    const hashedBuild = sum({
      heroes: selectedHeroes,
      synergies: activeSynergies,
    });
    const { [hashedBuild]: omit, ...nextBuilds } = builds;
    setBuilds(nextBuilds);
  };

  const deleteAllBuilds = () => {
    setSelectedHeroes([]);
    dispatch(['load', synergies]);
    setBuilds({});
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <GlobalStyle />
        <Content>
          <div>
            <Builds>
              {Object.keys(builds).length > 0 ? (
                Object.entries(builds)
                  // try removing array notation
                  .sort((a, b) => {
                    if (a[1].isFavorite === b[1].isFavorite) {
                      return a[1].name.toLowerCase() - b[1].name.toLowerCase();
                    } else {
                      return Number(b[1].isFavorite) - Number(a[1].isFavorite);
                    }
                  })
                  .map((entry) => {
                    const [key, value] = entry;
                    return (
                      <BuildListing
                        key={key}
                        isActive={selectedBuild === key}
                        build={value}
                        handleClick={() => loadBuild(value, key)}
                        handleStarClick={() => favoriteBuild(value, key)}
                        updateBuildName={(name) => updateBuild(value, key, name)}
                      >
                        {value.name}
                      </BuildListing>
                    );
                  })
              ) : (
                <EmptyBuilds>You have no saved builds.</EmptyBuilds>
              )}
            </Builds>
            <ButtonGroup>
              <Button onClick={saveBuild}>Save</Button>
              <Button onClick={clearBuild}>Clear Selection</Button>
              <Button onClick={deleteBuild}>Delete This Build</Button>
              <Button onClick={deleteAllBuilds}>Delete All Builds</Button>
            </ButtonGroup>
          </div>
          <HeroList
            onAllianceClick={onAllianceClick}
            setSelectedHeroes={setSelectedHeroes}
            selectedHeroes={selectedHeroes}
            selectedAlliances={selectedAlliances}
            setSelectedBuild={setSelectedBuild}
            dispatch={dispatch}
          />
          <SelectedHeroesPanel>
            <SelectedHeroesGroup>
              {selectedHeroes.map((selectedHero) => {
                const { name, alliances } = heroes[selectedHero];
                return (
                  <StyledHero
                    key={selectedHero}
                    displayName={name}
                    unformattedName={selectedHero}
                    alliances={alliances}
                    shouldDisplay={true}
                    onAllianceClick={(alliance) => onAllianceClick(alliance)}
                    onClick={(e) => removeSelectedHero(e, alliances, selectedHero)}
                  />
                );
              })}
              {[...Array(10 - selectedHeroes.length)].map((_, i) => (
                <EmptyHero key={`empty-${i}`} />
              ))}
            </SelectedHeroesGroup>
            <Synergies>
              {Object.values(activeSynergies).map(({ name, points, stepSize, maxPoints }) => {
                return (
                  <Synergy key={name}>
                    <SynergyIcon
                      alliance={name}
                      formattedAlliance={formatAlliance(name)}
                      size={32}
                      isActive={points >= stepSize}
                      onClick={() => onAllianceClick(name)}
                    />
                    <SynergyTextContent>
                      <SynergyTotalCount>{points}</SynergyTotalCount>
                      <div>
                        {name}
                        <SynergyNumbers>
                          {[...Array(maxPoints / stepSize)].map((_, i) => {
                            const step = (i + 1) * stepSize;
                            return <SynergyNumber isActive={step <= points}>{step}</SynergyNumber>;
                          })}
                        </SynergyNumbers>
                      </div>
                    </SynergyTextContent>
                  </Synergy>
                );
              })}
            </Synergies>
          </SelectedHeroesPanel>
        </Content>
      </Container>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
