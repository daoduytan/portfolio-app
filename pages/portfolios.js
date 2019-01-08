import React from 'react';
import { Link } from '../routes';
import axios from 'axios';
import BaseLayout from '../components/layouts/BaseLayout';

class Portfolios extends React.Component {
  static async getInitialProps() {
    let posts = [];
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );

      posts = response.data;
    } catch (error) {
      console.error(error);
    }
    return { posts: posts.splice(0, 10) };
  }

  renderPosts(posts) {
    return posts.map(post => {
      console.log(post.id);
      return (
        <li key={post.id}>
          <Link route={`/portfolio/${post.id}`}>
            <a>{post.title} </a>
          </Link>
        </li>
      );
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <BaseLayout>
        <h1>I'm porfolios page</h1>
        <ul>{this.renderPosts(posts)}</ul>
      </BaseLayout>
    );
  }
}

export default Portfolios;
