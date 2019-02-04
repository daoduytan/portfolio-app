import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';
import { Container, Row, Col } from 'reactstrap';

import withAuth from '../components/hoc/withAuth';

class userBlogs extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth} headerType={'landing'}>
        <div
          className="masthead"
          style={{ backgroundImage: "url('/static/images/home-bg.jpg')" }}
        >
          <div className="overlay" />
          <Container>
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Fresh Blogs</h1>
                  <span className="subheading">
                    Programming, travelling, sport...
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <BasePage className="blog-user-page">
          <Row>
            <Col md="6" className="mx-auto text-center">
              Published Blogs
            </Col>
            <Col md="6" className="mx-auto text-center">
              Draft Blogs
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth('siteOwner')(userBlogs);
