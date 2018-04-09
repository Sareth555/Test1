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
} from 'react-native';
import Camera from 'react-native-camera';
import { StackNavigator } from 'react-navigation';
import I18n from '../i18n';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';

// const imageCount = 1;
export default class CaptureScreen extends Component {
  // static navigationOptions = {
  //   title: 'Capture Screen',
  //   headerStyle: {
  //     // backgroundColor: 'transparent'
  //   },
  // };
  clearImage(imagePath) {
    // const videoURL = this.props.navigation.state.params.videoData;
    const videoURL = imagePath;
    var RNFS = require('react-native-fs');
    return RNFS.unlink(videoURL)
     .then(() => {
      //  alert('FILE DELETED');
     })
     // `unlink` will throw an error, if the item to unlink does not exist
     .catch((err) => {
      //  alert(err.message);
     });
  }
  constructor(props) {
    super(props);

    this.state = {
      path: null,
      imageCount: 1,
      imageStored: null,
      cameraType: 'back',
      mirrorMode: true
    };
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        // this.setState({ path: data.path }) 
        this.clearImage(data.path);       
        // this.props.navigation.navigate('LiveVideoScreen', {imagePath: data.path});
        this.setState({ path: null })
        this.props.navigation.navigate('LiveVideoScreen');
        // if(this.state.imageCount==1){
        //   this.setState({
        //     imageStored: data.path,
        //     imageCount: 2
        //   })

        //   this.setState({ path: data.path })
        // }
        // else{

        //   this.props.navigation.navigate('ShowImage', {imagePath1: data.path,imagePath2:this.state.imageStored});
        // }

      })
      .catch(err => {
        console.error(err);
      });
  }

  renderCamera() {
    if (this.state.cameraPermission == true) {
      return (
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          defaultOnFocusComponent={true}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}
          type={this.state.cameraType}>

          <TouchableHighlight
            style={styles.capture}
            onPress={this.takePicture.bind(this)}
            underlayColor="rgba(255, 255, 255, 0.5)">
            <View />
          </TouchableHighlight>

        </Camera>
      );
    } else {
      return (
        <Text style={{
          color: 'white',
          fontFamily: fontRegular,
          fontSize: 28,
          alignSelf: 'center'
        }}>Camera Permissions Denied!</Text>
      );
    }
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

  renderImage() {
    return (
      <View>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}

        >Continue
        </Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
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
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',

    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
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
