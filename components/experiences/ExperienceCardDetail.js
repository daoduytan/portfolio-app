import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';

class ExperienceCardDetail extends React.Component {
  render() {
    const { isOpen, toggle, experience } = this.props;

    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            <b>{experience.title}</b>
          </ModalHeader>
          <ModalBody>
            <p>
              <b>Description : </b>
              {experience.description}
            </p>
            <p>
              <b>Company : </b>
              {experience.company}
            </p>
            <p>
              <b>Position : </b>
              {experience.position}
            </p>
            <p>
              <b>Location : </b>
              {experience.location}
            </p>
            <p>
              <b>Start Date : </b>
              {moment(experience.startDate).format('MMMM YYYY')}
            </p>
            <p>
              <b>End Date : </b>
              {experience.endDate
                ? moment(experience.endDate).format('MMMM YYYY')
                : 'Still working here.'}
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

export default ExperienceCardDetail;
