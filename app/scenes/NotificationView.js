/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SectionList,
    Image,
    Dimensions,
    TouchableHighlight,
    Animated,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import { sectionListData } from './sourceData';
import AnimatedTabs from 'react-native-animated-tabs';
import BalanceCard from '../components/BalanceCard';
import Moment from 'moment';
import TransactionsApi from '../api/TransactionsApi';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';

const getDeviceHeight = () => Dimensions.get('window').height;
const getDeviceWidth = () => Dimensions.get('window').width;
const getPanelWidth = () => getDeviceWidth();
var transactionData = [];
var timeArray = [];
var amountArray = [];
var nameArray = [];
var noteArray = [];
var transactionArray = [];
var colorArray = [];
var transactionIDArrauy = [];
var dateTime = [];
var amountColorArray = [];

class SectionListItem extends Component {
    constructor() {
        super();
        this.state = {
            expanded: false,
            animation: new Animated.Value(),
            name: '',
            note: '',
            amount: 0,
            dataCreated: '',
            transactionID: ''
        }
    }

    componentWillUpdate = (newProps) => {
        if (this.props.value !== newProps.value) {
            newProps.value ? this.open() : this.close();
        }
    }
    componentWillReceiveProps = (newProps) => {
        if (this.props.value !== newProps.value) {
            newProps.value ? this.open() : this.close();
        }
    };
    close = () => {
        Animated.timing(this.state.height, {
            easing: Easing.inOut(Easing.ease),
            duration: 300,
            toValue: this.props.minHeight || 0
        }).start();
    };

    open = () => {
        Animated.timing(this.state.height, {
            easing: Easing.inOut(Easing.ease),
            duration: 270,
            toValue: this.state.maxHeight
        }).start();
    };

    toggle() {
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded: !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();

    }
    _setMaxHeight(event) {
        const layoutHeight = event.nativeEvent.layout.height;
        this.setState({
            maxHeight: Math.min((this.props.maxHeight || layoutHeight), layoutHeight) - 35,
        });
    }

    _setMinHeight(event) {
    }
    render() {
        return (
            <Animated.View
                style={[styles.container, { height: this.state.animation }]}>
                <TouchableHighlight
                    style={{ borderRadius: 10 }}
                    onPress={this.toggle.bind(this)}
                    onLayout={this._setMinHeight.bind(this)}
                    underlayColor="#f1f1f1"
                >
                    <View style={{ height: 60, flexDirection: 'row', marginTop: 10, alignItems: 'center', marginBottom: 10, justifyContent: 'center' }}>
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 25 }}
                            source={require('../images/dominosLogo.png')}
                        />
                        <View style={{ flex: 1, backgroundColor: 'transparent', borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ flex: 1, fontSize: 15, fontFamily: fontRegular, color: '#555', fontWeight: '600', marginLeft: 16, marginTop: 5 }}>
                                            {this.props.item.name}
                                        </Text>
                                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ fontSize: 11, fontFamily: fontRegular, color: '#333333', fontWeight: '500', marginTop: 9, textAlign: 'right', marginLeft: 5 }}>
                                            {/* Yesterday */}
                                            {this.props.item.date}
                                        </Text>
                                        <Image
                                            style={{ width: 20, height: 20, marginTop: 6, tintColor: '#ACACAC' }}
                                            source={require('../images/fowarArrow.png')}
                                        />
                                    </View>
                                    <Text numberOfLines={2} ellipsizeMode={'tail'} style={{ fontSize: 13, fontFamily: fontRegular, color: '#777', fontWeight: '400', marginLeft: 16, marginRight: 5 }}>
                                        {this.props.item.note}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </Animated.View>
        );
    }
}
class SectionHeader extends Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#eee', justifyContent: 'center' }}>
                <Text style={{ fontSize: 10, fontFamily: fontRegular, fontWeight: '600', marginTop: 5, marginBottom: 5, marginLeft: 10 }}>
                    {this.props.section}
                </Text>
            </View>
        );
    }
}
export default class NotificationView extends Component {

    constructor() {
        super();
        this.state = {
            activePanel: 0,
            clikBalance: 0,
            newMessageTextColor: '#6BC4BC',
            settingsTextColor: '#BDBDBD',
            newMessageTintColor: '#6BC4BC',
            settingsTintColor: '#BDBDBD',
            isNewMessageSelected: true
        }
    }

    componentWillMount() {
        this.getTransactionData();
    }

