import React from 'react';
import { ExtractFunction } from './index';

export interface MetaTagsInstance {
  extract: ExtractFunction;
  renderToString: () => string;
  getTags: () => React.ReactElement[];
}

const MetaTagsServer: () => MetaTagsInstance

export default MetaTagsServer;
