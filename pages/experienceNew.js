import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';
import withAuth from '../components/hoc/withAuth';
import ExperienceNewForm from '../components/experiences/ExperienceNewForm';
import { Row, Col } from 'reactstrap';
import { createExperience } from '../actions/index';
import { Router } from '../routes';
import moment from 'moment';

const INITIAL_VALUES = {
  title: '',
  company: '',
  location: '',
  position: '',
  description: '',
  startDate: moment(),
  endDate: moment()
};

class ExperienceNew extends Component {
  constructor(props) {
    super();

    this.state = {
      error: undefined
    };

    this.saveExperience = this.saveExperience.bind(this);
  }

  saveExperience(experienceData, { setSubmitting }) {
    setSubmitting(true);

    createExperience(experienceData)
      .then(experience => {
        setSubmitting(false);

        this.setState({ error: undefined });
        Router.pushRoute('/experiences');
      })
      .catch(err => {
        const error = err.message || 'Server Error!';
        setSubmitting(false);

        this.setState({ error });
      });
  }

  render() {
    const { error } = this.state;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage
          className="experience-create-page"
          title="Create New Experience"
        >
          <Row>
            <Col md="6">
              <ExperienceNewForm
                initialValues={INITIAL_VALUES}
                error={error}
                onSubmit={this.saveExperience}
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth('siteOwner')(ExperienceNew);
