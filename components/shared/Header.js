import React, { Component } from 'react';

import Link from 'next/link';
import auth0 from '../../services/auth0';
import ActiveLink from '../ActiveLink';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const BootstrapNavLink = props => {
  const { route, title } = props;
  const className = props.className || '';

  return (
    <ActiveLink activeClassName="active" route={route}>
      <a className={`nav-link port-navbar-link ${className}`}>{title} </a>
    </ActiveLink>
  );
};

const Login = () => {
  return (
    <span onClick={auth0.login} className="nav-link port-navbar-link clickable">
      Login
    </span>
  );
};

const Logout = () => {
  return (
    <span
      onClick={auth0.logout}
      className="nav-link port-navbar-link clickable"
    >
      Logout
    </span>
  );
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dropdownOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  renderBlogMenu() {
    const { isSiteOwner } = this.props;

    if (isSiteOwner) {
      return (
        <Dropdown
          className="port-navbar-link port-dropdown-menu"
          nav
          isOpen={this.state.dropdownOpen}
          toggle={this.toggleDropdown}
        >
          <DropdownToggle className="port-dropdown-toggle" nav caret>
            Blog
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <BootstrapNavLink
                className="port-dropdown-item"
                route="/blogs"
                title="Blog"
              />{' '}
            </DropdownItem>

            <DropdownItem>
              <BootstrapNavLink
                className="port-dropdown-item"
                route="/blogs/new"
                title="Create a post"
              />{' '}
            </DropdownItem>
            <DropdownItem>
              <BootstrapNavLink
                className="port-dropdown-item"
                route="/blogs/dashboard"
                title="Posts dashboard"
              />{' '}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    return (
      <NavItem className="port-navbar-item">
        <BootstrapNavLink route="/blogs" title="Blog" />
      </NavItem>
    );
  }

  render() {
    const { isAuthenticated, className } = this.props;
    const { isOpen } = this.state;

    const menuOpenClass = isOpen ? 'menu-open' : 'menu-close';

    return (
      <div>
        <Navbar
          className={`port-navbar port-nav-base absolute ${className} ${menuOpenClass}`}
          dark
          expand="md"
        >
          <NavbarBrand className="port-navbar-brand" href="/">
            Marcin Cholewka
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item">
                <BootstrapNavLink route="/" title="Home" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BootstrapNavLink route="/about" title="About" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BootstrapNavLink route="/portfolios" title="Portfolios" />
              </NavItem>
              {this.renderBlogMenu()}
              <NavItem className="port-navbar-item">
                <BootstrapNavLink route="/cv" title="CV" />
              </NavItem>
              {!isAuthenticated && (
                <NavItem className="port-navbar-item">
                  <Login />
                </NavItem>
              )}
              {isAuthenticated && (
                <NavItem className="port-navbar-item">
                  <Logout />
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
