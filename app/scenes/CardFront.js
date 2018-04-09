import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';
export default class CardFront extends Component {
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

    render(){
        return(
            <View style={styles.imageContainer}>
                    <Image
                        source={this.props.backgroundImage}
                        style = {styles.imageBackground}
                    >
                    </Image>
                    <View style={styles.logoContainer}>
                        <Image
                            source={this.props.logo}
                            style = {styles.imageStyle}
                            >
                        </Image>
                        <View style={styles.descriptionView}>
                            <Text style={styles.description}>
                                {this.props.description}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.topContainer}>
                        <View style={styles.topView1}>
                            <View style={styles.titleView}>
                                <Text style = {styles.title}>
                                    {this.props.title}
                                </Text>
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
            </View>
        );
    }

}
const styles = {
    imageContainer: {
        marginTop: 10,
        flex: 1,
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
        alignItems: 'center',
    },
    imageStyle: {
        height: 70,
        width: 70,
        position: 'absolute',
        borderRadius: 35,
        resizeMode: 'cover'
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
        marginTop: 5,
        marginLeft: 5,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    title: {
        color: 'white',
        fontSize: 13,
        fontWeight: '600',
        fontFamily: fontRegular,
        backgroundColor: 'transparent',
        
    },
    priceView: {
        marginTop: 5,
        marginRight: 5,
        borderRadius: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    priceText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: fontRegular,
        backgroundColor: 'transparent',
        
    },
    descriptionView: {
        marginTop: '40%',
        marginLeft: 5,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    description: {
        color: 'white',
        fontSize: 10,
        fontWeight: '600',
        fontFamily: fontRegular,
        backgroundColor: 'transparent',
    }
}