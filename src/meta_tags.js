import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {getDuplicateTitle, getDuplicateCanonical, getDuplicateMeta, appendChild, removeChild, getDomAsString} from './utils';


/** An wrapper component to wrap element which need to shifted to head **/
class MetaTags extends Component {
  static contextTypes = {
    extract: PropTypes.func
  };
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
    if(!this.context.children) return;
    const {extract} = this.context;

    if (extract) {
      extract(this.props.children);
    }
  }
  handleChildrens() {
    if(!this.props.children) return;
    const {children} = this.props;

    if (this.context.extract){
      return;
    }

    const headComponent = <div className="react-head-temp">{children}</div>;

    ReactDOM.render(headComponent, this.temporaryElement, () => {
      const childStr = this.temporaryElement.innerHTML;

      //if html is not changed return
      if(this.lastChildStr === childStr){
        return;
      }

      this.lastChildStr = childStr;

      let childNodes = Array.prototype.slice.call(this.temporaryElement.querySelector('.react-head-temp').children);

      const head = document.head;
      const headHtml = head.innerHTML;

      //filter children remove if children has not been changed
      childNodes = childNodes.filter((child) => {
        return headHtml.indexOf(getDomAsString(child)) === -1;
      });

      //remove duplicate title and meta from head
      childNodes.forEach((child) => {
        const tag = child.tagName.toLowerCase();
        if (tag === 'title') {
          const title = getDuplicateTitle();
          if (title) removeChild(head, title);
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
