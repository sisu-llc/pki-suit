import React from 'react';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import { shallow } from 'enzyme';
import WindowMock from 'window-mock';

import spotfire from '../../src/lib/spotfire-7.5';
import SpotfireWebPlayer from '../../src/components/SpotfireWebPlayer';

stub(spotfire.webPlayer.Document.prototype, '_loadProxyAndExecute');

const window = new WindowMock();
window.addEventListener = stub();
global.window = window;
global.document = window.document;

describe('SpotfireWebPlayer', function() {
  it('should contain a "container" for Spotfire to use', function() {
    const wrapper = shallow(<SpotfireWebPlayer />);
    expect(wrapper.find('#container')).to.have.lengthOf(1);
  });

  it('sound provide a login link on 401 errors', function() {
    const wrapper = shallow(<SpotfireWebPlayer />);
    expect(wrapper.find('a')).to.have.length(0);

    wrapper.setState({requiresLogin: true});
    expect(wrapper.find('a')).to.have.length(1);
  });
});
