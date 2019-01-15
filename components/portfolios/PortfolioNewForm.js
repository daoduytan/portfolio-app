import React from 'react';
import PortInput from '../form/PortInput';
import { Formik, Form, Field } from 'formik';
import { Button } from 'reactstrap';
import PortDate from '../form/PortDate';

const validateInputs = values => {
  let errors = {};

  Object.entries(values).forEach(([key, values]) => {
    if (!values[key] && values[key] === 'date') {
      errors[key] = `Field ${key} is required !`;
    }
  });

  const startDate = values.startDate;
  const endDate = values.endDate;

  if (startDate && endDate && endDate.isBefore(startDate)) {
    errors.endDate = 'End date cannot be before start date';
  }

  return errors;
};

const INITIAL_VALUES = {
  title: '',
  company: '',
  location: '',
  position: '',
  description: '',
  startDate: '',
  endDate: ''
};

const PortfolioNewForm = () => (
  <div>
    <Formik
      initialValues={INITIAL_VALUES}
      validate={validateInputs}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="title" label="Title" component={PortInput} />

          <Field
            type="text"
            name="company"
            label="Company"
            component={PortInput}
          />

          <Field
            type="text"
            name="location"
            label="Location"
            component={PortInput}
          />

          <Field
            type="text"
            name="position"
            label="Position"
            component={PortInput}
          />

          <Field
            type="textarea"
            name="description"
            label="Description"
            component={PortInput}
          />

          <Field
            type="date"
            name="startDate"
            label="Start Date"
            component={PortDate}
          />

          <Field
            type="date"
            name="endDate"
            label="End Date"
            canBeDisabled={true}
            component={PortDate}
          />

          <Button type="submit" disabled={isSubmitting}>
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioNewForm;
