import styled from 'styled-components';

const StageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  transition: transform 250ms ease-in-out;
  ${({ position }) => position || `transform: translateX(-100%);`};
`;

export default StageContainer;
