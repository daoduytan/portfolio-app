import React, { Component } from 'react';
import Typed from 'react-typed';
import BaseLayout from '../components/layouts/BaseLayout';

import { Container, Row, Col } from 'reactstrap';

class Index extends Component {
  constructor(props) {
    super(props);

    this.roles = [
      'Web Developer',
      'Java Script',
      'MERN stack',
      'Team player',
      'American Football player',
      'Runner'
    ];
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <BaseLayout
        className="cover overflow"
        {...this.props.auth}
        headerType="index"
      >
        <div className="main-section">
          <div className="background-image">
            <img src="/static/images/background-index-0.png" />
          </div>

          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper`}>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img
                        className="image"
                        src="/static/images/section-0.png"
                      />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    {isAuthenticated && (
                      <span className="user-name">{user.name}</span>
                    )}
                    Welcome to the portfolio website of Marcin Cholewka. Get
                    informed, collaborate and discover projects I was working on
                    through the last years!
                  </h1>
                </div>

                <Typed
                  loop
                  typeSpeed={50}
                  backSpeed={50}
                  strings={this.roles}
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  cursorChar="|"
                  className="self-typed"
                />

                <div className="hero-welcome-bio">
                  <h1>Let's take a look on my work.</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BaseLayout>
    );
  }
}

export default Index;
