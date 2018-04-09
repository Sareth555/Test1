import React, { Component } from 'react';

import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Alert
} from 'react-native';
import {
    HeaderView,
    ImageRound,
    InputPin
} from '@clik.asia/clik-shared-app';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';

class ConfirmPin extends Component {

    render() {
        const {
            title,
            color = '#6BC4BC',
            displayAmout,
            partnerProfileUri,
            partnerName,
            message = 'Please input your pin to confirm',
            confirmTitle = 'CONFIRM PIN',
            length = 6
            } = this.props.navigation.state.params;
        return (
            <View style={styles.main_container}>
                <View style={{ marginLeft: 20, flexDirection: 'row', marginBottom: 30 }}>
                    <ImageRound style={{ alignSelf: 'center', margin: 16 }}
                        source={{ uri: partnerProfileUri }} />
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color, fontSize: 12, fontFamily: fontRegular }}>{title}</Text>
                        <Text style={{ color: '#555555', fontSize: 24, fontFamily: fontRegular }}>{partnerName}</Text>
                        <Text style={{ color: '#555555', fontSize: 30, fontFamily: fontBold }}>{displayAmout}</Text>
                    </View>
                </View>
                <HeaderView
                    style={{ marginLeft: 36 }}
                    title={confirmTitle}
                    message={message} />
                <InputPin length={length} color={color} style={{ backgroundColor: 'red' }}
                    onValueChanged={(value) => this.onValueChanged(value)}
                />
            </View>
        )
    }

    onValueChanged(value) {
        return this.props.navigation.state.params.onPinChange(value, this.props.navigation);
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: 50
    },
    foot: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 30
    },
    container: {
        marginTop: 55,
        marginBottom: 20
    },
});

export default ConfirmPin;