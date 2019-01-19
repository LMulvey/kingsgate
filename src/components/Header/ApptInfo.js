import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'semantic-ui-react';

import StageContainer from './StageContainer';

const FormContainer = styled.div`
  margin-top: 25px;
  & form {
    width: 95%;
    padding: 20px;
  }
`;

class ApptInfo extends Component {
  render() {
    const {
      onChangeField,
      fullName,
      phoneNumber,
      email,
      reason,
      position,
      onClickNextSteps,
    } = this.props;

    const fieldsFilledOut = fullName && phoneNumber && email && reason;

    return (
      <StageContainer position={position}>
        <FormContainer>
          <Form size="tiny" inverted>
            <Form.Field
              control={Input}
              label="Full Name"
              name="fullName"
              placeholder="First and Last Name"
              value={fullName}
              onChange={onChangeField}
            />
            <Form.Field
              control={Input}
              label="Phone Number"
              name="phoneNumber"
              placeholder="xxx-xxx-xxxx"
              value={phoneNumber}
              onChange={onChangeField}
            />
            <Form.Field
              control={Input}
              label="Email"
              name="email"
              placeholder="eg: customer@kingsgateauto.com"
              value={email}
              onChange={onChangeField}
            />
            <Form.Field
              control={Input}
              label="Reason for Appointment"
              name="reason"
              placeholder="Describe the issue you're having"
              value={reason}
              onChange={onChangeField}
            />
          </Form>
          <Button
            color="teal"
            content="Next Steps – Review Information"
            icon="right arrow"
            labelPosition="right"
            disabled={!fieldsFilledOut}
            onClick={onClickNextSteps}
          />
        </FormContainer>
      </StageContainer>
    );
  }
}

export default ApptInfo;
