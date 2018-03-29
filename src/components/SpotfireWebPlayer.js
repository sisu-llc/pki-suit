import React from 'react'

import spotfire from '../lib/spotfire-7.5'


const host = "http://crspotfire191.pkiapps.net:443/spotfire/wp/"
const file = "/User Demos/Gerard Conway/worldbank"


/**
 * Embeds a Spotfire WebPlayer using Spotfire JS library!
 */
class SpotfireWebPlayer extends React.Component<> {

  constructor(props) {
    super(props)
    this.state = { msg: "Loading..." }
    this.doc = {}
    this.app = {}
    this.on = false

    this.errorCallback = this.errorCallback.bind(this);
    this.onClosedCallback = this.onClosedCallback.bind(this);
  }

  onClosedCallback(errorCode, description) {
    console.log("Spotfire Application closed.")

    delete this.state.app

    this.setState({ msg: "App closed", doc: {}, app: {}, on: false });
    //console.log(description);
  }

  errorCallback(errorCode, description) {
    try {
      this.app.close();
    } catch (err) {
      console.log("failed to close app")
    }
    this.setState({ msg: description, doc: {}, app: {}, on: false });
  }

  componentDidMount() {
    console.log("SpotfireWebPlayer: didMount")

    let settings = new spotfire.webPlayer.Customization();
    settings.showStatusBar = true;
    settings.showToolBar = true;
    settings.showPageNavigation = true;

    var app = new spotfire.webPlayer.Application(host, settings, file);
    app.onError(this.errorCallback);
    app.onClosed(this.onClosedCallback);

    var doc = app.openDocument("container");
    doc.getActivePage((page) => {
      this.state.msg = page.pageTitle;
    });

    this.setState({doc: doc, app: app, on: true, msg: "Loaded."});
    console.log("SpotfireWebPlayer: done didMount");
  }

  componentWillUnmount() {
    console.log("SpotfireWebPlayer: willUnmount");

    //this.state.app.close();

  }

  render() {
    var spotfireStyle = {height: "300"};

    if (!this.state.on) {
      spotfireStyle = {display: "none"}
    }

    return (
      <div>
        <h3>Spotfire Player</h3>
        <div>{this.state.msg}</div>
        <div id="container" style={spotfireStyle} ref={el => this.el = el}/>
      </div>
    );
  }
}

export default SpotfireWebPlayer;
