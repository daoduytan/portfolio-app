import React, { Component } from 'react';
import { withRouter } from 'next/router';
import axios from 'axios';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

class Experience extends Component {
  static async getInitialProps({ query }) {
    const experienceId = query.id;
    let experience = {};
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${experienceId}`
      );
      experience = response.data;
    } catch (error) {
      console.error(error);
    }

    return { experience };
  }

  render() {
    const { experience } = this.props;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>{experience.title}</h1>
          <p>POST_ID: {experience.id}</p>
          <p>BODY: {experience.body}</p>
          <p>USER_ID: {experience.userId}</p>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(Experience);
