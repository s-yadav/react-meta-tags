import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

//function to append childrens on a parent
function appendChild(parent, childrens) {

  if (childrens.length === undefined) childrens = [childrens];

  const docFrag = document.createDocumentFragment();

  for (let i = 0, ln = childrens.length; i < ln; i++) {
    docFrag.appendChild(childrens[i]);
  }

  parent.appendChild(docFrag);
}


//get dom as string format
function getDomAsString(dom) {
  const temp = document.createElement('div');
  temp.appendChild(dom);
  return temp.innerHTML;
}

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
    ReactDOM.render(headComponent, temp);
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

    //remove title and elements from head tag having same id
    childNodes.forEach((child) => {
      const elemInHead = !!child.id && head.querySelector('#' + child.id);
      if (elemInHead) {
        head.removeChild(elemInHead);
      }

      //remove title always
      if(!elemInHead && child.tagName === 'TITLE'){
        const title = head.querySelector('title');
        if(title) {
          head.removeChild(title);
        }
      }
    });

    appendChild(document.head, childNodes);
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
