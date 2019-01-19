import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faSnowflake, faCogs } from '@fortawesome/free-solid-svg-icons';
import {
  faTireFlat,
  faTemperatureLow,
  faEngineWarning,
} from '@fortawesome/pro-regular-svg-icons';

library.add(
  faTireFlat,
  faBolt,
  faSnowflake,
  faTemperatureLow,
  faCogs,
  faEngineWarning
);

const KGIcon = styled(FontAwesomeIcon)`
  ${props => (props.color ? `color: ${props.color}` : null)};
`;

export default KGIcon;
