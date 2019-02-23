import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';
import { Col, Row } from 'reactstrap';

class About extends Component {
  render() {
    return (
      <BaseLayout
        title="Marcin Cholewka - Learn more about me"
        {...this.props.auth}
      >
        <BasePage className="about-page">
          <Row className="mt-5">
            <Col md="6">
              <div className="left-side">
                <h1 className="title fadein">Hello,</h1>
                <h3 className="subtitle fadein">My name is Marcin</h3>
                <p className="subsubTitle fadein">
                  Software Engineer | Frontend | CSS3 | HTML5 | JavaScript |
                  React.JS
                </p>
                <div className="heading fadein">
                  <img
                    className="animated__logo"
                    src="https://img.icons8.com/color/480/html-5.png"
                    alt="HTML logo"
                  />
                  <img
                    className="animated__logo"
                    src="https://img.icons8.com/color/480/000000/css3.png"
                    alt="CSS logo"
                  />
                  <img
                    className="animated__logo"
                    src="https://img.icons8.com/color/480/000000/javascript.png"
                    alt="JavaScript logo"
                  />
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="fadein">
                <p>
                  My name is Marcin Cholewka and I am an junior software
                  engineer and freelance developer.{' '}
                </p>
                <p>
                  I "graduated bootcamp Web Developer", seeking the first
                  professional experience. I know it well in HTML, CSS, Java
                  Script and the React.js library. I'm doing great in the world
                  of new technologies. I am looking for development
                  opportunities as a programmer.
                </p>
              </div>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default About;
