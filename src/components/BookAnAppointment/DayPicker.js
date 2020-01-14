import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReactDayPicker from 'react-day-picker';
import { Form, Select, Button } from 'semantic-ui-react';
import { isHoliday, hasPassed } from '../../utils/hoursHelper';

import StageContainer from './StageContainer';

const BottomContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: baseline;
`;

export const timeOptions = [
  { key: 'eleven-am', text: '11:00am', value: '11:00' },
  { key: 'one-pm', text: '1:00pm', value: '13:00' },
];

const DayPicker = props => {
  const {
    selectedDay,
    selectedTime,
    position,
    message,
    onClickNextSteps,
    handleDayClick,
    onChangeSelectedTime,
  } = props;
  const prettyDay = selectedDay
    ? moment(selectedDay).format('MMM DD, YYYY')
    : '';

  return (
    <>
      <ReactDayPicker
        onDayClick={handleDayClick}
        selectedDays={selectedDay}
        modifiers={{ isHoliday, hasPassed }}
        disabledDays={{
          daysOfWeek: [0, 6],
        }}
      />
      {selectedDay ? (
        <BottomContainer>
          {prettyDay}
          <Form size="mini">
            <Form.Group>
              <Form.Field
                control={Select}
                options={timeOptions}
                placeholder="What time?"
                value={selectedTime}
                onChange={onChangeSelectedTime}
              />
            </Form.Group>
          </Form>
          <div style={{ width: '100%', flexBasis: '100%' }}>
            <Button
              disabled={!selectedTime}
              color="teal"
              content="Next Steps – Who's the appointment for?"
              icon="right arrow"
              labelPosition="right"
              onClick={onClickNextSteps}
            />
          </div>
        </BottomContainer>
      ) : (
        <h4 style={{ textAlign: 'center' }}>{message}</h4>
      )}
    </>
  );
};

export default DayPicker;
