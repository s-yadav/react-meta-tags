import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MetaTags from './meta_tags';

class ReactTitle extends Component {
  static propTypes = {
    title: PropTypes.string
  }
  render() {
    return (<MetaTags>
      <title>
        {this.props.title}
      </title>
    </MetaTags>);
  }
}

export default ReactTitle;
