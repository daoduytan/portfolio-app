import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import axios from 'axios';

class Index extends React.Component {
  static async getInitialProps() {
    let userData = {};
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1'
      );
      userData = response.data;
    } catch (error) {
      console.log(error);
    }

    return { userData };
  }

  constructor(props) {
    super(props);
    this.state = {
      title: `I'm a state title`
    };
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  updatedTitle = () => {
    this.setState({ title: `You changed me` });
  };

  render() {
    const { title } = this.state;

    return (
      <BaseLayout>
        <h1>I'm Home (index) page</h1>
        <h2>{title}</h2>
        <button onClick={this.updatedTitle}>Change title</button>
      </BaseLayout>
    );
  }
}

export default Index;
