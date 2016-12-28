'use strict';

var React = require('react');
var ReactNative = require('react-native');
var ConvPage = require('./ConvPage');

var styles = ReactNative.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1,
    backgroundColor: '#7986B2',
  }
});

class Hello extends React.Component {
  render() {
    return React.createElement(ReactNative.Text, {style: styles.text}, "Hello Once Again World!");
  }
}

class Millions extends React.Component {
  render() {
    return (
      <ReactNative.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Millions',
          component: ConvPage,
        }}/>
    );
  }
}

ReactNative.AppRegistry.registerComponent('Millions', () => Millions);
