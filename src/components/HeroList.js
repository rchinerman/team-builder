import React from 'react';
import { HeroListContainer, HeroGrid, AllianceTopBar, StyledAllianceIcon, StyledHeroWithBorder } from './styles';
import heroes from '../heroes.json';
import { alliances } from '../utils/constants';
import { formatAlliance } from '../utils/helpers';

export function HeroList({
  onAllianceClick,
  setSelectedHeroes,
  selectedHeroes,
  selectedAlliances,
  setSelectedBuild,
  dispatch,
}) {
  const onHeroClick = (e, isSelected, key, alliances) => {
    if (e.target.id.startsWith('alliance')) return;
    if (isSelected) {
      setSelectedHeroes(selectedHeroes.filter((selectedHero) => selectedHero !== key));
      setSelectedBuild('');
      dispatch(['decrement', alliances]);
    } else if (selectedHeroes.length < 10) {
      setSelectedHeroes([...selectedHeroes, key]);
      setSelectedBuild('');
      dispatch(['increment', alliances]);
    }
  };
  return (
    <HeroListContainer>
      <AllianceTopBar>
        {alliances.map((alliance) => (
          <StyledAllianceIcon
            key={alliance}
            alliance={alliance}
            formattedAlliance={formatAlliance(alliance)}
            size={32}
            isActive={selectedAlliances.includes(alliance)}
            onClick={() => onAllianceClick(alliance)}
          />
        ))}
      </AllianceTopBar>
      <HeroGrid>
        {Object.entries(heroes).map((entry) => {
          const [key, value] = entry;
          const { name, alliances } = value;
          const shouldDisplay =
            selectedAlliances.length === 0 || selectedAlliances.every((alliance) => alliances.includes(alliance));
          const isSelected = selectedHeroes.includes(key);
          return (
            <StyledHeroWithBorder
              key={key}
              displayName={name}
              unformattedName={key}
              alliances={alliances}
              shouldDisplay={shouldDisplay}
              isSelected={isSelected}
              onAllianceClick={onAllianceClick}
              onClick={(e) => onHeroClick(e, isSelected, key, alliances)}
            />
          );
        })}
      </HeroGrid>
    </HeroListContainer>
  );
}
