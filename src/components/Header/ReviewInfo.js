import React from 'react';
import moment from 'moment';
import { Button } from 'semantic-ui-react';

import StageContainer from './StageContainer';
import { timeOptions } from './DayPicker';

const ReviewInfo = ({
  fullName,
  phoneNumber,
  email,
  reason,
  selectedDay,
  selectedTime,
  position,
}) => {
  const prettyDay = selectedDay
    ? moment(selectedDay).format('MMM DD, YYYY')
    : '';
  const prettyTime = selectedTime
    ? timeOptions.find(time => time.value === selectedTime)
    : '';
  return (
    <StageContainer position={position}>
      <h5 style={{ marginTop: '25px' }}>
        To confirm, we're booking an appointment for <strong>{fullName}</strong>{' '}
        to perform the following service/diagnostic: <strong>{reason}</strong>{' '}
        on {prettyDay} at {prettyTime.text}.
      </h5>
      <h5>
        If there are any issues, we will contact you via phone at{' '}
        <strong>{phoneNumber}</strong> and send you a reminder via email at{' '}
        <strong>{email}</strong>.
      </h5>

      <Button>Confirm</Button>
    </StageContainer>
  );
};

export default ReviewInfo;
