import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 16px 24px;
  background: ${props => (props.isActive ? props.theme.purple : 'transparent')};
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.highlight};
  }
`;

const Input = styled.input`
  outline: none;
  background: none;
  color: ${props => props.theme.highlight};
  border: none;
  font-size: 16px;
`;

const StarContainer = styled.div`
  position: absolute;
  content: '';
`;

const Star = styled.div`
  position: relative;
  display: block;
  color: ${props => (!props.isFilled ? props.theme.background : props.theme.highlight)};
  width: 0px;
  height: 0px;
  border-right: 10px solid transparent;
  border-bottom: 7px solid ${props => (!props.isFilled ? props.theme.background : props.theme.highlight)};
  border-left: 10px solid transparent;
  transform: rotate(35deg);
  top: -15px;
  right: -200px;

  &:before {
    border-bottom: 8px solid ${props => (!props.isFilled ? props.theme.background : props.theme.highlight)};
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    position: absolute;
    height: 0;
    width: 0;
    top: -4.5px;
    left: -6.5px;
    display: block;
    content: '';
    transform: rotate(-35deg);
  }

  &:after {
    position: absolute;
    display: block;
    color: ${props => (!props.isFilled ? props.theme.background : props.theme.highlight)};
    top: 0.3px;
    left: -10.5px;
    width: 0px;
    height: 0px;
    border-right: 10px solid transparent;
    border-bottom: 7px solid ${props => (!props.isFilled ? props.theme.background : props.theme.highlight)};
    border-left: 10px solid transparent;
    transform: rotate(-70deg);
    content: '';
  }
`;

export function BuildListing({ build, handleClick, handleStarClick, updateBuildName, isActive, ...restProps }) {
  const [title, setTitle] = useState(build.name);
  return (
    <Container onClick={() => handleClick()} isActive={isActive} {...restProps}>
      <Input
        type="text"
        isActive={isActive}
        value={title}
        onClick={() => handleClick()}
        onChange={e => setTitle(e.target.value)}
        onBlur={() => updateBuildName(title)}
        onKeyPress={e => {
          if (e.key === 'Enter') e.target.blur();
        }}
      />
      <StarContainer>
        <Star isFilled={build.favorited} onClick={() => handleStarClick()} />
      </StarContainer>
    </Container>
  );
}
