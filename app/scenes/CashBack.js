import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    StyleSheet,
    SectionList,
    Easing
} from 'react-native';
import CardFront from './CardFront';
import CardBack from './CardBack';
import CardList from './CardList';
import { sectionListData } from './sourceData';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';
// import SwipeFlip from 'react-native-swipe-flip';
const indexCard = 0;
export default class CashBack extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            cardSelectedIndex: 0,
            index: 0,
            cardView: <CardFront
                title='Domino Pizza'
                price='$6'
                id='1'
                description='Domino Pizza Reward Card'
                logo={require('../images/dominosLogo.png')}
                backgroundImage={require('../images/dominosBg.jpeg')}
            />,
            dataSource: ds.cloneWithRows(['1', '2', '3', '4', '5']),
            arrayTitle: ['Domino Pizza', 'Amazon Cafe', 'Brown Cafe', 'Sokimix Station', 'ucare pharma'],
            arrayBackgroundImage: [require('../images/dominosBg.jpeg'), require('../images/amazonBg.jpeg'), require('../images/brownBg.jpeg'), require('../images/sokimexBg.jpeg'), require('../images/uCareBg.jpeg')],
            arrayLogo: [require('../images/dominosLogo.png'), require('../images/amazonLogo.jpg'), require('../images/brownLogo.jpg'), require('../images/sokimexLogo.jpeg'), require('../images/uCareLogo.png')],
            arrayPrice: ['$6', '$3', '$5', '$13', '$10'],
            arrayDescription: ['Domino Pizza Reward Card', 'Amazon Cafe Reward Card', 'Brown Cafe Reward Card', 'Sokimix Station Reward Card', 'ucare phamar'],
            arrayID: ['1', '2', '3', '4', '5']
        }
        this.changeView = this.changeView.bind(this);
    }
    changeView() {               
        if (this.state.cardSelectedIndex == 0) {
            this.setState({
                cardSelectedIndex: 1,
                cardView: <CardBack
                    title={this.state.arrayTitle[this.state.index]}
                    price={this.state.arrayPrice[this.state.index]}
                    description={this.state.arrayDescription[this.state.index]}
                    logo={this.state.arrayLogo[this.state.index]}
                    backgroundImage={this.state.arrayBackgroundImage[this.state.index]}
                />
            })
        }
        else {
            this.setState({
                cardSelectedIndex: 0,
                cardView: <CardFront
                    title={this.state.arrayTitle[this.state.index]}
                    price={this.state.arrayPrice[this.state.index]}
                    description={this.state.arrayDescription[this.state.index]}
                    logo={this.state.arrayLogo[this.state.index]}
                    backgroundImage={this.state.arrayBackgroundImage[this.state.index]}
                />
            })
        }
    }
    _renderFront() {
        return (
            <CardFront
                title={this.state.arrayTitle[this.state.index]}
                price={this.state.arrayPrice[this.state.index]}
                description={this.state.arrayDescription[this.state.index]}
                logo={this.state.arrayLogo[this.state.index]}
                backgroundImage={this.state.arrayBackgroundImage[this.state.index]}
            />
        );
    }
    _renderBack() {
        return (
            <CardBack
                title={this.state.arrayTitle[this.state.index]}
                price={this.state.arrayPrice[this.state.index]}
                description={this.state.arrayDescription[this.state.index]}
                logo={this.state.arrayLogo[this.state.index]}
                backgroundImage={this.state.arrayBackgroundImage[this.state.index]}
            />
        );
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity
                    style={styles.imageContainer}
                    selectedRowIndex
                    onPress={() => this.changeView()}
                >
                    {this.state.cardView}

                </TouchableOpacity>
                {/* <SwipeFlip style={{ flex: 1 }}
                    front={this._renderFront()}
                    back={this._renderBack()}
                    onFlipped={(val) => { }}
                    flipEasing={Easing.out(Easing.ease)}
                    flipDuration={500}
                    perspective={1000}
                /> */}

                <View style={styles.scrollContainer}>

                    <ListView
                        style={styles.container}
                        dataSource={this.state.dataSource}
                        renderRow={(rowID) => this._renderRow(this, rowID)}

                    />
                </View>
            </View>
        );
    }
    _renderRow(rowData, rowID) {
        return (
            <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => this._onPressRow(rowID)}
            >
                <CardList
                    title={this.state.arrayTitle[rowID - 1]}
                    price={this.state.arrayPrice[rowID - 1]}
                    description={this.state.arrayDescription[rowID - 1]}
                    logo={this.state.arrayLogo[rowID - 1]}
                    backgroundImage={this.state.arrayBackgroundImage[rowID - 1]}
                />
            </TouchableOpacity>
        );
    }

    _onPressRow(rowID, rowData) {
        this.setState({
            cardView: <CardFront
                title={this.state.arrayTitle[rowID - 1]}
                price={this.state.arrayPrice[rowID - 1]}
                description={this.state.arrayDescription[rowID - 1]}
                logo={this.state.arrayLogo[rowID - 1]}
                backgroundImage={this.state.arrayBackgroundImage[rowID - 1]}
            />,
            index: rowID - 1,
            cardSelectedIndex: 0
        });
    }
}
const styles = {
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    mainContainer: {
        flex: 1,
    },
    imageContainer: {
        marginBottom: -70,
        // flex: 1.3,
        height: 180,
        shadowColor: '#ccc',
        shadowOpacity: 3,
        elevation: 2,
        shadowOffset: {
            height: 6,
            width: 3
        }
    },
    imageStyle: {
        height: '100%',
        width: 'auto',
        borderRadius: 10,
        resizeMode: 'cover'

    },
    scrollContainer: {
        marginTop: 90,
        flex: 2,
        justifyContent: 'center',
        alignItems: 'stretch',
        shadowColor: '#aaa',
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 5,
        shadowOffset: {
            height: -3,
            width: -3
        }
    },
    titleView: {
        marginTop: 5,
        marginLeft: 5,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'flex-start',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    title: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        fontFamily: fontRegular,
        backgroundColor: 'transparent',

    }
}