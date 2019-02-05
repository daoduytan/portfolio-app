import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';
import { Row, Col } from 'reactstrap';

class Cv extends Component {
  render() {
    return (
      <BaseLayout title="Marcin Cholewka - grab my CV" {...this.props.auth}>
        <BasePage title="View my CV" className="cv-page">
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <div className="cv-title">
                <a
                  download="CV_Marcin_Cholewka.pdf"
                  className="btn btn-success"
                  href="/static/CV_Marcin_Cholewka_ENG.pdf"
                >
                  Download
                </a>
              </div>
              <iframe
                src="/static/CV_Marcin_Cholewka_ENG.pdf"
                className="cv-iframe"
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Cv;
