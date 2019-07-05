import React from 'react';
import styled from 'styled-components';

import { getAllianceColorFromName } from '../utils/helpers';

const Icon = styled.img`
  height: ${props => (props.size ? props.size : 18)}px;
  width: ${props => (props.size ? props.size : 18)}px;
  padding: 2px;
  border-radius: 4px;
  background: ${props => getAllianceColorFromName(props.alliance)};
`;

export function AllianceIcon({ alliance, formattedAlliance, size, ...restProps }) {
  return (
    <Icon
      alt={`${alliance} icon`}
      alliance={formattedAlliance}
      size={size}
      src={`static/alliances/img/${formattedAlliance}.png`}
      {...restProps}
    />
  );
}
