import {Component, Children} from 'react';
import PropTypes from 'prop-types';

/** context class which passes extract fuunction to MetaTags Component **/
class MetaTagsContext extends Component {
  static childContextTypes = {
    extract: PropTypes.func
  }
  getChildContext() {
    return {extract: this.props.extract};
  }
  render() {
    return Children.only(this.props.children);
  }
}

export default MetaTagsContext;
