import React, {Component} from 'react';
import MetaTags from './meta_tags';

class ReactTitle extends Component {
  render() {
    return (<MetaTags>
      <title>
        {this.props.title}
      </title>
    </MetaTags>);
  }
}

export default ReactTitle;
