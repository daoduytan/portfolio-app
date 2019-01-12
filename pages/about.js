import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

class About extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="about-page" title="I am About page" />
      </BaseLayout>
    );
  }
}

export default About;
