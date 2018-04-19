import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import DataPairs, { DataPairInfo } from '../../src/components/DataPairs';
import SearchDocument from '../../src/api/SearchDocument';


describe('DataPairs', function () {

  it('renders inline HTML for highlighted field values', function () {
    const htmlString = '<span class="highlight">hit</span> me baby, one more time';
    const datapair = new DataPairInfo('Label Name', htmlString, 'lyric')

    const wrapper = shallow(<DataPairs pairs={[datapair]} />);
    expect(wrapper.find('dd').html()).to.include('<span class="highlight">');
  });

});
