import React from 'react';
import expect from 'expect';
import { spy, stub } from 'sinon';
import { shallow } from 'enzyme';
import WindowMock from 'window-mock';

import spotfire from '../../src/lib/spotfire-7.5';
import SpotfireWebPlayer from '../../src/components/SpotfireWebPlayer';

spy(SpotfireWebPlayer.prototype, 'componentDidMount');
stub(spotfire.webPlayer.Document.prototype, '_loadProxyAndExecute');

const window = new WindowMock();
window.addEventListener = stub();
global.window = window;
global.document = window.document;

describe('<SpotfireWebPlayer />', () => {
  it('calls componentDidMount', () => {
    const wrapper = shallow(<SpotfireWebPlayer />);
    expect(SpotfireWebPlayer.prototype.componentDidMount.calledOnce).toEqual(true);
  });
});
