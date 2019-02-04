import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';
import withAuth from '../components/hoc/withAuth';

import SlateEditor from '../components/slate-editor/Editor';
import { getBlogById } from '../actions';

class BlogEditorUpdate extends Component {
  static async getInitialProps({ query }) {
    const blogId = query.id;
    let blog = {};

    try {
      blog = await getBlogById(blogId);
    } catch (err) {
      console.error(err);
    }

    return { blog };
  }

  constructor() {
    super();

    this.state = {
      isSaving: false
    };
  }

  render() {
    const { blog } = this.props;
    const { isSaving } = this.state;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage containerClass="editor-wrapper" className="blog-editor-page">
          <SlateEditor
            initialValue={blog.story}
            isLoading={isSaving}
            save={() => {
              console.log('Here should be update.');
            }}
          />
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth('siteOwner')(BlogEditorUpdate);
