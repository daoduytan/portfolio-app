import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class PortfolioCardDetail extends React.Component {
  render() {
    const { isOpen, toggle, portfolio } = this.props;

    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            <b>{portfolio.name}</b>
          </ModalHeader>
          <ModalBody>
            <p>
              <b>Description : </b>
              {portfolio.description}
            </p>
            <p>
              <b>Visit this app on : </b>
              <a href={portfolio.url} target="_blank">
                {portfolio.url}
              </a>
            </p>
            <p>
              <b>Check code on GIT : </b>
              <a href={portfolio.git} target="_blank">
                {portfolio.git}
              </a>
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PortfolioCardDetail;
