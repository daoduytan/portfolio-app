import React from 'react';
import Link from 'next/link';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

const BootstrapNavLink = props => {
  const { route, text } = props;

  return (
    <Link href={route}>
      <a className="nav-link port-navbar-link">{text} </a>
    </Link>
  );
};

const Login = () => {
  return <span className="nav-link port-navbar-link clickable">Login</span>;
};

const Logout = () => {
  return <span className="nav-link port-navbar-link clickable">Logout</span>;
};

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar className="port-navbar port-default absolute" dark expand="md">
          <NavbarBrand className="port-navbar-brand" href="/">
            Marcin Cholewka
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item">
                <BootstrapNavLink route="/" text="Home" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BootstrapNavLink route="/about" text="About" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BootstrapNavLink route="/portfolios" text="Portfolios" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BootstrapNavLink route="/blogs" text="Blog" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BootstrapNavLink route="/cv" text="CV" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <Login />
              </NavItem>
              <NavItem className="port-navbar-item">
                <Logout />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
