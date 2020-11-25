import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  getDuplicateTitle,
  getDuplicateCanonical,
  getDuplicateMeta,
  getDuplicateElementById,
  appendChild,
  removeChild,
} from './utils';
import { MetaContext } from './meta_tags_context';

/** An wrapper component to wrap element which need to shifted to head **/
class MetaTags extends Component {
  static contextType = MetaContext;

  componentDidMount() {
    this.temporaryElement = document.createElement('div');
    this.handleChildrens();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.children !== this.props.children) {
      this.handleChildrens();
    }
  }
  componentWillUnmount() {
    if (this.temporaryElement) {
      ReactDOM.unmountComponentAtNode(this.temporaryElement);
    }
  }
  extractChildren() {
    const { extract } = this.context;
    const { children } = this.props;

    if (!children) {
      return;
    }

    if (extract) {
      extract(children);
    }
  }
  handleChildrens() {
    const { children } = this.props;
    if (this.context.extract || !children) {
      return;
    }

    const headComponent = <div className="react-head-temp">{children}</div>;

    ReactDOM.render(headComponent, this.temporaryElement, () => {
      const childStr = this.temporaryElement.innerHTML;

      //if html is not changed return
      if (this.lastChildStr === childStr) {
        return;
      }

      this.lastChildStr = childStr;

      const tempHead = this.temporaryElement.querySelector('.react-head-temp');

      // .react-head-temp might not exist when triggered from async action
      if (tempHead === null) {
        return;
      }

      let childNodes = Array.prototype.slice.call(tempHead.children);

      const head = document.head;
      const headHtml = head.innerHTML;

      //filter children remove if children has not been changed
      childNodes = childNodes.filter((child) => {
        return headHtml.indexOf(child.outerHTML) === -1;
      });

      //create clone of childNodes
      childNodes = childNodes.map((child) => child.cloneNode(true));

      //remove duplicate title and meta from head
      childNodes.forEach((child) => {
        const tag = child.tagName.toLowerCase();
        if (tag === 'title') {
          const title = getDuplicateTitle();
          if (title) removeChild(head, title);
        } else if (child.id) {
          // if the element has id defined remove the existing element with that id
          const elm = getDuplicateElementById(child);
          if (elm) removeChild(head, elm);
        } else if (tag === 'meta') {
          const meta = getDuplicateMeta(child);
          if (meta) removeChild(head, meta);
        } else if (tag === 'link' && child.rel === 'canonical') {
          const link = getDuplicateCanonical(child);
          if (link) removeChild(head, link);
        }
      });

      appendChild(document.head, childNodes);
    });
  }
  render() {
    this.extractChildren();
    return null;
  }
}

export default MetaTags;
