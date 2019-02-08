import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';
import { Router } from '../routes';

import { getAllExperiences, deleteExperience } from '../actions/index';
import ExperienceCard from '../components/experiences/ExperienceCard';

import { Row, Col, Button } from 'reactstrap';

class Experiences extends Component {
  static async getInitialProps() {
    let experiences = [];
    try {
      experiences = await getAllExperiences();
    } catch (error) {
      console.error(error);
    }
    return { experiences };
  }

  navigateToEdit(experienceId, event) {
    event.stopPropagation();
    Router.pushRoute(`/experiences/${experienceId}/edit`);
  }

  displayDeleteWarning(experienceId, event) {
    event.stopPropagation();
    const isConfirm = confirm(
      'Are you sure you want to delete this experience ???'
    );

    if (isConfirm) {
      this.deleteExperience(experienceId);
    }
  }

  deleteExperience(experienceId) {
    deleteExperience(experienceId)
      .then(() => {
        Router.pushRoute('/experiences');
      })
      .catch(err => console.error(err));
  }

  renderExperiences(experiences) {
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return experiences.map((experience, index) => {
      return (
        <Col md="4" key={index}>
          <ExperienceCard experience={experience}>
            {isAuthenticated && isSiteOwner && (
              <>
                <Button
                  onClick={event => this.navigateToEdit(experience._id, event)}
                  color="warning"
                  className="m-1"
                >
                  Edit
                </Button>
                <Button
                  onClick={event =>
                    this.displayDeleteWarning(experience._id, event)
                  }
                  color="danger"
                  className="m-1"
                >
                  Delete
                </Button>
              </>
            )}
          </ExperienceCard>
        </Col>
      );
    });
  }

  render() {
    const { experiences } = this.props;
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return (
      <BaseLayout title="Marcin Cholewka - my career" {...this.props.auth}>
        <BasePage className="experience-page" title="My experience">
          {isAuthenticated && isSiteOwner && (
            <Button
              onClick={() => Router.pushRoute('/experiences/new')}
              color="success"
              className="mb-4"
            >
              Create experience
            </Button>
          )}
          <Row>{this.renderExperiences(experiences)}</Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Experiences;
