import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { Container, Row, Col } from 'react-grid-system';

import Layout from '../components/layout';
import SEO from '../components/seo';

import ApptInfo from '../components/BookAnAppointment/ApptInfo';
import DayPicker from '../components/BookAnAppointment/DayPicker';
import ReviewInfo from '../components/BookAnAppointment/ReviewInfo';
import { useMessages } from '../hooks/usePrismicMessages';
import { useAppointmentState } from '../hooks/useAppointmentState';

export default function BookAnAppointment() {
  const messages = useMessages();
  const HOLIDAY_MESSAGE = messages.appointment_holiday.text;
  const DEFAULT_MESSAGE = messages.appointment_default_cta.text;
  const state = useAppointmentState(DEFAULT_MESSAGE);

  const togglePicker = () => state.setPickerOpen(prev => !prev);
  const onChangeSelectedTime = (_, { value }) => state.setSelectedTime(value);
  const onClickNextSteps = () => state.setPickerStage(prev => prev + 1);
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
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <Container fluid style={{ padding: 0 }}>
        <Row>
          <Col md={12} lg={6}>
            <DayPicker
              selectedDay={state.selectedDay}
              selectedTime={state.selectedTime}
              handleDayClick={handleDayClick}
              onChangeSelectedTime={onChangeSelectedTime}
              closePicker={togglePicker}
              onClickNextSteps={onClickNextSteps}
              message={state.userMessage}
            />
          </Col>
          <Col md={12} lg={6}>
            <ApptInfo
              onClickNextSteps={onClickNextSteps}
              onChangeField={onChangeField}
              fullName={state.fullName}
              phoneNumber={state.phoneNumber}
              email={state.email}
              reason={state.reason}
            />
          </Col>
        </Row>
        <ReviewInfo
          position={1}
          fullName={state.fullName}
          phoneNumber={state.phoneNumber}
          email={state.email}
          reason={state.reason}
          selectedDay={state.selectedDay}
          selectedTime={state.selectedTime}
          togglePicker={togglePicker}
        />
      </Container>
    </Layout>
  );
}
