import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';
import withAuth from '../components/hoc/withAuth';

import { getSecretData } from '../actions/index';

class Secret extends Component {
  static getInitialProps() {
    const superSecretValue = 'Super secret value';

    return { superSecretValue };
  }

  constructor(props) {
    super();
    this.state = {
      secretData: []
    };
  }

  async componentDidMount() {
    const secretData = await getSecretData();

    this.setState({
      secretData
    });
  }

  displaySecretData = () => {
    const { secretData } = this.state;
    return secretData && secretData.length > 0
      ? secretData.map((data, index) => {
          return (
            <div key={index}>
              <p>{data.title}</p>
              <p>{data.description}</p>
            </div>
          );
        })
      : null;
  };

  render() {
    const { superSecretValue } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>I'm Secret page</h1>
          <p>Secret content</p>
          <h2>{superSecretValue}</h2>
          {this.displaySecretData()}
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth(Secret);
