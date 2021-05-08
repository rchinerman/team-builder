import styled, { createGlobalStyle } from 'styled-components';
import { getAllianceColorFromName } from '../utils/helpers';
import { AllianceIcon } from './AllianceIcon';
import { Hero } from './Hero';

export const HeroListContainer = styled.div`
  background: ${(props) => props.theme.secondaryBackground};
  border-radius: 5px;
  box-shadow: 0 0 0 1px ${(props) => props.theme.highlight};
  margin: 10px;
  padding: 20px;
`;

export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 3fr));
  grid-gap: 20px;
`;

export const AllianceTopBar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  grid-gap: 10px;
  justify-content: center;
  margin: 20px 0px;
`;

export const StyledAllianceIcon = styled(AllianceIcon)`
  opacity: ${(props) => (props.isActive ? 1 : 0.3)};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: ${(props) =>
    props.isActive ? getAllianceColorFromName(props.formattedAlliance) : props.theme.background};
`;

export const HeroContainer = styled.div`
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
`;

export const StyledHero = styled(Hero)`
  position: relative;
  box-shadow: 0 0 0 1px ${(props) => props.theme.highlight};
  aspect-ratio: 1;
`;

export const StyledHeroWithBorder = styled(StyledHero)`
  display: ${(props) => (props.shouldDisplay ? 'inherit' : 'none')};
  filter: ${(props) => (props.isSelected ? 'grayscale(100%)' : 'none')};
  opacity: ${(props) => (props.isSelected ? 0.4 : 1)};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

export const Alliances = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25px, 1fr));
  border: 1px solid ${(props) => props.theme.highlight};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: none;
  overflow: hidden;
`;

export const HeroInfo = styled.div`
  position: absolute;
  font-size: 12px;
  bottom: 0;
  left: 10%;
  right: 10%;
`;

export const HeroImg = styled.img`
  height: 100%;
  width: 100%;
`;

export const BorderlessAllianceIcon = styled(AllianceIcon)`
  border-radius: 0px !important;
`;

export const BuildContainer = styled.div`
  padding: 16px 24px;
  background: ${(props) => (props.isActive ? props.theme.purple : 'transparent')};
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.highlight};
  }
`;

export const BuildInput = styled.input`
  outline: none;
  background: none;
  color: ${(props) => props.theme.highlight};
  border: none;
  font-size: 16px;
`;

export const StarContainer = styled.div`
  position: absolute;
  content: '';
`;

export const Star = styled.div`
  position: relative;
  display: block;
  color: ${(props) => (!props.isFilled ? props.theme.background : props.theme.highlight)};
  width: 0px;
  height: 0px;
  border-right: 10px solid transparent;
  border-bottom: 7px solid ${(props) => (!props.isFilled ? props.theme.background : props.theme.highlight)};
  border-left: 10px solid transparent;
  transform: rotate(35deg);
  top: -15px;
  right: -200px;

  &:before {
    border-bottom: 8px solid ${(props) => (!props.isFilled ? props.theme.background : props.theme.highlight)};
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
    color: ${(props) => (!props.isFilled ? props.theme.background : props.theme.highlight)};
    top: 0.3px;
    left: -10.5px;
    width: 0px;
    height: 0px;
    border-right: 10px solid transparent;
    border-bottom: 7px solid ${(props) => (!props.isFilled ? props.theme.background : props.theme.highlight)};
    border-left: 10px solid transparent;
    transform: rotate(-70deg);
    content: '';
  }
`;

export const Icon = styled.img`
  max-height: 100%;
  max-width: 100%;
  border-radius: 4px;
  background: ${(props) => getAllianceColorFromName(props.alliance)};
  cursor: pointer;
`;

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${(props) => props.theme.background};
    color: white;
    font-family: 'Open Sans', sans-serif;
  }
`;

export const Container = styled.div``;

export const Content = styled.div`
  display: grid;
  padding: 0 2.5vw;
  grid-template-columns: 20% 50% 30%;
`;

export const SelectedHeroesPanel = styled.div`
  margin: 10px;
`;

export const SelectedHeroesGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
  grid-gap: 15px
  background: ${(props) => props.theme.secondaryBackground};
  box-shadow: 0 0 0 1px ${(props) => props.theme.highlight};
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const EmptyHero = styled.div`
  box-shadow: 0 0 0 1px ${(props) => props.theme.highlight};
  border-radius: 5px;
  aspect-ratio: 1;
`;

export const Synergies = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  padding: 20px;
  background: ${(props) => props.theme.secondaryBackground};
  box-shadow: 0 0 0 1px ${(props) => props.theme.highlight};
  border-radius: 5px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const SynergyIcon = styled(AllianceIcon)`
  margin-right: 8px;
  opacity: ${(props) => (props.isActive ? 1 : 0.3)};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: ${(props) =>
    props.isActive ? getAllianceColorFromName(props.formattedAlliance) : props.theme.background};
`;

export const SynergyTotalCount = styled.span`
  font-size: 1.75rem;
`;

export const Synergy = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
  grid-column-gap: 15px;
`;

export const SynergyNumber = styled.span`
  color: ${(props) => (props.isActive ? props.theme.pink : props.theme.inactive)};
  font-weight: ${(props) => (props.isActive ? 600 : 500)};
  margin-right: 10px;
  font-size: 1.15rem;
`;

export const SynergyTextContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  align-items: center;
`;

export const SynergyNumbers = styled.div`
  display
`;

export const Button = styled.button`
  background: none;
  border: none;
  margin: 8px;
  margin-top: 0;
  padding: 8px;
  border-radius: 3px;
  box-shadow: 0 0 0 1px ${(props) => props.theme.highlight};
  color: ${(props) => props.theme.highlight};
  background: ${(props) => props.theme.secondaryBackground};
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Builds = styled.div`
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  flex-direction: column;
  align-self: flex-start;
  background: ${(props) => props.theme.secondaryBackground};
  box-shadow: 0 0 0 1px ${(props) => props.theme.highlight};
  margin: 10px;
`;

export const EmptyBuilds = styled.div`
  padding: 16px 24px;
  background: ${(props) => (props.isActive ? props.theme.purple : 'transparent')};
  font-size: 16px;
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.highlight};
  }
`;
