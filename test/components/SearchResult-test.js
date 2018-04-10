import React from 'react';
import { expect, assert } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import SearchDocument from '../../src/api/SearchDocument';
import SearchResult from '../../src/components/SearchResult';
import SpotfireWebPlayer from '../../src/components/SpotfireWebPlayer';

describe('SearchResult', function () {

  context('when is in list format', function () {

    const format = 'list';
    const fields = new Map();
    fields.set('.type', ['spotfire']);
    fields.set('table', ['spotfire']);
    const doc = new SearchDocument(fields, null, []);

    it('should render SpotfireWebPlayer components', function() {
      const renderSpy = spy(SearchResult.prototype, 'renderSpotfireResult');
      const wrapper = shallow(<SearchResult format={format} document={doc} position={1} key={'id'}/>);

      expect(renderSpy.called).to.be.true;
      expect(wrapper.find('SpotfireWebPlayer')).to.have.length(1);
    });
  });
});
