import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';
import withAuth from '../components/hoc/withAuth';
import ExperienceNewForm from '../components/experiences/ExperienceNewForm';
import { Row, Col } from 'reactstrap';
import { updateExperience, getExperienceById } from '../actions/index';
import { Router } from '../routes';

class ExperienceEdit extends Component {
  static async getInitialProps({ query }) {
    let experience = {};

    try {
      experience = await getExperienceById(query.id);
    } catch (error) {
      console.error(error);
    }

    return { experience };
  }

  constructor(props) {
    super();

    this.state = {
      error: undefined
    };

    this.updateExperience = this.updateExperience.bind(this);
  }

  updateExperience(experienceData, { setSubmitting }) {
    setSubmitting(true);

    updateExperience(experienceData)
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
    const { experience } = this.props;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="experience-create-page" title="Update Experience">
          <Row>
            <Col md="6">
              <ExperienceNewForm
                initialValues={experience}
                error={error}
                onSubmit={this.updateExperience}
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth('siteOwner')(ExperienceEdit);
