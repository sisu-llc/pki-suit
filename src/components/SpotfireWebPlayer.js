import React from 'react';
import spotfire from '../lib/spotfire-7.5';


type SpotfireWebPlayerProps = {
  host: string;
  file: string;
}

const DEFAULT_HOST = 'http://crspotfire191.pkiapps.net:443/spotfire/wp/';
const DEFAULT_FILE = '/User Demos/Gerard Conway/worldbank';

/**
 * Embeds a Spotfire WebPlayer using Spotfire JS library!
 */
class SpotfireWebPlayer extends React.Component<SpotfireWebPlayerProps> {
  static defaultProps: SpotfireWebPlayerProps = {
    host: DEFAULT_HOST,
    file: DEFAULT_FILE,
  };

  constructor(props) {
    super(props);
    this.state = {
      msg: 'Initializing Spotfire Web Player...',
      isLoaded: false,
      isInitializing: true,
    };
    const app = new spotfire.webPlayer.Application(this.props.host);

    app.onError(this.errorCallback.bind(this));
    app.onClosed(this.onClosedCallback.bind(this));
    app.onOpened(this.onOpenedCallback.bind(this));
    this.app = app;
  }

  componentDidMount() {
    console.log(`Opening app { host: "${this.props.host}", file: "${this.props.file}" }`);
    this.app.open(this.props.file, 'container');
  }

  componentWillUnmount() {
    console.log('unmount called!');

    if (this.app) {
      this.app.close();
    }
  }

  onOpenedCallback() {
    this.setState({ msg: 'Spotfire doc opened!', isLoaded: true, isInitializing: false });
  }

  onClosedCallback(path) {
    this.setState({ msg: `Document at path "${path}" closed.`, isLoaded: false });
  }

  errorCallback(error) {
    console.error(`Spotfire error: ${error}`);
    this.setState({ msg: error, isLoaded: false, isInitializing: false });
  }

  render() {
    let spotfireStyle = { height: 350, display: 'none' };

    if (this.state.isLoaded || this.state.isInitializing) {
      spotfireStyle = { height: 350, display: 'block' };
    }

    return (
      <div>
        <h3>Spotfire Web Player</h3>
        <div>{this.state.msg}</div>
        <div id="container" style={spotfireStyle} />
      </div>
    );
  }
}

export default SpotfireWebPlayer;
