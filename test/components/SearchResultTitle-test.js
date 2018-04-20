import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import SearchResult from '../../src/api/SearchDocument';
import SearchResultTitle from '../../src/components/SearchResultTitle';

describe('SearchResultTitle', function() {

  context('scales to different HTML headings', function() {

    const fields = new Map();
    fields.set('title', ['This is my title']);
    fields.set('uri', ['http://website.com']);
    const doc = new SearchResult(fields, null, []);

    it('supports H1', function() {
      const wrapper = shallow(<SearchResultTitle as='h1' doc={doc} />);
      expect(wrapper.find('h1')).to.have.length(1);
    })

    it('supports H2', function() {
      const wrapper = shallow(<SearchResultTitle as='h2' doc={doc} />);
      expect(wrapper.find('h2')).to.have.length(1);
    })

    it('supports H3', function() {
      const wrapper = shallow(<SearchResultTitle as='h3' doc={doc} />);
      expect(wrapper.find('h3')).to.have.length(1);
    })

    it('supports H4', function() {
      const wrapper = shallow(<SearchResultTitle as='h4' doc={doc} />);
      expect(wrapper.find('h4')).to.have.length(1);
    })

    it('defaults to H4', function() {
      const wrapper = shallow(<SearchResultTitle doc={doc} />);
      expect(wrapper.find('h4')).to.have.length(1);
    });
  });
});
