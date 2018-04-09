import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image,
    BackHandler,
    Linking,
    Platform,
    AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import AppStateListener from "react-native-appstate-listener";
import { setLocal, fontLight, fontRegular, fontSemiBold, fontBold, khmerBold, khmerRegular, getLocal } from '../Fonts/Fonts';
import {
    Button,
    ScanScreen
} from '@clik.asia/clik-shared-app';
import { changeLocale } from '../redux/actions/LocaleAction';
import I18n from '../i18n';

function handleActive() {
    // alert("The application is now active!");
}

function handleBackground() {
    // alert("The application is now in the background!");
}

function handleInactive() {

    // alert("The application is now inactive!");
}

class SplashScreen extends Component {

    static navigationOptions = {
        title: 'Home',
    };

    componentWillMount() {
        getLocal()
        AsyncStorage.getItem('fontLocale').then((result) => {
            if(result=='en'){
                this.props.change('en');
                this.setState({
                    khBgColor: 'transparent',
                    enBgColor: '#7fc2bc',
                    khTextColor: '#000',
                    enTextColor: '#fff'
                })
            }
            else{
                this.props.change('kh');
                this.setState({
                    khBgColor: '#7fc2bc',
                    enBgColor: 'transparent',
                    khTextColor: '#fff',
                    enTextColor: '#000'
                })
            }
        })
        this.goHome();
    }

    componentDidMount() {
        
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                this.navigate(url);
            });
        } else {
            Linking.addEventListener('url', this.handleOpenURL);
        }
        <AppStateListener
            onActive={handleActive}
            onBackground={handleBackground}
            onInactive={handleInactive}
        />

    }

    goHome() {
        AsyncStorage.getItem('token').then((result) => {
            if (result) {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'MainScreen' })
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            } else {
                this.setState({ isChecking: false });
            }
        });
    }

    handleEvent(event) {
        this.navigate(event.url);
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = (event) => {
        this.navigate(event.url);
    }
    navigate = (url) => {
        const { navigate } = this.props.navigation;
        const route = url.replace(/.*?:\/\//g, '');
        // const id = route.match(/\/([^\/]+)\/?$/)[1];
        const routeName = route.split('/')[0];
        navigate(routeName)
        // if (routeName === 'people') {
        //   navigate('People', { id, name: 'chris' })
        // };
    }

    constructor() {
        super();
        this.state = {
            khBgColor: 'transparent',
            enBgColor: '#7fc2bc',
            khTextColor: '#000',
            enTextColor: '#fff',
            urlLink: '',
            isChecking: true
        }
        AsyncStorage.getItem('fontLocale').then((result) => {
            this.props.change(result);
            if(result=='en'){
                this.state={
                    khBgColor: 'transparent',
                    enBgColor: '#7fc2bc',
                    khTextColor: '#000',
                    enTextColor: '#fff',
                    urlLink: '',
                    isChecking: true
                }
            }
            else{
                AsyncStorage.setItem('fontLocale', 'kh');
                setLocal('kh')
                this.state={
                    khBgColor: '#7fc2bc',
                    enBgColor: 'transparent',
                    khTextColor: '#fff',
                    enTextColor: '#000',
                    urlLink: '',
                    isChecking: true
                }
            }
            
        })
    }

    onPressKh = () => {
        AsyncStorage.setItem('fontLocale', 'kh');
        this.props.change('kh');
        setLocal('kh')
        this.setState({
            khBgColor: '#7fc2bc',
            enBgColor: 'transparent',
            khTextColor: '#fff',
            enTextColor: '#000'
        })
    }

    onPressEn = () => {
        AsyncStorage.setItem('fontLocale', 'en');
        this.props.change('en');
        setLocal('en')
        
        this.setState({
            khBgColor: 'transparent',
            enBgColor: '#7fc2bc',
            khTextColor: '#000',
            enTextColor: '#fff'
        })
    }

    navigateToSignIn() {
        this.props.navigation.navigate('SignIn')
    }

    render() {
        const logoLocation = I18n.t('LocalCode') == 'kh' ?
            require("../images/clik-splash-screen-logo-kh.png") :
            require("../images/clik-splash-screen-logo-en.png");
        if (this.state.isChecking) {
            return (<View />);
        } else
            return (
                <View style={styles.container}>
                    <View style={styles.languageContainer}>
                        <TouchableOpacity
                            onPress={this.onPressEn}
                            style={[styles.btnEnSelectedStyle, { backgroundColor: this.state.enBgColor }]}>
                            <Text style={{ color: this.state.enTextColor, fontFamily: fontBold }}>
                                EN
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.onPressKh}
                            style={[styles.btnKhSelectedStyle, { backgroundColor: this.state.khBgColor }]}>
                            <Text style={{ color: this.state.khTextColor, fontFamily: khmerBold }}>
                                ខ្មែរ
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <Image
                        style={styles.imageStyle}
                        resizeMode='contain'
                        source={logoLocation}
                    />
                    <Button
                        buttonStyle={{ width: 200, height: 50, marginBottom: 30, marginTop: 30 }}
                        onPress={() => this.props.navigation.navigate('CreateAccount')}
                        styleText={{ fontFamily: fontBold }}
                        text={I18n.t("createAccount")}
                    />

                    <TouchableOpacity
                        onPress={() => this.navigateToSignIn()}>
                        <Text style={[styles.signInTextStyle,{fontFamily: fontBold}]}>
                            {I18n.t("signIn")}
                        </Text>
                    </TouchableOpacity>
                </View >
            );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    languageContainer: {
        flexDirection: 'row',
        marginTop: 40,
        height: 40,
        paddingRight: 16,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    btnKhSelectedStyle: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnEnSelectedStyle: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    imageStyle: {
        width: '100%',
        height: '50%',
        alignSelf: 'center',
        marginTop: 30

    },
    
    signInTextStyle: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '700',
        textDecorationLine: 'underline'
    }

});

function mapStateToProps(state) {
    return {
        localeReducer: state.localeReducer,
        nav: state.navReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        change: bindActionCreators(changeLocale, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);