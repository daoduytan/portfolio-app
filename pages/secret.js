import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';
import withAuth from '../components/hoc/withAuth';

class Secret extends Component {
  static getInitialProps() {
    const superSecretValue = 'Super secret value';

    return { superSecretValue };
  }

  render() {
    const { superSecretValue } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>I'm Secret page</h1>
          <p>Secret content</p>
          <h2>{superSecretValue}</h2>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth(Secret);
