import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { Button } from '@clik.asia/clik-shared-app';
import I18n from '../i18n';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';

export default class PhoneNumberVerify extends Component {

    render() {
        return (
            <View style={styles.contianter}>
                <View style={styles.imageContainStyle}>
                    <Image
                        style={styles.imageStyle}
                        source={require('../images/ticked_icon.png')}
                    />
                    <Text style={styles.phoneTextTitle}>
                        {I18n.t("phoneNumberVerified")}
                    </Text>
                </View>
                <View style={styles.descriptionContainerStyle}>
                    <Text style={styles.descriptionTextStyle}>
                        {I18n.t("excellentText1")}{"\n"}{I18n.t("excellentText2")}
                    </Text>
                    <Text style={styles.descriptionTextStyle}>
                        {I18n.t("verifyID1")}{"\n"}{I18n.t("verifyID2")}
                    </Text>
                    <Text style={styles.descriptionTextStyle}>
                        {I18n.t("readyText1")}{"\n"}{I18n.t("readyText2")}
                    </Text>

                </View>
                <View style={styles.btnLetGoContainer}>
                    <View style={styles.subButtonStyle}>
                        <Button
                            buttonStyle={{ width: 200, height: 50 }}
                            onPress={() => this.props.navigation.navigate('Capture')}
                            // onPress={() => this.props.navigation.navigate('LiveVideoScreen')}
                            //LiveVideoScreen
                            text={I18n.t("letGo")}
                        />
                    </View>
                </View>
            </View>
        );
    }
};

const styles = {
    contianter: {
        flex: 1,
        backgroundColor: '#f6f6f6'
    },
    imageContainStyle: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 40

    },
    imageStyle: {
        width: 100,
        height: 100,


    },
    phoneTextTitle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600',
        fontFamily: fontRegular
    },
    descriptionContainerStyle: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10

    },
    descriptionTextStyle: {
        fontSize: 16,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 230,
        textAlign: 'center',
        color: '#666',
        fontFamily: fontRegular
    },
    btnLetGoContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subButtonStyle: {
        width: 150,
        height: 40,
    }


};