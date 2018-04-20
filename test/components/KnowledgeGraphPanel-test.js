/* global describe, before, it */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import NetworkDiagram from '../../src/components/NetworkDiagram';
import KnowledgeGraphPanel from '../../src/components/KnowledgeGraphPanel';

describe('The KnowledgeGraphPanel', function() {

  it('supports setting style via properties', function() {
    const height = '1337px';
    const backgroundColor = '#abcdef';

    const wrapper = shallow(<KnowledgeGraphPanel
                              panelHeight={height}
                              panelBackgroundColor={backgroundColor} />);
    expect(wrapper.find(NetworkDiagram).props().style).to.include({height, backgroundColor});
  });
});
