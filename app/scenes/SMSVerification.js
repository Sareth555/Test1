import React, { Component } from 'react';
import {
    Text,
    Keyboard,
    TouchableWithoutFeedback,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import {
    Button,
    HeaderView
} from '@clik.asia/clik-shared-app';
import I18n from '../i18n';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';

const textMessage = '';
export default class SMSVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoFocus: false,
            textOne: textMessage.charAt(0),
            textTwo: textMessage.charAt(1),
            textThree: textMessage.charAt(2),
            textFour: textMessage.charAt(3),
            textFive: textMessage.charAt(4),
            textSix: textMessage.charAt(5),
            allText: textMessage
        };
    }

    componentWillMount() {
        if (textMessage.length == 6) {
            this.setState({ autoFocus: false })
        }
        else {
            this.setState({ autoFocus: true })
        }
    }
    _onTextFieldOneAction(text) {

        if (text.length == 1) {
            this.setState({ textOne: text })
            this.refs.two.focus()
        }
        else {
            this.setState({ textOne: '' })
        }
    }
    _onTextFieldTwoAction(text) {

        if (text.length == 1) {
            this.setState({ textTwo: text })
            this.refs.three.focus()
        }
        else {
            this.setState({ textTwo: '' })
        }
    }
    _onTextFieldThreeAction(text) {

        if (text.length == 1) {
            this.setState({ textThree: text })
            this.refs.four.focus()
        }
        else {
            this.setState({ textThree: '' })
        }
    }
    _onTextFieldFourAction(text) {

        if (text.length == 1) {
            this.setState({ textFour: text })
            this.refs.five.focus()
        }
        else {
            this.setState({ textFour: '' })
        }
    }
    _onTextFieldFiveAction(text) {

        if (text.length == 1) {
            this.setState({ textFive: text })
            this.refs.six.focus()
        }
        else {
            this.setState({ textFive: '' })
        }
    }
    _onTextFieldSixAction(text) {
        if (text.length == 1) {
            this.setState({ textSix: text })
            Keyboard.dismiss()
        }
        else {
            this.setState({ textSix: '' })
        }
    }
    _onVerifyAction() {
        this.state.allText = this.state.textOne + this.state.textTwo + this.state.textThree + this.state.textFour + this.state.textFive + this.state.textSix
        if (this.state.allText.length == 6) {
            // alert(this.state.allText)
            Keyboard.dismiss()
            this.props.navigation.navigate('ActionResult', 
            {
                title: 'PHONE NUMBER VERIFIED',
                buttonBgColor: '#80C2BC',
                buttonTextColor: 'white',
                buttonTitle: I18n.t("letGo"),
                buttonWidth: 120,
                buttonHeight: 50,
                image: require('../images/ticked_icon.png'),
                bodyContain:this.bodyContain(),
                onButtonPress: ()=>this.letGoFunction(),
            }
        );
        }
        else {
            Alert.alert(
                'Fail to verify code',
                'Please insert all the code to the box!',
                [

                    //   {text: 'OK', onPress: () => console.log('OK Pressed')}
                    { text: 'OK' }
                ],
                { cancelable: true }
            )
        }

    }
    bodyContain(){
        const body =
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
        return body;
    }

    letGoFunction(){
        this.props.navigation.navigate('Capture')
    }
    render() {
        return (

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
                <View style={styles.container}>
                    <HeaderView
                        style={styles.header}
                        title={I18n.t("textVerification")}
                        messageStyle={{ color: '#80C2BC' }}
                        message={I18n.t("tvDescription1") + "\n" + I18n.t("tvDescription2") + " +855 10 123 456."} />

                    <View style={styles.codeView}>
                        <Text style={styles.enterCodeTextStyle}>
                            {I18n.t("enterCode")}
                        </Text>
                        <View style={styles.textFieldContainer}>
                            <TextInput
                                ref='one'
                                autoFocus={this.state.autoFocus}
                                autoCorrect={false}
                                onChangeText={(text) => this._onTextFieldOneAction(text)}
                                maxLength={1}
                                keyboardType='number-pad'
                                returnKeyType='next'
                                underlineColorAndroid='transparent'
                                value={this.state.textOne}
                                style={styles.textFieldStyle} />
                            <TextInput
                                autoCorrect={false}
                                ref='two'
                                onChangeText={(text) => this._onTextFieldTwoAction(text)}
                                maxLength={1}
                                keyboardType='number-pad'
                                underlineColorAndroid='transparent'
                                value={this.state.textTwo}
                                style={styles.textFieldStyle} />
                            <TextInput
                                ref='three'
                                autoCorrect={false}
                                onChangeText={(text) => this._onTextFieldThreeAction(text)}
                                maxLength={1}
                                keyboardType='number-pad'
                                underlineColorAndroid='transparent'
                                value={this.state.textThree}
                                style={styles.textFieldStyle} />
                            <TextInput
                                ref='four'
                                autoCorrect={false}
                                onChangeText={(text) => this._onTextFieldFourAction(text)}
                                maxLength={1}
                                keyboardType='number-pad'
                                underlineColorAndroid='transparent'
                                value={this.state.textFour}
                                style={styles.textFieldStyle} />
                            <TextInput
                                ref='five'
                                autoCorrect={false}
                                onChangeText={(text) => this._onTextFieldFiveAction(text)}
                                maxLength={1}
                                keyboardType='number-pad'
                                underlineColorAndroid='transparent'
                                value={this.state.textFive}
                                style={styles.textFieldStyle} />
                            <TextInput
                                ref='six'
                                onChangeText={(text) => this._onTextFieldSixAction(text)}
                                autoCorrect={false}
                                maxLength={1}
                                keyboardType='number-pad'
                                underlineColorAndroid='transparent'
                                value={this.state.textSix}
                                style={styles.textFieldStyle} />
                        </View>

                        <View style={styles.borderBottomTextFieldContainer}>
                            <View style={styles.borderBottomTextField}></View>
                            <View style={styles.borderBottomTextField}></View>
                            <View style={styles.borderBottomTextField}></View>
                            <View style={styles.borderBottomTextField}></View>
                            <View style={styles.borderBottomTextField}></View>
                            <View style={styles.borderBottomTextField}></View>
                        </View>
                        <View style={styles.resentContainer}>
                            <Text>{I18n.t("dontReceive")}</Text>
                            <TouchableOpacity>
                                <Text style={styles.resendTextStyle}> {I18n.t("sendAgain")}</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                    <View style={styles.verifyView}>
                        <Button
                            buttonStyle={{ width: 150, height: 50, alignSelf: 'flex-end' }}
                            onPress={() => this._onVerifyAction()}
                            text={I18n.t("verify")}
                        />
                    </View>

                </View>
            </TouchableWithoutFeedback>
        );
    }
};
const styles = {
    container: {
        flex: 1,


    },
    topViewStyle: {
        flex: 4,
        // borderWidth:1,
    },
    codeView: {
        flex: 2,
        // borderWidth:1,
    },
    verifyView: {
        flex: 6,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'flex-end',
        // borderWidth: 1,
        paddingRight: 30
    },
    textVerificaitonStyle: {
        paddingTop: 50,
        paddingLeft: 30,
        fontSize: 23,
        fontWeight: '800',
        color: '#444',
        fontFamily: fontRegular
    },
    introductionTextStyle: {
        paddingLeft: 30,
        color: '#80C2BC',
        fontSize: 18,
        fontFamily: fontRegular
    },
    enterCodeTextStyle: {
        paddingLeft: 30,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        fontSize: 15,
        fontWeight: '600',
        fontFamily: fontRegular
    },
    textFieldContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 10


    },
    borderBottomTextFieldContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: 55,

    },
    textFieldStyle: {
        height: 65,
        textAlign: 'center',
        fontFamily: fontRegular,
        flex: 1,
        fontSize: 30,
        margin: 5
    },

    borderBottomTextField: {
        flex: 1,
        height: 2,
        backgroundColor: '#80C2BC',
        margin: 5
    },
    resentContainer: {
        paddingLeft: 30,
        flexDirection: 'row',
        paddingTop: 20
    },
    resendTextStyle: {
        textDecorationLine: 'underline',
    },
    header: {
        marginTop: 65,
        marginLeft: 30,
        marginBottom: 30
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
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        textAlign: 'center',
        color: '#666'
    }
}