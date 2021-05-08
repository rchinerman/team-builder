import React from 'react';
import { Icon } from './styles';

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
