import React, {Component, Children, createContext} from 'react';

const MetaContext = createContext({});

/** context class which passes extract fuunction to MetaTags Component **/
class MetaContextProviderWrapper extends Component {
  render() {
    return (
      <MetaContext.Provider
        value={{
          extract: this.props.extract,
        }}
      >
        {Children.only(this.props.children)}
      </MetaContext.Provider>
    );
  }
}

export {MetaContext};

export default MetaContextProviderWrapper;
