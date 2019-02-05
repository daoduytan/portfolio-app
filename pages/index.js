import React, { Component } from 'react';
import Typed from 'react-typed';
import BaseLayout from '../components/layouts/BaseLayout';

import { Container, Row, Col } from 'reactstrap';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlipping: false
    };

    this.roles = [
      'Software Engineer',
      'Java Script',
      'React.js',
      'Team player',
      'American Football player',
      'Runner'
    ];
  }

  componentDidMount() {
    this.animateCard();
  }

  componentWillUnmount() {
    this.cardAnimationInterval && clearInterval(this.cardAnimationInterval);
  }

  animateCard() {
    this.cardAnimationInterval = setInterval(() => {
      this.setState({
        isFlipping: !this.state.isFlipping
      });
    }, 5000);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { isFlipping } = this.state;

    return (
      <BaseLayout
        className={`overflow ${isFlipping ? 'cover-1' : 'cover'}`}
        {...this.props.auth}
        headerType="index"
        title="Marcin Cholewka - portfolio"
      >
        <div className="main-section">
          <div className="background-image">
            <img
              src="/static/images/background-index-0.png"
              alt="background with bricks"
            />
          </div>
          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                    <div className="front">
                      <div className="hero-section-content">
                        <h2> Software Engineer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img
                        className="image"
                        src="/static/images/section-1.png"
                        alt="Guy working on the desk, on welcome page, front card."
                      />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Get Your projects done </h2>
                        <div className="hero-section-content-intro">
                          Professional and top quality service in web
                          development.
                        </div>
                      </div>
                      <img
                        className="image"
                        src="/static/images/section-2.png"
                        alt="Guy prepare to work, on welcome page, back card."
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
                <div className="hero-welcome-bio" />
              </Col>
            </Row>
          </Container>
          <span className="service-link">
            Vector illustration credit:{' '}
            <a href="http://www.Vecteezy.com"> vecteezy.com</a>
          </span>
        </div>
      </BaseLayout>
    );
  }
}

export default Index;
