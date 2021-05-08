import React from 'react';
import { BorderlessAllianceIcon, HeroContainer, HeroImg, HeroInfo, Alliances } from './styles';
import { formatAlliance } from '../utils/helpers';

export function Hero({ displayName, unformattedName, alliances, shouldDisplay, onAllianceClick, ...restProps }) {
  return (
    <HeroContainer shouldDisplay={shouldDisplay} {...restProps}>
      <HeroImg alt={displayName} key={displayName} src={`static/heroes/${unformattedName}.png`} />
      <HeroInfo>
        <Alliances>
          {alliances.map((alliance, i) => {
            return (
              <BorderlessAllianceIcon
                id={`alliance-${i}`}
                alliance={alliance}
                key={alliance}
                size={20}
                formattedAlliance={formatAlliance(alliance)}
                onClick={() => onAllianceClick(alliance)}
              />
            );
          })}
        </Alliances>
      </HeroInfo>
    </HeroContainer>
  );
}
