import React, { Component } from 'react';
import {
    Text,
    Image,
    TextStyle
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import HomeView from './home';
import Menu from './Menu';
import Messages from './Messages';
import QRCode from './QRCode';
import Rewards from './rewards';
import MerchantDetail from './MerchantDetail';
import I18n from '../i18n';
import { Icon } from '@clik.asia/clik-shared-app'
import IconMenuHome from '../images/svgs/IconMenuHome';

Text.defaultProps.allowFontScaling = false

const MainScreen = TabNavigator({
    HomeScreen: {
        screen: HomeView,
        navigationOptions: {
            tabBarLabel: I18n.t('home'),
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    width={24} height={24}
                    svg={IconMenuHome}
                    fill={tintColor} />
            )
        }
    },
    RewardsScreen: {
        screen: Rewards,
        navigationOptions: {
            tabBarLabel: I18n.t('rewards'),
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/rewards.png')}
                    style={{ width: 26, height: 26, tintColor: tintColor }}>
                </Image>
            )
        }
    },
    MessagesScreen: {
        screen: Messages
    },
    QRCodeScreen: {
        screen: QRCode
    },
    MenuScreen: {
        screen: Menu
    }
}, {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazy: false,
        tabBarOptions: {
            showIcon: true,
            activeTintColor: '#80C2BC',
            activeBackgroundColor: '#F7F7F7',
            inactiveTintColor: '#888',
            inactiveBackgroundColor: '#F7F7F7',
            labelStyle: {
                fontSize: 9,
                paddingBottom: 5,
                fontWeight: '600'
            },
            style: {
                backgroundColor: '#F7F7F7',
                borderTopColor: 'transparent'
            },
            indicatorStyle: {
                opacity: 0
            }

        }
    }
);
MainScreen.navigationOptions = {
    title: 'Clik payment',
    header: null
};

export default MainScreen;