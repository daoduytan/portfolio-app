import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';
import { Router } from '../routes';

import { getAllPortfolios, deletePortfolio } from '../actions/index';
import PortfolioCard from '../components/portfolios/PortfolioCard';

import { Row, Col, Button } from 'reactstrap';

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

  navigateToEdit(portfolioId, event) {
    event.stopPropagation();
    Router.pushRoute(`/portfolios/${portfolioId}/edit`);
  }

  displayDeleteWarning(portfolioId, event) {
    event.stopPropagation();
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
          <PortfolioCard portfolio={portfolio}>
            {isAuthenticated && isSiteOwner && (
              <>
                <Button
                  onClick={event => this.navigateToEdit(portfolio._id, event)}
                  color="warning"
                  className="m-1"
                >
                  Edit
                </Button>
                <Button
                  onClick={event =>
                    this.displayDeleteWarning(portfolio._id, event)
                  }
                  color="danger"
                  className="m-1"
                >
                  Delete
                </Button>
              </>
            )}
          </PortfolioCard>
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