    getTransactionData() {
        new TransactionsApi().execute()
            .then(transaction => {
                if (transaction.status == 200) {
                    this.renderData(transaction.data.transactions);
                    this.setState({
                        clikBalance: transaction.data.balance
                    })
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    selectedFilter() {

    }
    render() {
        const animatedViewStyle = { flex: 1 };
        const imageStyle = { flex: 1, width: getPanelWidth() - 50, marginBottom: 30 };
        const tabContentStyle = {
            width: getPanelWidth() - 50,
            flex: 1
        };
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#CDCDCD', height: 1 }} />
                <View style={{ height: 45, alignItems: 'flex-end', marginRight: 20 }}>
                    <TouchableOpacity
                        onPress={() => this.selectedFilter()}
                        style={{ height: 30, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            style={[styles.imageStyle, { tintColor: this.state.settingsTintColor }]}
                            source={require('../images/filter.png')}
                        />
                        <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: fontRegular, marginLeft: 10, color: '#BDBDBD' }}>
                            Filter
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#CDCDCD', height: 1.5 }} />
                <View style={{ flex: 1.5 }}>
                    <View style={{ marginLeft: 15, marginRight: 15, flex: 1 }}>
                        <SectionList
                            sections={transactionArray}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) => {
                                return (
                                    <SectionListItem item={item} index={index} />
                                );
                            }}
                        >
                        </SectionList>
                    </View>
                </View>
            </View>
        );
    }
    renderData(data) {
        if (data) {
            Array.prototype.groupBy = function (prop) {
                return this.reduce(function (groups, item) {
                    const val = item[prop]
                    groups[val] = groups[val] || []
                    groups[val].push(item)
                    return groups
                }, {})
            }
            timeArray = [];
            amountArray = [];
            nameArray = [];
            noteArray = [];
            transactionArray = [];
            colorArray = [];
            transactionIDArrauy = [];
            dateTime = [];
            amountColorArray = [];
            for (const i = 0; i < data.length; i++) {
                var time = data[i].created;
                var amount = data[i].amount;
                var name = data[i].name;
                var note = data[i].note;
                var colorIndex = data[i].module;
                var transactionID = data[i].id;
                var amountColor = amount > 0 ? 'black' : 'red';
                timeArray.push(Moment.utc(time).utcOffset(+7).format('dddd DD MMMM'));
                dateTime.push(Moment.utc(time).utcOffset(+7).format('DD MMMM YYYY HH:mm:ss'));
                amountArray.push(amount);
                nameArray.push(name);
                noteArray.push(note);
                amountColorArray.push(amountColor);
                transactionIDArrauy.push(transactionID);
                if (colorIndex == 0) {
                    colorArray.push('#537CAD');
                }
                else if (colorIndex == 1) {
                    colorArray.push('#F5D63D');
                }
                else if (colorIndex == 2) {
                    colorArray.push('#F06766');
                }
                else if (colorIndex == 3) {
                    colorArray.push('#A2D06F');
                }
                else if (colorIndex == 4) {
                    colorArray.push('#C584C7');
                }
                else if (colorIndex == 5) {
                    colorArray.push('#97D9E5');
                }
                else if (colorIndex == 6) {
                    colorArray.push('#FFB64D');
                }
                else if (colorIndex == 7) {
                    colorArray.push('#F799BE');
                }
            }
            for (const i = 0; i < timeArray.length; i++) {
                transactionArray.push({
                    data: [
                        {
                            amount: amountArray[i],
                            name: nameArray[i],
                            note: noteArray[i],
                            color: colorArray[i],
                            transactionID: transactionIDArrauy[i],
                            date: timeArray[i],
                            textAmountColor: amountColorArray[i]
                        }],
                    dateHeader: timeArray[i]
                });
            }
            transactionArray = transactionArray.reverse();
            var output = [];
            transactionArray.forEach(function (data) {
                var existing = output.filter(function (v, i) {
                    return v.dateHeader == data.dateHeader;
                });
                if (existing.length) {
                    var existingIndex = output.indexOf(existing[0]);
                    output[existingIndex].data = output[existingIndex].data.concat(data.data);
                } else {
                    if (typeof data.data == 'string')
                        data.data = [dateHeader.dateHeader];
                    output.push(data);
                }
            });
            transactionArray = output;
            return output;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    circlePageView: {
        height: 20,
        width: getDeviceWidth() - 50,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    dotPage: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 2,
        marginRight: 2,
        shadowColor: '#ddd',
        shadowOpacity: 1,
        elevation: 0,
        shadowOffset: {
            height: 3,
            width: 3
        },
    },
    containDetailTextView: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    keyDetailText: {
        flex: 3,
        textAlign: 'right',
        fontWeight: '400',
        fontSize: 10,
        marginRight: 10,
        color: '#6BC4BC',
        backgroundColor: 'transparent',
        fontFamily: fontRegular,
    },
    valueDetailText: {
        flex: 5,
        marginLeft: 5,
        textAlign: 'left',
        fontWeight: '400',
        color: '#333333',
        fontSize: 10,
        backgroundColor: 'transparent',
        fontFamily: fontRegular,
    },
    imageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        width: 25,
        height: 25,
        margin: 2,

    },
});
