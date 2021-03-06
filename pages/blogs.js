import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';
import { Row, Col, Container } from 'reactstrap';
import { Link } from '../routes';
import moment from 'moment';
import { getPublishedBlogs } from '../actions';
import { shortenText } from '../helpers/utils';

class Blogs extends Component {
  static async getInitialProps({ req }) {
    let blogs = [];
    try {
      blogs = await getPublishedBlogs(req);
    } catch (err) {
      console.error(err);
    }

    return { blogs };
  }

  renderPublishedBlogs = blogs =>
    blogs.map((blog, index) => (
      <div key={index} className="post-preview">
        <Link route={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="post-title">{blog.title}</h2>
            <h3 className="post-subtitle">{shortenText(blog.subTitle, 50)}</h3>
          </a>
        </Link>
        <p className="post-meta">
          Posted by
          <a href="#"> {blog.author} </a>
          {moment(blog.createdAt).format('LL')}
        </p>
      </div>
    ));

  render() {
    const { blogs } = this.props;

    return (
      <BaseLayout
        title="Marcin Cholewka - my blog posts"
        {...this.props.auth}
        headerType={'landing'}
        className="blog-listing-page"
      >
        <div
          className="masthead"
          style={{ backgroundImage: "url('/static/images/home-bg.jpg')" }}
        >
          <div className="overlay" />
          <Container>
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Coder Blog</h1>
                  <span className="subheading">
                    Programming, travelling, sport...
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <BasePage className="blog-body">
          <Row>
            <Col md="10" lg="8" className="mx-auto">
              {this.renderPublishedBlogs(blogs)}
              <div className="clearfix">
                <a className="btn btn-primary float-right" href="#">
                  Older Posts &rarr;
                </a>
              </div>
            </Col>
          </Row>

          <footer>
            <Container>
              <Row>
                <div className="col-lg-8 col-md-10 mx-auto">
                  <ul className="list-inline text-center">
                    <li className="list-inline-item">
                      <a
                        href="https://twitter.com/marcincholewka"
                        target="_blank"
                      >
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x" />
                          <i className="fab fa-twitter fa-stack-1x fa-inverse" />
                        </span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="https://www.linkedin.com/in/marcin-cholewka-15b72615a/"
                        target="_blank"
                      >
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x" />
                          <i className="fab fa-linkedin-in fa-stack-1x fa-inverse" />
                        </span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="https://github.com/Plastic82" target="_blank">
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x" />
                          <i className="fab fa-github fa-stack-1x fa-inverse" />
                        </span>
                      </a>
                    </li>
                  </ul>
                  <p className="copyright text-muted">
                    Copyright &copy; Marcin Cholewka 2019
                  </p>
                </div>
              </Row>
            </Container>
          </footer>
        </BasePage>
        <style jsx>
          {`
            @import url(' https://use.fontawesome.com/releases/v5.7.0/css/all.css ');
          `}
        </style>
      </BaseLayout>
    );
  }
}

export default Blogs;
