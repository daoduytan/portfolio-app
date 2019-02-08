import React, { Component } from 'react';
import ExperienceCardDetail from './ExperienceCardDetail';
import { Card, CardText, CardBody, CardTitle, CardHeader } from 'reactstrap';

export default class ExperienceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { experience, children } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        <span onClick={this.handleToggle}>
          <ExperienceCardDetail
            toggle={this.handleToggle}
            experience={experience}
            isOpen={isOpen}
          />
          <Card className="experience-card">
            <CardHeader className="experience-card-header">
              {experience.position}
            </CardHeader>
            <CardBody>
              <p className="experience-card-city"> {experience.location} </p>
              <CardTitle className="experience-card-title">
                {experience.title}
              </CardTitle>
              <CardText className="experience-card-text">
                {experience.description}
              </CardText>
              <div className="readMore">{children}</div>
            </CardBody>
          </Card>
        </span>
      </>
    );
  }
}
