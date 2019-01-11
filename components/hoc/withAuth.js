import React, { Component } from 'react';
import BaseLayout from '../layouts/BaseLayout';
import BasePage from '../shared/BasePage';

const withAuth = Component => {
  return class withAuth extends Component {
    static getInitialProps = async args => {
      const pageProps =
        (await Component.getInitialProps) && Component.getInitialProps(args);

      return { ...pageProps };
    };

    renderSecretPage = () => {
      const { isAuthenticated } = this.props.auth;

      return isAuthenticated ? (
        <Component {...this.props} />
      ) : (
        <BaseLayout {...this.props.auth}>
          <BasePage>
            <h1>
              You are not loged in. Please login to see content of this page.
            </h1>
          </BasePage>
        </BaseLayout>
      );
    };

    render() {
      return this.renderSecretPage();
    }
  };
};

export default withAuth;
