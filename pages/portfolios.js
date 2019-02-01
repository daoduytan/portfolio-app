import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';
import { Router } from '../routes';

import { getAllPortfolios, deletePortfolio } from '../actions/index';

import {
  Row,
  Card,
  Col,
  CardText,
  CardBody,
  CardTitle,
  CardHeader,
  Button
} from 'reactstrap';

class Portfolios extends Component {
  static async getInitialProps() {
    let portfolios = [];
    try {
      portfolios = await getAllPortfolios();
    } catch (error) {
      console.log(error);
    }
    return { portfolios };
  }

  displayDeleteWarning(portfolioId) {
    const isConfirm = confirm(
      'Are you sure you want to delete this portfolio ???'
    );

    if (isConfirm) {
      this.deletePortfolio(portfolioId);
    }
  }

  deletePortfolio(portfolioId) {
    deletePortfolio(portfolioId)
      .then(() => {
        Router.pushRoute('/portfolios');
      })
      .catch(err => console.error(err));
  }

  renderPortfolios(portfolios) {
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return portfolios.map((portfolio, index) => {
      return (
        <Col md="4" key={index}>
          <React.Fragment>
            <span>
              <Card className="portfolio-card">
                <CardHeader className="portfolio-card-header">
                  {portfolio.position}
                </CardHeader>
                <CardBody>
                  <p className="portfolio-card-city"> {portfolio.location} </p>
                  <CardTitle className="portfolio-card-title">
                    {portfolio.title}
                  </CardTitle>
                  <CardText className="portfolio-card-text">
                    {portfolio.description}
                  </CardText>
                  <div className="readMore">
                    {isAuthenticated && isSiteOwner && (
                      <>
                        <Button
                          onClick={() =>
                            Router.pushRoute(
                              `/portfolios/${portfolio._id}/edit`
                            )
                          }
                          color="warning"
                          className="m-1"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() =>
                            this.displayDeleteWarning(portfolio._id)
                          }
                          color="danger"
                          className="m-1"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </CardBody>
              </Card>
            </span>
          </React.Fragment>
        </Col>
      );
    });
  }

  render() {
    const { portfolios } = this.props;
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-page" title="Portfolios">
          {isAuthenticated && isSiteOwner && (
            <Button
              onClick={() => Router.pushRoute('/portfolioNew')}
              color="success"
              className="mb-4"
            >
              Create portfolio
            </Button>
          )}
          <Row>{this.renderPortfolios(portfolios)}</Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolios;
