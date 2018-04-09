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

export default class AccountRegistered extends Component {

    render() {
        return (
            <View style={styles.contianter}>
                <View style={styles.imageContainStyle}>
                    <Image
                        style={styles.imageStyle}
                        source={require('../images/ticked_icon.png')}
                    />
                    <Text style={styles.phoneTextTitle}>
                        {I18n.t("accountRegistered")}
                    </Text>
                    <Text style={styles.descriptionTextStyle}>
                        {I18n.t("congratulations")} Matthew!
                    </Text>
                </View>
                <View style={styles.descriptionContainerStyle}>
                    {/* <Text style={styles.descriptionTextStyle}>
                        {I18n.t("congratulations")} Matthew!
                    </Text> */}
                    <Text style={styles.descriptionTextStyle}>
                        {I18n.t("accReg1")}{"\n"}{I18n.t("accReg2")}{"\n"}{I18n.t("accReg3")}
                    </Text>
                    <Text style={styles.descriptionTextStyle}>
                        {I18n.t("accReg4")}{"\n"}{I18n.t("accReg5")}
                    </Text>

                </View>
                <View style={styles.btnLetGoContainer}>
                    <View style={styles.subButtonStyle}>
                        <Button
                            buttonStyle={{ width: 200, height: 50 }}
                            onPress={() => this.props.navigation.navigate('CreatePin')}
                            text={I18n.t("letGo")}
                        />
                    </View>
                </View>
            </View>
        );
    }
};
// Let's Go
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
        marginTop: 50,
        marginBottom: 10

    },
    imageStyle: {
        width: 100,
        height: 100,


    },
    phoneTextTitle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: '700',
        color: '#444',
        fontFamily: fontRegular

    },
    descriptionContainerStyle: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,

    },
    descriptionTextStyle: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        textAlign: 'center',
        color: '#666',
        fontFamily: fontRegular
    },
    btnLetGoContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subButtonStyle: {
        width: 150,
        height: 40,
    }
};
// export {AccountRegistered};