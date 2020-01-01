import React from 'react';
import moment from 'moment';
import DOMPurify from 'dompurify';
import { Button } from 'semantic-ui-react';
import { ToastConsumer } from 'react-toast-notifications';

import StageContainer from './StageContainer';
import { timeOptions } from './DayPicker';
import { useMessages } from '../../hooks/usePrismicMessages';

const submitAppointment = data => {
  const {
    fullName,
    phoneNumber,
    email,
    reason,
    selectedDay,
    selectedTime,
    position,
    togglePicker,
    addToast,
  } = data;

  // do something with data

  // close modal
  togglePicker();

  // pop a toast
  addToast(`Appointment requested. Please check email for confirmation.`, {
    appearance: 'success',
  });
};

function sanitizeUserInput(strings) {
  return strings.map(str =>
    DOMPurify.sanitize(str, { SAFE_FOR_TEMPLATES: true })
  );
}

function replaceMessageVars(message, vars) {
  const matches = message.match(/({{ [a-z]+ }})/gi);
  return matches.reduce((str, match) => {
    const varCandidate = match.replace('{{ ', '').replace(' }}', '');
    console.log({ varCandidate, vars });
    const isVar = vars[varCandidate];
    return str.replace(match, isVar || '');
  }, message);
}

const ReviewInfo = props => {
  const {
    fullName,
    phoneNumber,
    email: emailAddr,
    reason,
    selectedDay,
    selectedTime,
    position,
  } = props;
  const { appointment_review_message } = useMessages();
  const [name, number, email, service] = sanitizeUserInput([
    fullName,
    phoneNumber,
    emailAddr,
    reason,
  ]);
  const prettyDay = selectedDay
    ? moment(selectedDay).format('MMM DD, YYYY')
    : '';
  const prettyTime = selectedTime
    ? timeOptions.find(time => time.value === selectedTime)
    : '';
  const reviewHTML = replaceMessageVars(appointment_review_message.html, {
    name,
    number,
    email,
    service,
    date: `${prettyDay} at ${prettyTime.text}`,
  });

  return (
    <ToastConsumer>
      {({ add: addToast }) => (
        <StageContainer position={position}>
          <p
            style={{ marginTop: '25px' }}
            dangerouslySetInnerHTML={{ __html: reviewHTML }}
          />
          <Button onClick={() => submitAppointment({ ...props, addToast })}>
            Confirm
          </Button>
        </StageContainer>
      )}
    </ToastConsumer>
  );
};

export default ReviewInfo;
