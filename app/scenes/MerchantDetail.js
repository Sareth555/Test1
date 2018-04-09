import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Animated,
    StatusBar,
    ScrollView
} from 'react-native';

import {
    ImageRound,
    Button,
} from '@clik.asia/clik-shared-app';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';
import PropTypes from 'prop-types';

const greenActive = '#A2D06F';
const blueAccent = '#6BC4BC';
var CashBackButton = ({ onPressed }) => (
    <TouchableOpacity
        style={styles.buttonBackground}
        onPress={onPressed}
    >
        <Text style={{
            color: 'white',
            fontSize: 10,
            fontFamily: 'AvenirNext-Bold',
        }}>$12 Cashback</Text>
    </TouchableOpacity>
);

export default class MerchantDetail extends Component {

    onBackPress = () => {
        this.props.navigation.goBack();
    }

    onGiftCashBackPress = () => {
        alert("gift cashback pressed!");
    }

    onCashBackPress = () => {
        alert("cashback press");
    }

    render() {
        const { name, imageUri } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Image
                        style={{
                            height: 250,
                            width: '100%',
                            resizeMode: 'cover'
                        }}
                        source={require('../images/bg_merchant_cover.png')}
                    />
                    <View
                        style={styles.contentContainer}
                    >
                        <ImageRound
                            // style={styles.card}
                            size={72}
                            source={{ uri: imageUri }} />
                        <Text style={{
                            fontSize: 18,
                            padding: 4,
                            paddingTop: 8,
                            color: 'white',
                            fontWeight: 'bold',
                            fontFamily: fontRegular,
                        }}>{name}</Text>
                        <View
                            style={[styles.card, styles.infoContainer]}
                        >
                            <View style={styles.statusWrapper}>
                                <View style={styles.statusIcon}>
                                    <Text style={styles.status}>Active</Text>
                                </View>
                            </View>
                            <View style={styles.infoContentWrapper}>
                                <Text style={[styles.infoHeader, styles.padding]}>3% Cashback on all purchases</Text>
                                <Text style={[styles.info, styles.padding]}>You are a part of Loyalty Program Please come back for more points and get a reward.</Text>
                                <View style={[styles.infoButtonContainer, { paddingTop: 10 }]}>
                                    <CashBackButton onPressed={this.onCashBackPress} />
                                    <Text style={{
                                        flex: 1,
                                        fontSize: 10,
                                        color: greenActive,
                                        fontFamily: fontRegular,
                                    }}>EXP: 17 JUL 18</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={
                            [
                                styles.fontAvenir,
                                styles.textDescription,
                            ]
                        }>
                            The true taste of Italy, natural flavors and textures unique to Cambodia, Terrazza is the combination of this culinary holy trinity of dining excellence. It is your introduction to a food philosophy that meets the demands of the nutritional, cultural and recreational habits of mankind while satisfying the need to put the pleasure back in dining.
                        </Text>
                        <View style={{
                            alignSelf: 'flex-start',
                            marginLeft: 40,
                            marginRight: 24,
                        }}>
                            <Text style={{
                                color: blueAccent,
                                fontSize: 12,
                                fontWeight: 'bold',
                                marginBottom: 12,
                                fontFamily: fontRegular
                            }}>Contact Details</Text>
                            <View style={{ margin: 3, marginLeft: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        margin: 2
                                    }}
                                    source={require('../images/ic_phone.png')} />
                                <Text style={{
                                    color: '#333333',
                                    fontSize: 15,
                                    marginLeft: 6,
                                    fontFamily: fontRegular
                                }}>012 345 678</Text>
                            </View>
                            <View style={{ margin: 3, marginLeft: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        margin: 2
                                    }}
                                    source={require('../images/ic_clock.png')} />
                                <Text style={{
                                    color: greenActive,
                                    fontSize: 15,
                                    marginLeft: 6,
                                    textDecorationLine: 'underline',
                                    fontFamily: fontRegular
                                }}>Open Now</Text>
                            </View>
                            <View style={{ margin: 3, marginLeft: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        margin: 2
                                    }}
                                    source={require('../images/ic_facebook.png')} />
                                <Text style={{
                                    color: '#333333',
                                    fontSize: 15,
                                    marginLeft: 6,
                                    fontFamily: fontRegular
                                }}>trzpp</Text>
                            </View>
                            <View style={{ margin: 3, marginLeft: 8, marginRight: 24, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        margin: 2
                                    }}
                                    source={require('../images/ic_location.png')} />
                                <Text style={{
                                    color: '#333333',
                                    fontSize: 15,
                                    marginLeft: 6,
                                    fontFamily: fontRegular
                                }}>#1C Street 282, Samdach Louis Em, Phnom Penh 12000</Text>
                            </View>
                            <View style={{ margin: 3, marginLeft: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        margin: 2
                                    }}
                                    source={require('../images/ic_web.png')} />
                                <Text style={{
                                    color: '#333333',
                                    fontSize: 15,
                                    marginLeft: 6,
                                    fontFamily: fontRegular
                                }}>www.terrazza.asia</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{
                            backgroundColor: blueAccent,
                            padding: 10,
                            paddingLeft: 20,
                            paddingRight: 20,
                            borderRadius: 4,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 10,
                        }}
                            onPress={this.onGiftCashBackPress}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 12,
                                fontFamily: fontBold,
                            }}>Gift Cashback</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <TouchableOpacity style={{
                    position: 'absolute',
                    top: 40,
                    left: 16,
                }}
                    onPress={this.onBackPress}
                >
                    <Image style={{
                        width: 24,
                        height: 28,
                    }}
                        source={require('../images/ic_back.png')}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF'
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        position: 'relative',
        marginTop: -180,
        alignItems: 'center',
    },
    card: {
        elevation: 14,
        shadowColor: '#000000',
        shadowOffset: {
            width: 14,
            height: 14
        }
    },
    infoContainer: {
        padding: 14,
        margin: 20,
        marginTop: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
    },
    statusWrapper: {
        // flex: 1,
        padding: 8
    },
    statusIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: greenActive,
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fontAvenir: {
        fontFamily: fontRegular,
    },
    infoHeader: {
        color: '#000000',
        fontSize: 15,
        fontWeight: 'bold'
    },
    info: {
        color: '#666666',
        fontSize: 10
    },
    infoButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    status: {
        color: greenActive,
        fontSize: 11,
        fontWeight: 'bold',
    },
    infoContentWrapper: {
        flex: 4,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 6
    },
    padding: {
        paddingBottom: 5,
    },
    buttonBackground: {
        backgroundColor: greenActive,
        padding: 4,
        borderRadius: 5,
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    textDescription: {
        color: '#333333',
        lineHeight: 18,
        padding: 25,
        paddingTop: 0,
        paddingBottom: 18,
        fontSize: 12,
    }
});