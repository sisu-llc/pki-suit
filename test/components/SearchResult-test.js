import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import SearchDocument from '../../src/api/SearchDocument';
import SearchResult from '../../src/components/SearchResult';
import SpotfireWebPlayer from '../../src/components/SpotfireWebPlayer';

describe('SearchResult', function () {

  context('when presented with a special Spotfire SearchDocument', function () {

    const fields = new Map();
    fields.set('pki.suit.type', ['spotfire']);
    fields.set('table', ['spotfire']);

    const doc = new SearchDocument(fields, null, []);

    // This will be a bit naive at first as assume we only want to filter 1 column on 1 table
    const docWithFilters = new SearchDocument(fields, null, []);
    const expectedFilter = { table: 'WorldBankData', column: 'Country Name', values: ['Algeria'] };
    docWithFilters.fields.set('pki.spotfire.filter.table', [expectedFilter.table]);
    docWithFilters.fields.set('pki.spotfire.filter.column', [expectedFilter.column]);
    docWithFilters.fields.set('pki.spotfire.filter.values', expectedFilter.values);

    it('should render SpotfireWebPlayer components', function() {
      const renderSpy = spy(SearchResult.prototype, 'renderSpotfireResult');
      const wrapper = shallow(<SearchResult document={doc} position={1} key="id" />);

      expect(renderSpy.called).to.be.true;
      expect(wrapper.find('SpotfireWebPlayer')).to.have.length(1);
    });

    it('should apply filters to SpotfireWebPlayer components based on SearchDocuments', function() {
      const wrapper = shallow(<SearchResult document={doc} position={1} key="id" />);

      const webplayer = wrapper.find('SpotfireWebPlayer').first();
      expect(webplayer.props().filters).to.deep.equal([expectedFilter]);
    });
  });
});
