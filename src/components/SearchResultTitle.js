import React from 'react';

import FieldNames from '../api/FieldNames';
import Signals from '../api/Signals';

type SearchResultTitleProps = {
  /** The document whose title should be rendered. */
  doc: SearchDocument;
  /**
   * Optional. The location of the node through which to interact with Attivio.
   * Defaults to the value in the configuration.
   */
  baseUri: string;
  /** Optional. Set the Header class (e.g. 'h1') **/
  as: string;
};

type SearchResultTitleDefaultProps = {
  baseUri: string;
};

/**
 * The title of a given document in the search results. Any HTML markup in
 * the title is preserved so that highlighting, entities, and sentiment can
 * be displayed. It can optionally be made clickable, by passing a callback.
 */
export default class SearchResultTitle extends React.Component<SearchResultTitleDefaultProps, SearchResultTitleProps, void> {
  static defaultProps = {
    baseUri: '',
    as: 'h4',
  };

  constructor(props: SearchResultTitleProps) {
    super(props);
    (this: any).handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  titleLink: ?HTMLAnchorElement;

  handleDocumentClick() {
    if (this.titleLink) {
      this.titleLink.blur();
    }
    if (this.props.doc.signal) {
      new Signals(this.props.baseUri).addSignal(this.props.doc);
    }
    const uri = this.props.doc.getFirstValue(FieldNames.URI);
    const newWindow = window.open(uri, '_blank');
    newWindow.opener = null;
  }

  render() {
    let title = this.props.doc.getFirstValue(FieldNames.TITLE);
    if (!title) {
      title = '<span className="none">This document has no title</span>';
    }
    const uri = this.props.doc.getFirstValue(FieldNames.URI);
    let titleComp;

    if (uri) {
      titleComp = (
        <a
          onClick={this.handleDocumentClick}
          role="button"
          tabIndex={0}
          dangerouslySetInnerHTML={{ __html: title }} // eslint-disable-line react/no-danger
          ref={(c) => { this.titleLink = c; }}
        />
      );
    } else {
      titleComp = <span dangerouslySetInnerHTML={{ __html: title }} />; // eslint-disable-line react/no-danger
    }

    const className = 'attivio-search-result-title';
    const h1 = (<h1 className={className}>{titleComp}</h1>)
    const h2 = (<h2 className={className}>{titleComp}</h2>)
    const h3 = (<h3 className={className}>{titleComp}</h3>)
    const h4 = (<h4 className={className}>{titleComp}</h4>)

    if (this.props.as) {
      switch (this.props.as.toLowerCase()) {
        case 'h1': return h1;
        case 'h2': return h2;
        case 'h3': return h3;
        case 'h4': return h4;
      }
    }

    return h4;
  }
}
