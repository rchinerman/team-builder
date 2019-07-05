import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import heroes from './heroes.json';
import sum from 'hash-sum';

import { Hero } from './components/Hero';
import { AllianceIcon } from './components/AllianceIcon';
import { BuildListing } from './components/BuildListing';
import { alliances, synergies } from './utils/constants';
import { darkTheme } from './utils/theme';
import { formatAlliance, getAllianceColorFromName } from './utils/helpers';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${props => props.theme.background};
    color: white;
    font-family: 'Open Sans', sans-serif;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100vw;
  margin-top: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 2.5vw;
  justify-content: center;
`;

const Alliances = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0px;
`;

const HeroList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  align-self: flex-start;
  max-width: 40%;
  background: ${props => props.theme.secondaryBackground};
  border-radius: 5px;
  box-shadow: 0 0 0 1px ${props => props.theme.highlight};
  margin: 10px;
  padding-bottom: 20px;
`;

const SelectedHeroesPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
`;

const StyledHero = styled(Hero)`
  margin: 4px;
  box-shadow: 0 0 0 1px ${props => props.theme.highlight};
  overflow: hidden;
`;

const StyledAllianceIcon = styled(AllianceIcon)`
  opacity: ${props => (props.isActive ? 1 : 0.3)};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: ${props => (props.isActive ? getAllianceColorFromName(props.formattedAlliance) : props.theme.background)};
  margin: 4px;
`;

const SelectedHeroesGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  background: ${props => props.theme.secondaryBackground};
  box-shadow: 0 0 0 1px ${props => props.theme.highlight};
  border-radius: 5px;
  padding: 20px;
  width: 420px;
  margin-bottom: 10px;
`;

const StyledHeroWithBorder = styled(StyledHero)`
  filter: ${props => (props.isSelected ? 'grayscale(100%)' : 'none')};
  opacity: ${props => (props.isSelected ? 0.4 : 1)};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const EmptyHero = styled.div`
  height: 76px;
  width: 76px;
  margin: 4px;
  box-shadow: 0 0 0 1px ${props => props.theme.highlight};
  border-radius: 5px;
`;

const Synergies = styled.div`
  width: 420px;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  background: ${props => props.theme.secondaryBackground};
  box-shadow: 0 0 0 1px ${props => props.theme.highlight};
  border-radius: 5px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const SynergyIcon = styled(AllianceIcon)`
  margin-right: 8px;
  opacity: ${props => (props.isActive ? 1 : 0.3)};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: ${props => (props.isActive ? getAllianceColorFromName(props.formattedAlliance) : props.theme.background)};
`;

const Synergy = styled.div`
  display: flex;
  width: 80px;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 8px;
`;

const SynergyMarkers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  height: 74px;
`;

const SynergyMarker = styled.div`
  width: 8px;
  flex: 0 1 ${props => 60 / props.stepSize}px;
  box-shadow: ${props => `0 0 0 1px ${props.theme.highlight}`};
  opacity: ${props => (props.isFilled ? 1 : 0.6)};
  background: ${props => (props.isFilled ? getAllianceColorFromName(props.alliance) : '')};
  margin: 2px;
  border-radius: 4px;
`;

const Button = styled.button`
  background: none;
  border: none;
  margin: 8px;
  margin-top: 0;
  padding: 8px;
  border-radius: 3px;
  box-shadow: 0 0 0 1px ${props => props.theme.highlight};
  color: ${props => props.theme.highlight};
  background: ${props => props.theme.secondaryBackground};
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-2px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const Builds = styled.div`
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  flex-direction: column;
  align-self: flex-start;
  width: 15%;
  background: ${props => props.theme.secondaryBackground};
  box-shadow: 0 0 0 1px ${props => props.theme.highlight};
  margin: 10px;
`;

const EmptyBuilds = styled.div`
  padding: 16px 24px;
  background: ${props => (props.isActive ? props.theme.purple : 'transparent')};
  font-size: 16px;
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.highlight};
  }
