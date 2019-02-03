import React from 'react';
import HoverMenu from './HoverMenu';
import { Editor } from 'slate-react';
import { renderMark, renderNode } from './renderers';
import { initialValue } from './initial-value';

export default class SlateEditor extends React.Component {
  state = {
    value: initialValue,
    isLoaded: false
  };

  componentDidMount() {
    this.updateMenu();
    this.setState({ isLoaded: true });
  }

  componentDidUpdate = () => {
    this.updateMenu();
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  updateMenu = () => {
    const menu = this.menu;
    if (!menu) return;

    const { value } = this.state;
    const { fragment, selection } = value;

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style');
      return;
    }

    const native = window.getSelection();
    const range = native.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = 1;
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`;
  };

  render() {
    const { isLoaded } = this.state;

    return (
      <>
        {isLoaded && (
          <Editor
            placeholder="Enter some text..."
            value={this.state.value}
            onChange={this.onChange}
            renderMark={renderMark}
            renderNode={renderNode}
            renderEditor={this.renderEditor}
          />
        )}
      </>
    );
  }

  renderEditor = (props, editor, next) => {
    const children = next();
    return (
      <React.Fragment>
        {children}
        <HoverMenu innerRef={menu => (this.menu = menu)} editor={editor} />
      </React.Fragment>
    );
  };
}
