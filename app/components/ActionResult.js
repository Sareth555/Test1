import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { Button } from '@clik.asia/clik-shared-app';
import I18n from '../i18n';
import { fontLight, fontRegular, fontSemiBold, fontBold, khmerBold, khmerRegular } from '../Fonts/Fonts';

export default class ActionResult extends Component {

    render() {
        return (
            <View style={styles.contianter}>
                <View style={styles.imageContainStyle}>
                    <Image
                        style={styles.imageStyle}
                        source={this.props.navigation.state.params.image}
                    />
                    <Text style={styles.textTitleStyle}>
                        {this.props.navigation.state.params.title}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    {this.props.navigation.state.params.bodyContain}
                </View>
                <View style={styles.btnLetGoContainer}>
                    <Button
                        onPress={() => this.props.navigation.state.params.onButtonPress()}
                        styleText={{ paddingLeft: 50, paddingRight: 50 }}
                        bgColor={this.props.navigation.state.params.buttonBgColor}
                        textColor={this.props.navigation.state.params.buttonTextColor}
                        text={this.props.navigation.state.params.buttonTitle}
                        width={this.props.navigation.state.params.buttonWidth}
                        height={this.props.navigation.state.params.butonHeight}
                    />
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
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 80
    },
    imageStyle: {
        width: 100,
        height: 100,
    },
    textTitleStyle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: '700',
        fontFamily: fontBold,
        color: '#444'
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
        color: '#666'
    },
    btnLetGoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:50
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