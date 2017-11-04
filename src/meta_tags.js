import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {getDuplicateTitle, getDuplicateMeta, appendChild, removeChild, getDomAsString} from './utils';


/** An wrapper component to wrap element which need to shifted to head **/
class MetaTags extends Component {
  static contextTypes = {
    extract: PropTypes.func
  }
  extractChildren() {
    const {extract} = this.context;

    if (extract) {
      extract(this.props.children);
      return;
    }
  }
  handleChildrens() {
    const {children} = this.props;

    if (this.context.extract){
      return;
    }

    const headComponent = <div className="react-head-temp">{children}</div>;

    const temp = document.createElement("div");
    ReactDOM.render(headComponent, temp, () => {
      const childStr = temp.innerHTML;

      //if html is not changed return
      if(this.lastChildStr === childStr){
        return;
      }

      this.lastChildStr = childStr;

      let childNodes = Array.prototype.slice.call(temp.querySelector('.react-head-temp').children);

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
        }
      });

      appendChild(document.head, childNodes);
    });

  }
  componentDidMount() {
    this.handleChildrens();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.children !== this.props.children) {
      this.handleChildrens();
    }
  }
  render() {
    this.extractChildren();
    return null;
  }
}

export default MetaTags;
