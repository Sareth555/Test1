import React, { Component } from 'react';
import I18n from '../../i18n';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    ListView,
    processColor,
    ReactNative,
    TouchableOpacity,
    Alert
} from 'react-native';

import {
    SegmentControl,
    Selection,
    OptionText,
    Autocomplete,
    InputText,
    HeaderView,
    Button
} from '@clik.asia/clik-shared-app';

import Camera from 'react-native-camera';

let navigation;
export default class PaymentCardScaner extends Component {

    static navigationOptions = {
        tabBarOnPress: (tab) => {
            tab.jumpToIndex(tab.scene.index)
            navigation.goBack()
        }
    }

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
    }

    _recordVideo() {
        this.refs.camera.capture({ mode: Camera.constants.CaptureMode.video })
            .then((data) => {
                console.log(data)
                this.setState({ path: data.path })
            })
            .catch((err) => console.log(err));
        this.sleep(1000).then(() => {
            this.refs.camera.stopCapture()
            this.props.navigation.navigate('InputPaymentCardInfo', {
                Name: 'Name',
                Issuer: 'Issuer',
                Cardholder: 'Cardholder',
                CardNumber: 'CardNumber',
                Expires: 'Expires',
                Cvv: 'Cvv'
            });
        })
    }

    componentDidMount() {
        this._recordVideo();
    }

    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    render() {
        return (
            <View style={styles.main_container}>
                <HeaderView
                    style={{ backgroundColor: '#333333', padding: 36, paddingTop: 60 }}
                    titleStyle={{ color: 'white' }}
                    messageStyle={{ color: '#6BC4BC' }}
                    title="SCAN BANK CARD"
                    message="Please take a photo of the front of your bank card." />
                <Camera
                    ref="camera"
                    style={{ flex: 1, backgroundColor: 'red' }}
                    captureTarget={Camera.constants.CaptureTarget.temp}
                    captureMode={Camera.constants.CaptureMode.video}
                    type={Camera.constants.Type.front}
                    aspect={Camera.constants.Aspect.fill}>
                </Camera>
            </View>

        );
    }
};
const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },

});