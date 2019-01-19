import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Icon, Dimmer } from 'semantic-ui-react';
import { media } from '../../utils';

import ApptInfo from './ApptInfo';
import DayPicker from './DayPicker';
import ReviewInfo from './ReviewInfo';

const DEFAULT_MESSAGE = 'Select a day above ↑';
const HOLIDAY_MESSAGE =
  'You selected a holiday. Please call us for up-to-date availability.';

const positions = {
  visible: `transform: translateX(0);`,
  hidden: `transform: translateX(-115%);`,
};

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

const PopupContainer = styled.div`
  padding: 30px;
  background: #333;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 6px;

  z-index: 10000;
  position: absolute;
  top: 60px;
  left: -60px;
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
`;

const OverflowContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 300px;
  height: ${({ pickerStage }) => (pickerStage === 2 ? '450px' : '400px')};
  transition: height 250ms ease-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: 0;
  font-size: 30px;
  user-select: none;
  color: white;
  padding: 5px;
  font-weight: 700;
  background: none;
  :hover {
    color: #e3e3e3;
    cursor: pointer;
  }
`;

const BackButton = styled.a`
  position: absolute;
  color: white;
  top: 15px;
  left: 10px;
  border: 0;
  user-select: none;
  padding: 5px;
  font-weight: 700;
  background: none;
  font-size: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    cursor: pointer;
  }
`;

class BookAnAppointment extends Component {
  state = {
    pickerOpen: false,
    pickerStage: 1,
    selectedDay: undefined,
    selectedTime: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    reason: '',
    errorMessage: DEFAULT_MESSAGE,
  };

  togglePicker = () =>
    this.setState(prev => ({
      pickerOpen: !prev.pickerOpen,
    }));

  onChangeField = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  onChangeSelectedTime = (_, { name, value }) => {
    this.setState({ selectedTime: value });
  };

  handleDayClick = (day, { selected, disabled, isHoliday, hasPassed }) => {
    if (disabled) {
      return false;
    }

    if (hasPassed) {
      this.setState({ selectedDay: undefined });
      return;
    }

    if (isHoliday) {
      this.setState({ selectedDay: undefined, message: HOLIDAY_MESSAGE });
      return;
    }

    if (selected) {
      this.setState({ selectedDay: undefined, message: DEFAULT_MESSAGE });
      return;
    }

    this.setState({ selectedDay: day, message: DEFAULT_MESSAGE });
  };

  onClickNextSteps = () =>
    this.setState(prev => ({ pickerStage: prev.pickerStage + 1 }));

  onClickBack = () =>
    this.setState(prev => ({ pickerStage: prev.pickerStage - 1 }));

  render() {
    const {
      pickerOpen,
      fullName,
      phoneNumber,
      email,
      reason,
      selectedDay,
      selectedTime,
      pickerStage,
      errorMessage,
    } = this.state;
    const isStage = pos =>
      pickerStage === pos ? positions.visible : positions.hidden;

    return (
      <div style={{ position: 'relative' }}>
        <Dimmer
          active={pickerOpen}
          blurring
          onClickOutside={this.togglePicker}
          page
        />
        <StyledButton icon labelPosition="right" onClick={this.togglePicker}>
          Book an Appointment
          <Icon name="calendar plus" />
        </StyledButton>
        <PopupContainer open={pickerOpen}>
          {pickerStage > 1 && (
            <BackButton onClick={this.onClickBack}>← Back</BackButton>
          )}
          <CloseButton onClick={this.togglePicker}>&times;</CloseButton>
          <OverflowContainer pickerStage={pickerStage}>
            <DayPicker
              position={isStage(1)}
              selectedDay={selectedDay}
              selectedTime={selectedTime}
              handleDayClick={this.handleDayClick}
              onChangeSelectedTime={this.onChangeSelectedTime}
              closePicker={this.togglePicker}
              onClickNextSteps={this.onClickNextSteps}
              message={errorMessage}
            />
            <ApptInfo
              onClickNextSteps={this.onClickNextSteps}
              position={isStage(2)}
              onChangeField={this.onChangeField}
              fullName={fullName}
              phoneNumber={phoneNumber}
              email={email}
              reason={reason}
            />
            <ReviewInfo
              position={isStage(3)}
              fullName={fullName}
              phoneNumber={phoneNumber}
              email={email}
              reason={reason}
              selectedDay={selectedDay}
              selectedTime={selectedTime}
            />
          </OverflowContainer>
        </PopupContainer>
      </div>
    );
  }
}

export default BookAnAppointment;
