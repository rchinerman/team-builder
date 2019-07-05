import React from 'react';
import styled from 'styled-components';

import { AllianceIcon } from './AllianceIcon';

import { formatAlliance } from '../utils/helpers';

const Container = styled.div`
  display: ${props => (props.shouldDisplay ? 'flex' : 'none')};
  flex-direction: column;
  width: 76px;
  height: 76px;
  text-align: center;
  border-radius: 5px;
  overflow: hidden;
`;

const Alliances = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${props => props.theme.highlight};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: none;
  overflow: hidden;
`;

const HeroInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin-top: -25px;
`;

const HeroImg = styled.img`
  height: 76px;
  width: 76px;
`;

const StyledAllianceIcon = styled(AllianceIcon)`
  border-radius: 0px;
`;

export function Hero({ displayName, unformattedName, alliances, shouldDisplay, onAllianceClick, ...restProps }) {
  return (
    <Container shouldDisplay={shouldDisplay} {...restProps}>
      <HeroImg alt={displayName} key={displayName} src={`static/heroes/${unformattedName}.png`} />
      <HeroInfo>
        <Alliances>
          {alliances.map((alliance, i) => {
            return (
              <StyledAllianceIcon
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
    </Container>
  );
}
