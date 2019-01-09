import React from 'react';
import { withRouter } from 'next/router';
import axios from 'axios';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

class Portfolio extends React.Component {
  static async getInitialProps({ query }) {
    const portfolioId = query.id;
    let portfolio = {};
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${portfolioId}`
      );
      portfolio = response.data;
    } catch (error) {
      console.error(error);
    }

    return { portfolio };
  }

  render() {
    const { portfolio } = this.props;

    return (
      <BaseLayout>
        <BasePage>
          <h1>{portfolio.title}</h1>
          <p>POST_ID: {portfolio.id}</p>
          <p>BODY: {portfolio.body}</p>
          <p>USER_ID: {portfolio.userId}</p>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(Portfolio);
