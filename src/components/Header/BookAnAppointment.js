import React from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'semantic-ui-react';
import { media } from '../../utils';

const StyledButton = styled(Button)`
  &&& {
    height: 40px;
    background-color: ${props => props.theme.orange};
    color: white;
    transition: background 125ms ease-out;
    flex-shrink: 0;
    ${media.lessThan('1100px')`font-size: 14px;`};
    ${media.lessThan('lg')`width: 100%;`};
    &:hover {
      background-color: rgba(235, 165, 0);
    }
  }
`;

const BookAnAppointment = () => (
  <StyledButton icon labelPosition="right">
    Book an Appointment
    <Icon name="calendar plus" />
  </StyledButton>
);

export default BookAnAppointment;
