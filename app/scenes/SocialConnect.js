import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Color } from '../styles';
import {
    FBLoginButton,
    AccessToken,
    LinkedinLoginButton,
    Icon,
    Button
} from '@clik.asia/clik-shared-app';

import {NavigationActions} from 'react-navigation';

import I18n from '../i18n';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';
import Contacts from 'react-native-contacts';

class SocialConnect extends Component {

    render() {
        return (
            <View
                style={styles.main} >
                <ScrollView style={styles.container}>
                    <Image
                        style={styles.icon}
                        source={{ uri: 'https://www.supinfo.com/articles/resources/228470/5249/0.png' }}
                    />
                    <Text
                        style={styles.title}
                    >{I18n.t("socialTitle").toUpperCase()}</Text>
                    <Text
                        style={styles.message} >
                        {I18n.t("connectSocialAcc")}
                    </Text>
                    <FBLoginButton onResult={(result) => {
                        if (result.isCancelled) {
                            alert('login is cancelled.')
                        } else {
                            AccessToken.getCurrentAccessToken().then((data) => {
                                const { accessToken } = data
                                console.log(data)
                                fetch('https://graph.facebook.com/v2.12/me?fields=email,name,friends,relationship_status&access_token=' + accessToken)
                                    .then((response) => response.json())
                                    .then((json) => {
                                        console.log(json)
                                        fetch('https://graph.facebook.com/v2.12/' + json.id + '/taggable_friends?access_token=' + accessToken)
                                            .then((response) => response.json())
                                            .then((json) => {
                                                console.log(json)
                                            })
                                            .catch(() => {
                                                reject('ERROR GETTING DATA FROM FACEBOOK')
                                            })
                                    })
                                    .catch(() => {
                                        reject('ERROR GETTING DATA FROM FACEBOOK')
                                    })
                            })
                        }
                    }} />
                    <LinkedinLoginButton
                        onPress={() => this.readContacts()} />

                </ScrollView>
                <Button
                    text={'Skip'}
                    buttonStyle={{ backgroundColor: '#BDBDBD', width: 150, height: 40, marginBottom: 30 }}
                    onPress={() => this.goHome()}
                />
            </View>
        );
    }

    goHome() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'SignIn' })
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    readContacts() {
        Contacts.getAll((err, contacts) => {
            if (err && err.type === 'permissionDenied') {
            } else {
                console.log(contacts)
            }
        })
    }

}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Color.backgroundColor
    },
    container: {
        flex: 1
    },
    icon: {
        width: 130,
        alignSelf: 'center',
        height: 130,
        marginTop: 60
    },
    title: {
        marginTop: 18,
        fontSize: 18,
        width: 200,
        fontWeight: '900',
        color: 'black',
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: fontRegular
    },
    message: {
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 20,
        color: 'gray'
    }
});

export default SocialConnect;