import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

class Cv extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>I'm Cv page</h1>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Cv;
