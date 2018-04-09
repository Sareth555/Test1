import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableOpacity,
  Linking,
  Dimensions,
  Button,
} from 'react-native';
import Camera from 'react-native-camera';
import { fontLight, fontRegular, fontSemiBold, fontBold, khmerBold, khmerRegular } from '../Fonts/Fonts';
const intoscan = false;

export default class ScanQRCodeView extends Component {
  static navigationOptions = {
    title: 'Scan QR Code',
    headerMode: 'none',
    headerLeft: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      qrcode: '',
      scanQRDesTextColor: this.props.navigation.state.params.scanQRDesTextColor || '#999',
      scanQRTitleTextColor: this.props.navigation.state.params.scanQRTitleTextColor || 'white',
      isShowButton: this.props.navigation.state.params.isShowButton || true,
      goToScreenWhenSuccess: this.props.navigation.state.params.goToScreenWhenSuccess
    }
  }

  onBarCodeRead = (e) => this.setState({ qrcode: e.data });

  getOut(result) {
    if (intoscan == false) {
      alert(result)
      this.state.goToScreenWhenSuccess != '' ? this.props.navigation.navigate(this.state.goToScreenWhenSuccess) : this.props.navigation.goBack();
      intoscan = true;
    }

  }
  buttonBack() {
    return (
      <View style={styles.containButtonQR}>
        <TouchableOpacity
          style={styles.showMyQRStyle}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={{ color: '#444', fontWeight: '600', fontSize: 16, fontFamily: fontRegular }}>
            {this.props.navigation.state.params.buttonTitle}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    let scanArea = null;
    intoscan = false;
    return (
      <View style={styles.mainContain}>

        <View style={styles.centerView}>
          <Text style={[styles.scanQRCodeText, { color: this.state.scanQRTitleTextColor }]}>
            {this.props.navigation.state.params.scanQRTitle}
          </Text>
          <Text style={[styles.centerText, { color: this.state.scanQRDesTextColor }]}>
            {this.props.navigation.state.params.scanQRDes}
          </Text>
        </View>
        <Camera
          style={styles.cameraStyle}
          onBarCodeRead={(e) => this.getOut(e.data)}
          ref={cam => this.camera = cam}
        // aspect={Camera.constants.Aspect.fill}
        >
          {this.state.isShowButton ? this.buttonBack() : null}
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContain: {
    flex: 1,
    backgroundColor: '#eee'
  },
  scanQRCodeText: {
    marginTop: 40,
    marginLeft: 40,
    fontSize: 25,
    fontWeight: '800',
    fontFamily: fontRegular
  },
  centerView: {
    height: 140,
    marginLeft: -15,
    marginRight: -10,
    backgroundColor: '#111',
  },
  centerText: {
    flex: 1,
    fontSize: 20,
    height: 40,
    fontWeight: '500',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 5,
    fontFamily: fontRegular
  },
  subCenterText: {
    flex: 1,
    fontSize: 18,
    height: 50,
    color: '#FFF',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,

  },
  containButtonQR: {
    height: 100,
    left: 0,
    right: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  showMyQRStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    left: 20,
    right: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    height: 55,

  },
  cameraStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
});