`;

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
        payload.forEach(alliance => {
          nextState[alliance] = {
            ...activeSynergies[alliance],
            points: activeSynergies[alliance].points + 1
          };
        });
        return {
          ...activeSynergies,
          ...nextState
        };
      case 'decrement':
        payload.forEach(alliance => {
          nextState[alliance] = {
            ...activeSynergies[alliance],
            points: activeSynergies[alliance].points - 1
          };
        });
        return {
          ...activeSynergies,
          ...nextState
        };
      case 'load':
        return payload;
      default:
        return activeSynergies;
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <GlobalStyle />
        <Content>
          <Builds>
            {Object.keys(builds).length > 0 ? (
              Object.entries(builds)
                .sort((a, b) => {
                  if (a[1].favorited === b[1].favorited) {
                    return a[1].name.toLowerCase() - b[1].name.toLowerCase();
                  } else {
                    return Number(b[1].favorited) - Number(a[1].favorited);
                  }
                })
                .map(entry => {
                  const [key, value] = entry;
                  return (
                    <BuildListing
                      key={key}
                      isActive={selectedBuild === key}
                      build={value}
                      handleClick={() => {
                        setSelectedHeroes(value.heroes);
                        setSelectedBuild(key);
                        dispatch(['load', value.synergies]);
                      }}
                      handleStarClick={() => {
                        setBuilds({
                          ...builds,
                          [key]: { ...value, favorited: !value.favorited }
                        });
                      }}
                      updateBuildName={name => {
                        setBuilds({
                          ...builds,
                          [key]: { ...value, name: name }
                        });
                      }}
                    >
                      {value.name}
                    </BuildListing>
                  );
                })
            ) : (
              <EmptyBuilds>You have no saved builds.</EmptyBuilds>
            )}
          </Builds>
          <HeroList>
            <Alliances>
              {alliances.map(alliance => {
                return (
                  <StyledAllianceIcon
                    key={alliance}
                    alliance={alliance}
                    formattedAlliance={formatAlliance(alliance)}
                    size={32}
                    isActive={selectedAlliances.includes(alliance)}
                    onClick={() => {
                      if (selectedAlliances.includes(alliance)) {
                        setSelectedAlliances(
                          selectedAlliances.filter(selectedAlliance => selectedAlliance !== alliance)
                        );
                      } else {
                        setSelectedAlliances([...selectedAlliances, alliance]);
                      }
                    }}
                  />
                );
              })}
            </Alliances>
            {Object.entries(heroes).map(entry => {
              const [key, value] = entry;
              const { name, alliances } = value;
              const shouldDisplay =
                selectedAlliances.length === 0 || selectedAlliances.every(alliance => alliances.includes(alliance));
              const isSelected = selectedHeroes.includes(key);
              return (
                <StyledHeroWithBorder
                  key={key}
                  displayName={name}
                  unformattedName={key}
                  alliances={alliances}
                  shouldDisplay={shouldDisplay}
                  isSelected={isSelected}
                  onAllianceClick={alliance => {
                    if (selectedAlliances.includes(alliance)) {
                      setSelectedAlliances(selectedAlliances.filter(selectedAlliance => selectedAlliance !== alliance));
                    } else {
                      setSelectedAlliances([...selectedAlliances, alliance]);
                    }
                  }}
                  onClick={e => {
                    if (e.target.id.startsWith('alliance')) return;
                    if (isSelected) {
                      setSelectedHeroes(selectedHeroes.filter(selectedHero => selectedHero !== key));
                      setSelectedBuild('');
                      dispatch(['decrement', alliances]);
                    } else if (selectedHeroes.length < 10) {
                      setSelectedHeroes([...selectedHeroes, key]);
                      setSelectedBuild('');
                      dispatch(['increment', alliances]);
                    }
                  }}
                />
              );
            })}
          </HeroList>
          <SelectedHeroesPanel>
            <SelectedHeroesGroup>
              {selectedHeroes.map(selectedHero => {
                const { name, alliances } = heroes[selectedHero];
                return (
                  <StyledHero
                    key={selectedHero}
                    displayName={name}
                    unformattedName={selectedHero}
                    alliances={alliances}
                    shouldDisplay={true}
                    onAllianceClick={alliance => {
                      if (selectedAlliances.includes(alliance)) {
                        setSelectedAlliances(
                          selectedAlliances.filter(selectedAlliance => selectedAlliance !== alliance)
                        );
                      } else {
                        setSelectedAlliances([...selectedAlliances, alliance]);
                      }
                    }}
                    onClick={e => {
                      if (e.target.id.startsWith('alliance')) return;
                      setSelectedHeroes(selectedHeroes.filter(hero => hero !== selectedHero));
                      setSelectedBuild('');
                      dispatch(['decrement', alliances]);
                    }}
                  />
                );
              })}
              {[...Array(10 - selectedHeroes.length)].map((_, i) => (
                <EmptyHero key={`empty-${i}`} />
              ))}
            </SelectedHeroesGroup>
            <Synergies>
              {Object.values(activeSynergies).map(synergy => {
                return (
                  <Synergy key={synergy.name}>
                    <SynergyIcon
                      alliance={synergy.name}
                      formattedAlliance={formatAlliance(synergy.name)}
                      size={32}
                      isActive={synergy.points >= synergy.stepSize}
                      onClick={() => {
                        if (selectedAlliances.includes(synergy.name)) {
                          setSelectedAlliances(
                            selectedAlliances.filter(selectedAlliance => selectedAlliance !== synergy.name)
                          );
                        } else {
                          setSelectedAlliances([...selectedAlliances, synergy.name]);
                        }
                      }}
                    />
                    <SynergyMarkers>
                      {[...Array(synergy.maxPoints)].map((_, i) => (
                        <SynergyMarker
                          stepSize={synergy.stepSize}
                          isFilled={i + 1 <= synergy.points}
                          alliance={formatAlliance(synergy.name)}
                        />
                      ))}
                    </SynergyMarkers>
                  </Synergy>
                );
              })}
            </Synergies>
            <ButtonGroup>
              <Button
                onClick={() => {
                  const hashedBuild = sum({
                    heroes: selectedHeroes,
                    synergies: activeSynergies
                  });
                  setSelectedBuild(hashedBuild);
                  setBuilds({
                    ...builds,
                    [hashedBuild]: {
                      name: 'Enter a name',
                      favorited: false,
                      heroes: selectedHeroes,
                      synergies: activeSynergies
                    }
                  });
                }}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setSelectedHeroes([]);
                  setSelectedBuild('');
                  dispatch(['load', synergies]);
                }}
              >
                Clear Selection
              </Button>
              <Button
                onClick={() => {
                  setSelectedHeroes([]);
                  dispatch(['load', synergies]);
                  const hashedBuild = sum({
                    heroes: selectedHeroes,
                    synergies: activeSynergies
                  });
                  const { [hashedBuild]: omit, ...nextBuilds } = builds;
                  setBuilds(nextBuilds);
                }}
              >
                Delete This Build
              </Button>
              <Button
                onClick={() => {
                  setSelectedHeroes([]);
                  dispatch(['load', synergies]);
                  setBuilds({});
                }}
              >
                Delete All Builds
              </Button>
            </ButtonGroup>
          </SelectedHeroesPanel>
        </Content>
      </Container>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
