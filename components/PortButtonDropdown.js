import React from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export default class PortButtonDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <ButtonDropdown
        className="port-dropdown"
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle caret size="sm" color="primary" />
        <DropdownMenu>
          <DropdownItem>Make a draft / Publish story</DropdownItem>
          <DropdownItem>Delete</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
