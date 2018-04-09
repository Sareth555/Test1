import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Alert,
    Image,
    ScrollView,
    Animated
} from 'react-native';
import {
    HeaderView,
    ImageRound,
    Button,
    CardView,
    Icon,
    PinInput,
    CurlyView
} from '@clik.asia/clik-shared-app';
import Check from '../images/svgs/check';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';

class ViewReceiptScreen extends Component {

    state = {
        slideDown: new Animated.Value(-430),
    }

    backHome = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'MainScreen' })
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    componentDidMount() {
        Animated.timing(
            this.state.slideDown,
            {
                toValue: 0,
                duration: 500,
            }
        ).start();
    }

    renderDataView() {
        const details = this.props.navigation.state.params.details;
        const items = details.map(obj => {
            return (<View key={obj.label} style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}>
                <Text style={{ flex: 1, textAlign: 'right', fontFamily: fontBold, fontSize: 12, marginRight: 8 }}>{obj.label}</Text>
                <Text style={{ flex: 1, fontFamily: fontRegular, fontSize: 12 }}>{obj.value}</Text>
            </View>);
        });
        return items;
    }

    render() {
        const {
            color = '#6BC4BC',
            tranTitle,
            message,
            partnerName,
            partnerProfileUri,
            displayAmout,
        } = this.props.navigation.state.params;
        let { slideDown } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    borderRadius: 5,
                    marginTop: 50,
                    height: 10,
                    right: 30,
                    left: 30,
                    alignSelf: 'center',
                    position: 'absolute',
                    backgroundColor: 'black'
                }} />
                <ScrollView showsVerticalScrollIndicator={false} style={{
                    marginTop: 55,
                    flex: 1,
                    marginRight: 35,
                    marginLeft: 35
                }}>
                    <Animated.View
                        style={{
                            marginTop: slideDown,
                            marginBottom: 100,
                        }}>
                        <CurlyView
                            style={{
                                flex: 1
                            }}>
                            <View style={{
                                height: 500,
                                top: -500,
                                right: 0,
                                left: 0,
                                alignSelf: 'center',
                                position: 'absolute',
                                backgroundColor: 'white'
                            }} />
                            <View style={{ margin: 8, height: 1, backgroundColor: 'black' }} />
                            <View style={{ flexDirection: 'row' }}>
                                <Icon svg={Check} fill={color} height={24} style={{ marginLeft: 8, marginRight: 8 }} />
                                <Text style={{ fontFamily: fontBold, marginRight: 16, alignSelf: 'center', flex: 1, textAlign: 'right' }}>{tranTitle}</Text>
                            </View>
                            <View style={{ margin: 8, height: 1, backgroundColor: 'black' }} />
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: fontBold, fontSize: 10, marginLeft: 16, color }}>{message}</Text>
                                    <Text style={{ fontFamily: fontRegular, marginLeft: 16, }}>{partnerName}</Text>
                                </View>
                                <ImageRound size={60} style={{ marginRight: 16, justifyContent: 'center' }}
                                    source={{ uri: partnerProfileUri }} />
                            </View>
                            <Text style={{ fontFamily: fontBold, textAlign: 'center', fontSize: 30, margin: 24 }}>{displayAmout}</Text>
                            {this.renderDataView()}

                        </CurlyView>
                    </Animated.View >
                </ScrollView>
                <Button
                    text={'Return Home'}
                    buttonStyle={{ position: 'absolute', margin: 20, height: 50, bottom: 8 }}
                    onPress={this.backHome} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: 50
    },
    foot: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 30
    },
    container: {
        marginTop: 55,
        marginBottom: 20
    },
});

export default ViewReceiptScreen;