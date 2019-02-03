import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';
import withAuth from '../components/hoc/withAuth';

import SlateEditor from '../components/slate-editor/Editor';

class BlogEditor extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage
          containerClass="editor-wrapper"
          className="blog-editor-page"
          title="Write new posts."
        >
          <SlateEditor />
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth('siteOwner')(BlogEditor);
