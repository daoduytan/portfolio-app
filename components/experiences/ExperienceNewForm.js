import React from 'react';
import PortInput from '../form/PortInput';
import { Formik, Form, Field } from 'formik';
import { Button, Alert } from 'reactstrap';
import PortDate from '../form/PortDate';
import moment from 'moment';

const validateInputs = values => {
  let errors = {};

  Object.entries(values).forEach(([key, value]) => {
    if (!values[key] && key !== 'endDate') {
      errors[key] = `Field ${key} is required !`;
    }
  });

  const startDate = moment(values.startDate);
  const endDate = moment(values.endDate);

  if (startDate && endDate && endDate.isBefore(startDate)) {
    errors.endDate = 'End date cannot be before start date';
  }

  return errors;
};

const ExperienceNewForm = ({ initialValues, onSubmit, error }) => (
  <div>
    <Formik
      initialValues={initialValues}
      validate={validateInputs}
      onSubmit={onSubmit}
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
            initialDate={initialValues.startDate}
            name="startDate"
            label="Start Date"
            component={PortDate}
          />

          <Field
            type="date"
            initialDate={initialValues.endDate}
            name="endDate"
            label="End Date"
            canBeDisabled={true}
            component={PortDate}
          />

          {error && <Alert color="danger">{error}</Alert>}

          <Button
            color="success"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default ExperienceNewForm;
