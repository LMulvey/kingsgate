import React from 'react';
import styled from 'styled-components';
import { Button, Icon, Dimmer } from 'semantic-ui-react';
import { media } from '../../utils';

import ApptInfo from './ApptInfo';
import DayPicker from './DayPicker';
import ReviewInfo from './ReviewInfo';
import { useMessages } from '../../hooks/usePrismicMessages';
import { useAppointmentState } from '../../hooks/useAppointmentState';

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

export default function BookAnAppointment() {
  const messages = useMessages();
  const HOLIDAY_MESSAGE = messages.appointment_holiday.text;
  const DEFAULT_MESSAGE = messages.appointment_default_cta.text;
  const state = useAppointmentState(DEFAULT_MESSAGE);
  const isStage = pos =>
    state.pickerStage === pos ? positions.visible : positions.hidden;

  const togglePicker = () => state.setPickerOpen(prev => !prev);
  const onChangeSelectedTime = (_, { value }) => state.setSelectedTime(value);
  const onClickBack = () => state.setPickerStage(prev => prev.pickerStage - 1);
  const onClickNextSteps = () =>
    state.setPickerStage(prev => prev.pickerStage + 1);
  const onChangeField = ({ target: { name, value } }) => {
    const titleCaseField = name.charAt(0).toUpperCase() + name.substr(1);
    state[`set${titleCaseField}`](value);
  };
  const handleDayClick = (day, opts) => {
    const { selected, disabled, isHoliday, hasPassed } = opts;
    const isInvalid = hasPassed || isHoliday || selected;
    const userMessage = isHoliday ? HOLIDAY_MESSAGE : DEFAULT_MESSAGE;
    const selectedDay = isInvalid ? undefined : day;

    if (disabled) {
      return false;
    }

    state.setSelectedDay(selectedDay);
    state.setUserMessage(userMessage);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Dimmer
        active={state.pickerOpen}
        blurring
        onClickOutside={togglePicker}
        page
      />
      <StyledButton icon labelPosition="right" onClick={togglePicker}>
        Book an Appointment
        <Icon name="calendar plus" />
      </StyledButton>
      <PopupContainer open={state.pickerOpen}>
        {state.pickerStage > 1 && (
          <BackButton onClick={onClickBack}>← Back</BackButton>
        )}
        <CloseButton onClick={togglePicker}>&times;</CloseButton>
        <OverflowContainer pickerStage={state.pickerStage}>
          <DayPicker
            position={isStage(1)}
            selectedDay={state.selectedDay}
            selectedTime={state.selectedTime}
            handleDayClick={handleDayClick}
            onChangeSelectedTime={onChangeSelectedTime}
            closePicker={togglePicker}
            onClickNextSteps={onClickNextSteps}
            message={state.userMessage}
          />
          <ApptInfo
            onClickNextSteps={onClickNextSteps}
            position={isStage(2)}
            onChangeField={onChangeField}
            fullName={state.fullName}
            phoneNumber={state.phoneNumber}
            email={state.email}
            reason={state.reason}
          />
          <ReviewInfo
            position={isStage(3)}
            fullName={state.fullName}
            phoneNumber={state.phoneNumber}
            email={state.email}
            reason={state.reason}
            selectedDay={state.selectedDay}
            selectedTime={state.selectedTime}
            togglePicker={togglePicker}
          />
        </OverflowContainer>
      </PopupContainer>
    </div>
  );
}
