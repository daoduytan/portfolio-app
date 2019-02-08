import React from 'react';
import PortInput from '../form/PortInput';
import { Formik, Form, Field } from 'formik';
import { Button, Alert } from 'reactstrap';

const PortfolioNewForm = ({ initialValues, onSubmit, error }) => (
  <div>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Field
            type="text"
            name="name"
            label="App name"
            component={PortInput}
          />

          <Field type="url" name="git" label="GIT url" component={PortInput} />

          <Field type="url" name="url" label="App url " component={PortInput} />

          <Field
            type="textarea"
            name="description"
            label="Description"
            component={PortInput}
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

export default PortfolioNewForm;
