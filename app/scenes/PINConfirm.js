import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { Button, SegmentControl } from '@clik.asia/clik-shared-app';
import I18n from '../i18n';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';

export default class PINConfirm extends Component {

    render() {
        return (
            <View style={styles.contianter}>
                <View style={styles.imageContainStyle}>
                    <Image
                        style={styles.imageStyle}
                        source={require('../images/ticked_icon.png')}
                    />
                    <Text style={styles.phoneTextTitle}>
                        {I18n.t("pinConfirm")}
                    </Text>
                </View>
                <View style={styles.descriptionContainerStyle}>
                    <Text style={styles.descriptionTextStyle}>
                        {I18n.t("pinCDes1")}{"\n"}{I18n.t("pinCDes2")}
                    </Text>
                    <Text style={styles.descriptionTextStyle}>
                        {I18n.t("pinCDes3")}{"\n"}{I18n.t("pinCDes4")}
                    </Text>


                </View>
                <View style={styles.switchCurrencyContainer}>
                    <SegmentControl />
                </View>
                <View style={styles.btnLetGoContainer}>
                    <View style={styles.subButtonStyle}>

                        <Button
                            onPress={() => this.props.navigation.navigate('SocialConnect')}
                            styleText={{ paddingLeft: 50, paddingRight: 50 }}
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
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 50

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
        marginRight: 10

    },
    descriptionTextStyle: {
        fontSize: 16,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
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
        width: 200,
        height: 40,
    },
    switchCurrencyContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10
    }



};