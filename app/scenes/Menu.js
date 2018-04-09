import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    AsyncStorage
} from 'react-native';

import {
    Button
} from '@clik.asia/clik-shared-app';
import { NavigationActions } from 'react-navigation';
export default class Menu extends Component {
    static navigationOptions = {
        tabBarLabel: 'Menu',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../images/menu.png')}
                style={{ width: 26, height: 26, tintColor: tintColor }}>
            </Image>
        )
    }

    signOut() {
        AsyncStorage.removeItem('token') 
        .then(() => {
            this.props.navigation.navigate('SplashScreen');
        }).catch(e => {
            alert('You cannot log out right now!')
            console.log(e);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={() => this.signOut()}
                    buttonStyle={{ margin: 0, backgroundColor: '#F06766', borderRadius: 10, width: 150, height: 50 }}
                    text={"Sign out"}
                />
            </View>
        );
    }
};
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        fontWeight: '600'
    }
};