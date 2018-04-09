import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import {
    PinView,
    PinKeyboard,
    HeaderView,
    SegmentControl
} from '@clik.asia/clik-shared-app';
import {
    Color
} from '@clik.asia/clik-shared-app/styles';
import LinearGradient from 'react-native-linear-gradient';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';

import {
    updatePin,
    updatePinEnteredIndex,
    switch2ConfirmPin,
} from '../redux/actions/CreatePinAction';
import { PIN_MATCHED } from '../redux/ActionType';
import I18n from '../i18n';

class CreatePin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            segmentArray: ['៛ KHR', '$ USD'],
            selectedIndex: 0
        }
    }

    onKeyPress = (val) => {
        this.props.updatePin(val);
    }

    componentDidUpdate() {
        const { pinMatched, pinVal, pinState } = this.props.createPinReducer;

        if (pinVal.length === 6 & pinState === 0) {
            setTimeout(() => this.props.switch2ConfirmPin(), 500);
            return;
        }

        if (pinMatched === true) {
            // pinMatched = false
            this.props.dispatch({
                type: PIN_MATCHED,
                data: false
            });
            this.props.navigation.navigate('ActionResult',
                {
                    title: 'PIN CONFIRMED',
                    buttonBgColor: '#80C2BC',
                    buttonTextColor: 'white',
                    buttonTitle: I18n.t("letGo"),
                    buttonWidth: 120,
                    buttonHeight: 50,
                    image: require('../images/ticked_icon.png'),
                    bodyContain: this.bodyContain(),
                    onButtonPress: () => this.letGoFunction(),
                }
            );
        }
    }
    onSelectedSegment = (index) => {
        this.setState({
            selectedIndex: index
        })
        alert('You selected index ' + this.state.segmentArray[index])
    }
    bodyContain() {
        const body =
            <View style={styles.descriptionContainerStyle}>
                <View style={styles.descriptionContainerStyle}>
                    <Text style={styles.descriptionTextStyle}>
                        {I18n.t("pinCDes1")}{"\n"}{I18n.t("pinCDes2")}
                    </Text>
                    <Text style={styles.descriptionTextStyle}>
                        {I18n.t("pinCDes3")}{"\n"}{I18n.t("pinCDes4")}
                    </Text>
                </View>
                <View style={styles.switchCurrencyContainer}>
                    <SegmentControl
                        segmentArray={this.state.segmentArray}
                        onSelectedSegmentIndex={this.onSelectedSegment}
                        selectedBgColor='#fff'
                        deSelectedBgColor='#ddd'
                        textSelectedColor='#80C2BC'
                        textDeselectedColor='#999'
                        borderColor='#ddd'
                        borderRadius={10}
                        width={220}
                        height={40}
                        selectedIndex={this.state.selectedIndex}
                        fontSize={14}
                    />
                </View>
            </View>

        return body;
    }
    letGoFunction() {
        this.props.navigation.navigate('SocialConnect')
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderView
                    style={{
                        flex: 1,
                        margin: 30,
                        justifyContent: 'center',
                    }}
                    title={I18n.t("createPIN")}
                    message={I18n.t("createPINDes")}
                    messageStyle={{ color: Color.colorAccent }}
                />
                <View style={{ flex: 3 }}>
                    <PinView pinEnteredIndex={this.props.createPinReducer.pinEnteredIndex} />
                    <PinKeyboard
                        style={styles.keyboardContainer}
                        onPress={(val) => this.onKeyPress(val)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    keyboardContainer: {
        flex: 4,
        justifyContent: 'flex-end',
    },
    linearGradient: {
        flex: 1,
        margin: 10,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: 'black',
        backgroundColor: 'transparent',
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
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        textAlign: 'center',
        color: '#666',
        fontFamily: fontRegular
    },
    switchCurrencyContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    pinConfirmedTitle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: '700',
        color: '#444',
        fontFamily: fontRegular
    },
});

function mapStateToProps(state) {
    return {
        createPinReducer: state.createPinReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        updatePin: bindActionCreators(updatePin, dispatch),
        updatePinEnteredIndex: bindActionCreators(updatePinEnteredIndex, dispatch),
        switch2ConfirmPin: bindActionCreators(switch2ConfirmPin, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePin);