import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import WindowMock from 'window-mock';

import spotfire from '../../src/lib/spotfire-7.5';
import SpotfireWebPlayer from '../../src/components/SpotfireWebPlayer';


describe('SpotfireWebPlayer', function() {
  const sandbox = sinon.createSandbox();
  const guid = 'ABCD';

  before(function() {
    sandbox.stub(spotfire.webPlayer.Document.prototype, '_loadProxyAndExecute');

    const window = new WindowMock();
    window.addEventListener = sandbox.stub();
    global.window = window;
    global.document = window.document;
  });

  it('should contain a container for Spotfire to use', function() {
    const wrapper = shallow(<SpotfireWebPlayer guid={guid} />);
    expect(wrapper.find(`#${guid}`)).to.have.lengthOf(1);
  });

  it('should generate a unique guid to prevent collisions', function() {
    const wrapper = shallow(<SpotfireWebPlayer />);
    expect(wrapper.state('guid')).to.have.lengthOf.at.least(16);
  });

  it('should provide a login link if user is not logged into Spotfire', function() {
    const wrapper = shallow(<SpotfireWebPlayer />);
    wrapper.setState({requiresLogin: false});
    expect(wrapper.find('a')).to.have.length(0);

    wrapper.setState({requiresLogin: true});
    expect(wrapper.find('a')).to.have.length(1);
  });

  it('should show toggle login links on 401 errors', function() {
    const wrapper = shallow(<SpotfireWebPlayer />);
    wrapper.instance().errorCallback(spotfire.webPlayer.errorCodes.ERROROPEN, '');
    expect(wrapper.state('requiresLogin')).to.equal(true);
  });

  after(function() {
    sandbox.restore();
    delete global.window;
    delete global.document;
  });
});
