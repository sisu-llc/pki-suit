import React from 'react';
import spotfire from '../lib/spotfire-7.5';


type SpotfireWebPlayerProps = {
  host: string;
  file: string;
  loginUrl: string;
  guid: string;
  filters: Array;
}

const LOGIN_URL = 'http://crspotfire191.pkiapps.net:443/spotfire/login.html';
const DEFAULT_HOST = 'http://crspotfire191.pkiapps.net:443/spotfire/wp/';
const DEFAULT_FILE = '/User Demos/Gerard Conway/worldbank';

function  _guid() {
  function f() {
    return ((( 1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return f() + f() + f() + f();
}

function constructFilterString(filterObjects) {
  // TODO: check for empty array input
  const filters = filterObjects || [{}];

  const filterString = filters.reduce((acc, filter) => {
    if (filter.table && filter.column && filter.values) {
      const values = filter.values.map(value => `"${value}"`);
      const valuesString = `{${values.join(',')}}`;
      return `${acc}SetFilter(tableName="${filter.table}", columnName="${filter.column}", values=${valuesString});`;
    }

    return acc;
  }, '');
  return filterString;
}

/**
 * Embeds a Spotfire WebPlayer using Spotfire JS library!
 */
class SpotfireWebPlayer extends React.Component<SpotfireWebPlayerProps> {
  static displayName = 'SpotfireWebPlayer';

  static defaultProps: SpotfireWebPlayerProps = {
    host: DEFAULT_HOST,
    file: DEFAULT_FILE,
    loginUrl: LOGIN_URL,
    guid: '',
    filters: [{}],
  };

  constructor(props) {
    super(props);
    this.state = {
      msg: 'Initializing Spotfire Web Player...',
      isLoaded: false,
      isInitializing: true,
      requiresLogin: false,
      guid: props.guid || _guid(),
      // filters: props.filters || [{}],
    };
    // SetFilter(tableName=”WorldBankData”,columnName=”Country Name”,values={”Algeria”});
    const parameters = constructFilterString(props.filters);
    const customizationInfo = new spotfire.webPlayer.Customization();
    customizationInfo.showStatusBar = false;
    customizationInfo.showToolbar = false;
    customizationInfo.showPageNavigation = false;
    customizationInfo.showFilterPanel = false;

    const app = new spotfire.webPlayer.Application(props.host, customizationInfo, props.file, parameters);

    app.onError(this.errorCallback.bind(this));
    app.onClosed(this.onClosedCallback.bind(this));
    app.onOpened(this.onOpenedCallback.bind(this));
    this.app = app;
  }

  componentDidMount() {
    this.app.openDocument(this.state.guid);
  }

  componentWillUnmount() {
    if (this.app) {
      this.app.close();
    }
  }

  onOpenedCallback() {
    this.setState({ msg: '', isLoaded: true, isInitializing: false });
  }

  onClosedCallback(path) {
    this.setState({ msg: `Document at path "${path}" closed.`, isLoaded: false });
  }

  errorCallback(errorCode, errorMessage) {
    let msg = `${errorCode}: ${errorMessage}`;
    let requiresLogin = false;

    if (errorCode === spotfire.webPlayer.errorCodes.ERROROPEN) {
      // Could be a 401 issue meaning the user needs to log in
      // console.error('Could be a 401');
      msg = 'Please sign into Spotfire';
      requiresLogin = true;
    } else if (errorCode === spotfire.webPlayer.errorCodes.ERRORINTERNAL) {
      // Could be a bad filter setting
      msg = 'Internal Spotfire error: please check the filter parameters!';
      requiresLogin = false;
    }
    console.error(errorMessage);
    this.setState({ msg, isLoaded: false, isInitializing: false, requiresLogin });
  }

  render() {
    let spotfireStyle = { height: 350, display: 'none' };

    if (this.state.isLoaded || this.state.isInitializing) {
      spotfireStyle = { height: 350, display: 'block' };
    }

    const loginLink = this.state.requiresLogin ?
      (<a href={this.props.loginUrl} target="_blank">Sign into Spotfire</a>) : (<span />);
    return (
      <div>
        <div>{this.state.msg}</div>
        {loginLink}
        <div className="spotfireContainer" id={this.state.guid} style={spotfireStyle} />
      </div>
    );
  }
}

// TODO: move to class method?
SpotfireWebPlayer.constructFilterString = constructFilterString;
export default SpotfireWebPlayer;
