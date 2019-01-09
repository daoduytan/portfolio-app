import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

class Callback extends Component {
  render() {
    return (
      <BaseLayout>
        <BasePage>
          <h1>Veryfying login data...</h1>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Callback;
