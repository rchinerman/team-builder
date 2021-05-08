import React, { useState } from 'react';
import { BuildContainer, BuildInput, StarContainer, Star } from './styles';

export function BuildListing({ build, handleClick, handleStarClick, updateBuildName, isActive, ...restProps }) {
  const [title, setTitle] = useState(build.name);
  return (
    <BuildContainer onClick={() => handleClick()} isActive={isActive} {...restProps}>
      <BuildInput
        type="text"
        isActive={isActive}
        value={title}
        onClick={() => handleClick()}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => updateBuildName(title)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') e.target.blur();
        }}
      />
      <StarContainer>
        <Star isFilled={build.isFavorite} onClick={() => handleStarClick()} />
      </StarContainer>
    </BuildContainer>
  );
}
