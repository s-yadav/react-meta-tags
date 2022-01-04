import React from 'react';

export interface ExtractFunction {
  (elements: React.ReactElement | React.ReactElement[]): void;
}

export class MetaTagsContext extends React.Component<{
  extract: ExtractFunction;
}> {};
  
export class MetaTags extends React.Component {};
  
export class ReactTitle extends React.Component<{ title: string }> {};

export default MetaTags;
