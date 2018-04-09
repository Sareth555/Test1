import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  PermissionsAndroid,
  AsyncStorage
} from 'react-native';

import { HeaderView } from '@clik.asia/clik-shared-app'

import axios, { request, baseURL } from '../utils';
import futch from './API';
import Camera from 'react-native-camera';
import { StackNavigator } from 'react-navigation';
import I18n from '../i18n';
import ProgressBar from '../components/ProgressBar';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';
const width = Dimensions.get('window').width
let navigation;
export default class ScanBankCard extends Component {

  static navigationOptions = {
    tabBarOnPress: (tab) => {
      tab.jumpToIndex(tab.scene.index)
      navigation.goBack()
    }
  }

  clearImage(imagePath) {
    // const videoURL = this.props.navigation.state.params.videoData;
    const videoURL = imagePath;
    var RNFS = require('react-native-fs');
    return RNFS.unlink(videoURL)
      .then(() => {
      })
      .catch((err) => {
      });
  }

  constructor(props) {
    super(props);
    navigation = this.props.navigation;
    this.state = {
      path: null,
      imageCount: 1,
      imageStored: null,
      cameraType: 'back',
      mirrorMode: true,
      progress: 0,
      fullProgress: 1,
      indeterminate: true,
      hasTookPhotos: false,
      isUploadSuccess: 'Processing...',
      uploadSuccess: false
    };
    this.retakePicture = this.retakePicture.bind(this);
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        this.setState({ imageStored: data.path });
        AsyncStorage.getItem('token')
          .then((token) => {
            if (token) {
              this.uploadImageFunc(data.path, token);
            }
            else {
              this.setState({ isChecking: false });
            }
          }).catch((e) => {
            console.log(e);
          });
        this.setState({
          path: null,
          hasTookPhotos: true
        })
      })
      .catch(err => {
        console.error(err);
      });
  }
  uploadImageFunc(PicturePath, token) {
    var photo = {
      uri: PicturePath,
      type: 'image/jpg',
      name: 'file.jpg',
    };
    const body = new FormData();
    body.append('file', photo);
    futch(baseURL + '/consumer-api/scan-payment-card', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token,
      },
      body: body
    }, (progressEvent) => {
      const progressTotal = progressEvent.loaded / progressEvent.total;
      while (!this.state.uploadSuccess) {
        if (this.state.progress < this.state.fullProgress) {
          this.setState({ progress: this.state.progress + progressTotal });
          // console.log((this.state.progress*100).toFixed(0));
        }
        else {
          this.setState({ uploadSuccess: true })
        }
      }

    })
      .then((res) => {

        if (res.status == 200) {
          var cardData = JSON.parse(res._response);
          this.clearImage(this.state.imageStored);
          this.retakePicture();
          this.props.navigation.navigate('InputPaymentCardInfo', {
            Name: '',
            Issuer: '',
            Cardholder: '',
            CardNumber: cardData.cardNumber,
            Expires: '',
            Cvv: ''
          });
        }
        else {
          this.clearImage(this.state.imageStored);
          Alert.alert(
            'Add Bank Card',
            'Something went wrong, please try again.',
            [
              { text: 'Cancel', onPress: () => this.props.navigation.goBack(), style: 'cancel' },
              { text: 'OK', onPress: () => this.retakePicture() },
            ],
            { cancelable: false }
          )
        }
      })
      .catch((error) => {
        alert('error')
      })
  }
  retakePicture = () => {
    this.clearImage(this.state.imageStored);
    this.setState({
      imageStored: null,
      hasTookPhotos: false,
      progress: 0,
      uploadSuccess: false
    })
  }
  renderProgressBar() {
    return (
      <View style={styles.progressBar}>
        <ProgressBar
          fillStyle={{}}
          backgroundStyle={{ backgroundColor: '#EDEDED', borderRadius: 2 }}
          style={{ width: width - 50, height: 4 }}
          progress={this.state.progress}
        />
        <Text style={{ marginTop: 10, fontSize: 12, fontFamily: fontRegular }}>
          {this.state.isUploadSuccess}
        </Text>
      </View>
    );
  }
  renderScanButton() {
    return (
      <View style={styles.progressBar}>
        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)">
          <View />
        </TouchableHighlight>
      </View>
    );
  }
  componentWillMount() {
    if (Platform.OS === 'ios') {
      this.state.cameraPermission = true;
    } else {
      checkAndRequestCameraPermission(
        () => this.setState({ cameraPermission: true }),
        () => this.setState({ cameraPermission: false })
      );
    }
  }

  changeCameraType() {
    if (this.state.cameraType === 'back') {
      this.setState({
        cameraType: 'front',
        mirror: true
      })
    }
    else {
      this.setState({
        cameraType: 'back',
        mirror: false
      })
    }
  }

  renderCamera() {
    if (this.state.cameraPermission == true) {
      return (
        <View>
          <HeaderView
            style={{ backgroundColor: '#333333', padding: 36, paddingTop: 60 }}
            titleStyle={{ color: 'white' }}
            messageStyle={{ color: '#6BC4BC' }}
            title="SCAN BANK CARD"
            message="Please take a photo of the front of your bank card." />
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            defaultOnFocusComponent={true}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}
            captureTarget={Camera.constants.CaptureTarget.disk}
            type={this.state.cameraType}>
          </Camera>
          {this.state.hasTookPhotos ? this.renderProgressBar() : this.renderScanButton()}
        </View>
      );
    } else {
      return (
        <Text style={{
          color: 'white',
          fontSize: 28,
          alignSelf: 'center',
          fontFamily: fontRegular
        }}>Camera Permissions Denied!</Text>
      );
    }
  }

  renderImage() {
    return (
      <View>
        <View style={styles.scanBankCardView}>
          <Text style={styles.scanBankCardText}>
            SCAN BANK CARD
                </Text>
          <Text style={styles.scanBankCardDesc}>
            Please take a photo of the front of your bank card.
                </Text>
        </View>
        <Image
          source={{ uri: this.state.imageStored }}
          style={styles.preview}
        />
        {this.state.hasTookPhotos ? this.renderProgressBar() : this.renderScanButton()}
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.hasTookPhotos ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: 'red'
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    fontFamily: fontRegular,
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
  scanBankCardView: {
    backgroundColor: '#333333',
  },
  scanBankCardText: {
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40,
    color: 'white',
    fontSize: 25,
    fontWeight: '700',
    fontFamily: fontRegular
  },
  scanBankCardDesc: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    color: '#6BC4BC',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: fontRegular
  },
  progressBar: {
    height: 60,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'

  },
});

function checkAndRequestCameraPermission(onGranted, onDenied) {
  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
    .then(response => {
      if (response === 'granted' | response === true) onGranted();
      else {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
          .then(response => {
            if (response === 'granted' | response === true) {
              onGranted();
            }
            else onDenied();
          });
      }
    });
}
