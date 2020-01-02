import React from 'react';
import moment from 'moment';
import DOMPurify from 'dompurify';
import { Button } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';

import StageContainer from './StageContainer';
import { timeOptions } from './DayPicker';
import { useMessages } from '../../hooks/usePrismicMessages';

const submitAppointment = async data => {
  const { togglePicker, addToast, successMessage, ...sanitizedInputs } = data;

  // do something with data
  await sendCustomerConfirmation(sanitizedInputs);
  await sendShopConfirmation(sanitizedInputs);

  // close modal
  togglePicker();

  // pop a toast
  addToast(successMessage.text, {
    appearance: 'success',
    autoDismiss: true,
  });
};

// TODO: Implement confirmation email
async function sendCustomerConfirmation() {
  return true;
}

// TODO: Implement confirmation email
async function sendShopConfirmation() {
  return true;
}

function sanitizeUserInput(strings) {
  return strings.map(str =>
    DOMPurify.sanitize(str, { SAFE_FOR_TEMPLATES: true })
  );
}

function replaceMessageVars(message, vars) {
  const matches = message.match(/({{ [a-z]+ }})/gi);
  return matches.reduce((str, match) => {
    const varCandidate = match.replace('{{ ', '').replace(' }}', '');
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
    togglePicker,
    position,
  } = props;
  const { addToast } = useToasts();
  const {
    appointment_review_message,
    appointment_success_popup: successMessage,
  } = useMessages();
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
    : 'Any';
  const sanitizedUserInput = {
    name,
    number,
    email,
    service,
    date: `${prettyDay} at ${prettyTime.text}`,
  };
  const reviewHTML = replaceMessageVars(appointment_review_message.html, {
    ...sanitizedUserInput,
  });

  return (
    <StageContainer position={position}>
      <p
        style={{ marginTop: '25px' }}
        dangerouslySetInnerHTML={{ __html: reviewHTML }}
      />
      <Button
        onClick={() =>
          submitAppointment({
            ...sanitizedUserInput,
            togglePicker,
            addToast,
            successMessage,
          })
        }
      >
        Confirm
      </Button>
    </StageContainer>
  );
};

export default ReviewInfo;
