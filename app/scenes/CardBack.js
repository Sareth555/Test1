import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';
export default class CardBack extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            price: this.props.price,
            backgroundImage: this.props.backgroundImage,
            logo: this.props.logo,
            description: this.props.description,
            onPress: this.props.onPress
        }
    }
    giftCashBack(){
        alert(this.state.title);
    }

    render(){
        return(
            <View style={styles.imageContainer}>
                    <View style={styles.topContainer}>
                        <View style={styles.topView1}>
                            <View style={styles.logoContainer}>
                                <Image
                                    source={this.props.logo}
                                    style = {styles.imageStyle}
                                    >
                                </Image>
                                <View style={styles.titleView}>
                                    <Text style = {styles.title}>
                                        {this.props.title}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.topView2}>
                            <View style={styles.priceView}>
                                <Text style = {styles.priceText}>
                                    {this.props.price}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.detailView}>
                        <View style={styles.containDetailTextView}>
                            <Text style={styles.keyDetailText}>
                                MEMBERSHIP STATUS
                            </Text>

                            <Text style={styles.valueDetailText}>
                                Silver Membership {"\n"}Spend $200 in-store to level up and get $40 Cash Back!
                            </Text>
                        </View>
                        <View style={styles.containDetailTextView}>
                            <Text style={styles.keyDetailText}>
                                MEMBERSHIP EXPIRY
                            </Text>

                            <Text style={styles.valueDetailText}>
                                5 December 2018
                            </Text>
                        </View>
                        <View style={styles.containDetailTextView}>
                            <Text style={styles.keyDetailText}>
                                CASH BACK EXPIRY
                            </Text>

                            <Text style={styles.valueDetailText}>
                                5 July 2018
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity 
                            style={styles.buttonStyle}
                            onPress={()=>this.giftCashBack()}
                        >
                            <Text style={styles.buttonTextStyle}>
                                Gift Cash Back
                            </Text>
                        </TouchableOpacity>
                    </View>
            </View>
        );
    }

}
const styles = {
    imageContainer: {
        flex: 1,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#ddd',
        shadowOpacity: 1,
        elevation: 0,
        shadowOffset: {
          height: -3,
          width: 3
        }
    },
    logoContainer: {
        width: '100%',
        height: '100%',
        marginTop: '-5%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    imageBackground: {
        height: '100%',
        width :'auto',
        borderRadius: 10,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        marginLeft: 5,
        height: 40,
        width: 40,
        borderRadius: 20,
        resizeMode: 'cover'
    },
    logoContainer: {
        // flex: 1,
        height: 30,
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    topContainer: {
        width: '100%',
        height: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
    },
    topView1: {
        flex: 1,
        alignItems: 'flex-start',
    },
    topView2: {
        flex: 1,
        alignItems: 'flex-end',
    },
    titleView: {
        marginLeft: 5,
        marginTop: 10,
        borderRadius: 10,
    },
    title: {
        color: '#00B1B0',
        fontSize: 12,
        fontWeight: '600',
        fontFamily: fontRegular,
        backgroundColor: 'transparent',
        
    },
    priceView: {
        marginTop: 10,
        marginRight: 20,
    },
    priceText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fontRegular,
        backgroundColor: 'transparent',
    },
    detailView: {
        flex :1,
        width: '100%',
        marginTop: 35,
    },
    buttonView: {
        height: 40,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        width: 100,
        height: 25,
        marginBottom: 5,
        backgroundColor: '#537CAD',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTextStyle: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: 'white',
        fontSize: 10,
        fontWeight: '600',
        fontFamily: fontRegular

    },
    containDetailTextView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5
      },
      keyDetailText: {
        flex :3,
        textAlign: 'right',
        fontWeight: '400',
        fontSize: 8,
        marginRight: 10,
        color: '#537CAD',
        backgroundColor: 'white',
        fontFamily: fontRegular,
      },
      valueDetailText: {
        flex: 5,
        marginLeft: 5,
        textAlign: 'left',
        fontWeight: '400',
        color : '#333333',
        fontSize: 8,
        backgroundColor: 'white',
        fontFamily: fontRegular,
      },
}