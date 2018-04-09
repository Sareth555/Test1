//npm i -S react-native-video
//https://github.com/react-native-community/react-native-video
import React, {Component} from 'react';
import {
    View,
    Text, 
    TouchableOpacity, 
    Dimensions,
    TouchableHighlight,
    StatusBar
} from 'react-native';
import Camera from 'react-native-camera';
import I18n from '../i18n';
let startVideo = false;
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';
export default class LiveVideo extends Component {

    clearVideo() {
        // const videoURL = this.props.navigation.state.params.videoData;
        const videoURL = this.state.path;
        var RNFS = require('react-native-fs');
        return RNFS.unlink(videoURL)
         .then(() => {
        //    alert('FILE DELETED');
         })
         // `unlink` will throw an error, if the item to unlink does not exist
         .catch((err) => {
           alert(err.message);
         });
      }

    constructor(props) {
        super(props);
        this.state = {
          path: null,
          videoData: null,
          mirrorMode : true,
          isRecord: true,
          buttonColor: '#fff',
          recordText: 'Start',
          recordTextColor: '#000'
        };
      }
    _startRecord() {
        if(this.state.isRecord){
            this.setState({isRecord: false, buttonColor: '#f00', recordText:'Stop', recordTextColor:'#fff'})
            startVideo = setTimeout(this._recordVideo.bind(this), 50)
        }
        else{
            this.setState({isRecord: true, buttonColor: '#fff', recordText: 'Start', recordTextColor: '#000'})
            this.refs.camera.stopCapture()
            this.props.navigation.navigate('PersonalInfo');
        }
      }
    
    _recordVideo() {
    this.refs.camera.capture({mode: Camera.constants.CaptureMode.video})
        .then((data) => {
            this.setState({ path: data.path })
            // this.props.navigation.navigate('VideoPreviewScreen', {videoData: data.path});
            this.clearVideo();
            this.props.navigation.navigate('PersonalInfo');
            
            })
        .catch((err) => console.log(err))
        // this.props.navigation.navigate('PersonalInfo');
    }
    
    render(){
        return(
            <View style={styles.container}>
                {/* <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                /> */}
                <View style={styles.topViewStyle}>
                    <Text style={styles.titleStyle}>
                    {I18n.t("takeALiveVideo")}
                    </Text>
                    <Text style={styles.descriptionStyle}>
                    {I18n.t("tlvDescription1")}{"\n"}{I18n.t("tlvDescription2")}
                    </Text>
                </View>
                <Camera
                    ref="camera"
                    style={styles.preview}
                    captureTarget={Camera.constants.CaptureTarget.temp}
                    captureMode = {Camera.constants.CaptureMode.video}
                    type= {Camera.constants.Type.front}
                    aspect={Camera.constants.Aspect.fill}>
                    <TouchableHighlight
                        style={[styles.startRecordStyle, {backgroundColor:this.state.buttonColor}]}
                        onPress={this._startRecord.bind(this)}
                        underlayColor="rgba(255, 255, 255, 0.5)"
                    >
                        <Text style={[styles.recordTextStyle, {color: this.state.recordTextColor}]}>{this.state.recordText}</Text>
                        {/* <View /> */}
                    </TouchableHighlight>
                </Camera>
           </View>
        );
    }
};
const styles = {
    container: {
        flex: 1,
    },
    topViewStyle: {
        height: 180,
        backgroundColor: '#222222',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
      },
    startRecordStyle: {
        padding: 10,
        margin: 20,
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    recordTextStyle: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '600'
    },
    titleStyle: {
        paddingTop: 40,
        paddingLeft: 30,
        fontSize: 27,
        fontWeight: '700',
        fontFamily: fontBold,
        color: '#fff'
    },
    descriptionStyle: {
        paddingTop: 5,
        paddingLeft: 30,
        fontSize: 20,
        fontWeight: '300',
        color: '#7FC2BC',
        fontFamily: fontRegular
    }
}