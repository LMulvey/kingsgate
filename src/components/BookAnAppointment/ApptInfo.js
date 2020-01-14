import React, { Component } from 'react';
import ReactInputMask from 'react-input-mask';
import styled from 'styled-components';
import { Form, Input, Button, Search, Label } from 'semantic-ui-react';

import StageContainer from './StageContainer';

const FormContainer = styled.div`
  margin-top: 25px;
  & form {
    width: 95%;
    padding: 20px;
  }
`;

const autocompleteValues = [
  { title: 'Oil Change' },
  { title: 'Swap Winter Tires' },
  { title: 'Flat Tire' },
  { title: 'Engine Light' },
  { title: "Car Won't Start" },
  { title: 'Clunking Noise' },
  { title: 'Inspection (Out of Province)' },
  { title: 'Inspection (Pre-sale)' },
];

class ApptInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  handleResultSelect = (e, { result }) =>
    this.props.onChangeField({
      target: { name: 'reason', value: result.title },
    });

  handleSearchChange = (e, { value }) => {
    e.persist();
    const filtered =
      value.length > 1
        ? autocompleteValues.filter(val =>
            val.title.toLowerCase().includes(value.toLowerCase())
          )
        : [];

    this.props.onChangeField(e);
    this.setState({ results: filtered });
  };

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
    const resultRenderer = item => <h5 style={{ margin: 0 }}>{item.title}</h5>;
    const fieldsFilledOut = fullName && phoneNumber && email && reason;

    return (
      <>
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
            <ReactInputMask
              mask="(999) 999-9999"
              value={phoneNumber}
              onChange={onChangeField}
            >
              {inputProps => (
                <Form.Field
                  {...inputProps}
                  control={Input}
                  label="Phone Number"
                  name="phoneNumber"
                  placeholder="xxx-xxx-xxxx"
                  required
                />
              )}
            </ReactInputMask>
            <Form.Field
              control={Input}
              label="Email"
              name="email"
              required
              placeholder="eg: customer@kingsgateauto.com"
              value={email}
              onChange={onChangeField}
            />

            <Form.Field
              control={Search}
              input={{ icon: 'search', iconPosition: 'left' }}
              label="Reason"
              name="reason"
              noResultsMessage="Specifying another reason..."
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={this.state.results}
              value={reason}
              resultRenderer={resultRenderer}
            />
            <Button
              type="submit"
              color="teal"
              content="Next Steps – Review Information"
              icon="right arrow"
              labelPosition="right"
              disabled={!fieldsFilledOut}
              onClick={onClickNextSteps}
            />
          </Form>
        </FormContainer>
      </>
    );
  }
}

export default ApptInfo;
