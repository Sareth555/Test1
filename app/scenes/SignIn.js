import React, { Component } from 'react';
import I18n from '../i18n';
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
    Alert,
    AsyncStorage
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

import { SignInApi } from '@clik.asia/clik-shared-app/apis'
import { MyProfileApi } from '../api';
import { NavigationActions } from 'react-navigation';
import CacheStore from 'react-native-cache-store';
import { ModelIndicator } from '../components/ModelIndicator';

export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            params: {
                Username: 'consumer1',
                Password: 'P@ssw0rd!23',
            },
            modalVisible: false
        }
    }

    onChangeText(key, text) {
        this.setState({
            params: {
                ...this.state.params,
                [key]: text
            }
        })
    }

    isValid() {
        if (this.state.params.Username != "" && this.state.params.Password != '')
            return true;
        else return false;

    }

    goBack() {
        this.props.navigation.goBack();
    }

    signIn() {
        this.setState({ modalVisible: true })
        new SignInApi()
            .execute(this.state.params)
            .then(response => {
                console.log(response)
                if (response.status == 200 && response.data != 'INVALID_LOGIN_ATTEMPT')
                    return response.data;
                else {
                    const msg = (response.status == 200) ? response.data : 'Sign in fail!';
                    Alert.alert(
                        'Somthing wrong',
                        msg,
                        [
                            { text: 'OK', onPress: () => this.setState({ modalVisible: false }) },
                        ],
                        { cancelable: false }
                    )
                }
            })
            .then(response => {
                if (response) {
                    this.storeToken(response);
                }
            })
            .catch(error => {
                Alert.alert(
                    'Somthing wrong',
                    'Sign in fail!',
                    [
                        { text: 'OK', onPress: () => this.setState({ modalVisible: false }) },
                    ],
                    { cancelable: false }
                )
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    storeToken(token) {
        AsyncStorage.setItem('token', token)
            .then(() => this.getUserProfile());

    }

    goHome() {
        this.setState({ modalVisible: false })
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'MainScreen' })
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    getUserProfile() {
        console.log('getUserProfile')
        new MyProfileApi()
            .execute()
            .then(profile => {
                console.log(profile)
                if (profile.status == 200) {
                    AsyncStorage.multiSet([
                        ['UserName', profile.data.normalizedUserName],
                        ['UserId', profile.data.id]
                    ], (error) => {
                        this.goHome();
                    });
                }
            }).catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <View style={styles.main_container}>
                <HeaderView
                    title="Sign in"
                    message="Fill in your information below." />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <InputText
                        onChangeText={(text) => this.onChangeText('Username', text)}
                        value={this.state.params.Username}
                        textHint={I18n.t('username')} />
                    <InputText
                        secureTextEntry
                        onChangeText={(text) => this.onChangeText('Password', text)}
                        value={this.state.params.Password}
                        textHint={I18n.t('password')} />
                    <View style={styles.foot}>
                        <Button
                            onPress={() => this.goBack()}
                            icon={{ name: 'arrow-back', type: 'MaterialIcons', size: 24, color: 'white' }}
                            buttonStyle={{ margin: 8, backgroundColor: '#D0D0D0', borderRadius: 10, width: 50, height: 50 }}
                        />
                        <Button
                            onPress={() => this.signIn()}
                            disable={!this.isValid()}
                            buttonStyle={{ margin: 0, backgroundColor: '#6BC4BC', borderRadius: 10, width: 150, height: 50 }}
                            text={I18n.t("signIn")}
                        />
                    </View>
                </View>
                <ModelIndicator
                    visible={this.state.modalVisible} />
            </View>);
    }
};
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: 90,
        paddingLeft: 36,
        paddingRight: 36
    },
    container: {
        marginTop: 40,
        marginBottom: 40,
        alignItems: 'center'
    },
    foot: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 30
    },
    inputContainerStyle: {
        backgroundColor: 'transparent'
    }
});