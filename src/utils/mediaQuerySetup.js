import { generateMedia } from 'styled-media-query';
import { breakpoints } from './breakpoints';
export const media = generateMedia({
  sm: `${breakpoints[0] + 1}px`,
  md: `${breakpoints[1] + 1}px`,
  lg: `${breakpoints[2] + 1}px`,
  xl: `${breakpoints[3] + 1}px`,
});
