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
    AsyncStorage
} from 'react-native';
import { sectionListData } from './sourceData';
import AnimatedTabs from 'react-native-animated-tabs';
import BalanceCard from '../components/BalanceCard';
import Moment from 'moment';
import { TransactionsApi } from '../api'
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
        // this.setState({
        //     ///////////To set animation///////////
        //     // minHeight   : event.nativeEvent.layout.height-5,

        // });
    }

    renderExpand() {
        if (this.state.expanded) {
            return (
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#F8F8F8', borderBottomRightRadius: 10 }}>
                    <View style={styles.containDetailTextView}>
                        <Text style={styles.keyDetailText}>
                            Cash Back
                                </Text>
                        <Text style={styles.valueDetailText}>
                            $0.00
                                </Text>
                    </View>
                    <View style={styles.containDetailTextView}>
                        <Text style={styles.keyDetailText}>
                            Source
                                </Text>
                        <Text style={styles.valueDetailText}>
                            Clik Wallet
                                </Text>
                    </View>
                    <View style={styles.containDetailTextView}>
                        <Text style={styles.keyDetailText}>
                            Commission
                                </Text>
                        <Text style={styles.valueDetailText}>
                            $0.00
                                </Text>
                    </View>
                    <View style={styles.containDetailTextView}>
                        <Text style={styles.keyDetailText}>
                            Date/Time
                                </Text>

                        <Text style={styles.valueDetailText}>
                            {this.props.item.date}
                        </Text>
                    </View>
                    <View style={styles.containDetailTextView}>
                        <Text style={styles.keyDetailText}>
                            Note
                                </Text>
                        <Text style={styles.valueDetailText}>
                            {this.props.item.note}
                        </Text>
                    </View>
                    <View style={styles.containDetailTextView}>
                        <Text style={styles.keyDetailText}>
                            Transaction #
                                </Text>
                        <Text style={styles.valueDetailText}>
                            {this.props.item.transactionID}
                        </Text>
                    </View>
                </View>
            );
        }
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
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ backgroundColor: this.props.item.color, width: 15, borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }} />
                        <View style={{ flex: 1, backgroundColor: 'white', borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 12, fontFamily: fontRegular, color: '#555', fontWeight: '500', marginLeft: 16, marginTop: 8, marginRight: 5 }}>
                                        {this.props.item.name}
                                    </Text>
                                    <Text style={{ fontSize: 10, fontFamily: fontRegular, color: '#777', fontWeight: '400', marginLeft: 16, marginBottom: 8, marginTop: 5, marginRight: 5 }}>
                                        {this.props.item.note}
                                    </Text>
                                </View>
                                <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 12, fontFamily: fontRegular, color: this.props.item.textAmountColor, fontWeight: '500', marginRight: 10 }}>
                                    ${this.props.item.amount}
                                </Text>
                            </View>
                            {this.renderExpand()}
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
export default class Transactions extends Component {

    constructor() {
        super();
        this.state = {
            activePanel: 0,
            clikBalance: 0
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('Balance')
            .then(clikBalance => {
                if (clikBalance) {
                    this.setState({
                        clikBalance
                    })
                }
            }).catch((e) => {
                console.log(e);
            });
        new TransactionsApi().execute()
            .then(transaction => {
                console.log(transaction)
                if (transaction.status == 200) {
                    this.renderData(transaction.data.transactions);
                    this.setState({
                        clikBalance: transaction.data.balance
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    renderDot() {
        return (
            <View style={styles.circlePageView}>
                <View style={[styles.dotPage, { backgroundColor: this.state.activePanel == 0 ? '#537CAD' : 'white' }]} />
                <View style={[styles.dotPage, { backgroundColor: this.state.activePanel == 1 ? '#537CAD' : 'white' }]} />
                <View style={[styles.dotPage, { backgroundColor: this.state.activePanel == 2 ? '#537CAD' : 'white' }]} />
            </View>
        );
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
                <View style={{ height: 200 }}>
                    <AnimatedTabs
                        panelWidth={getPanelWidth()}
                        activePanel={this.state.activePanel}
                        onAnimateFinish={index => this.setState({ activePanel: index })}
                    >
                        <View style={[tabContentStyle]}>
                            <BalanceCard
                                image={require('../images/wallet_icon.png')}
                                title='COMBIND BALANCE'
                                clikBalanceText='CLIK BALANCE'
                                clikBalanceValue={"$" + this.state.clikBalance}
                                avalaibleBalanceText='AVALAIBLE BALANCE'
                                avalaibleBalanceValue={"$" + (this.state.clikBalance - 10)}
                            />
                        </View>
                        <View style={[tabContentStyle]}>
                            <BalanceCard
                                image={require('../images/dollar_sign.png')}
                                title='US DOLLAR BALANCE'
                                clikBalanceText='CLIK  BALANCE'
                                clikBalanceValue={"$" + (this.state.clikBalance - 50)}
                                avalaibleBalanceText='AVALAIBLE BALANCE'
                                avalaibleBalanceValue={"$" + (this.state.clikBalance - 60)}
                            />
                        </View>
                        <View style={[tabContentStyle]}>
                            <BalanceCard
                                image={require('../images/riel_sign.png')}
                                title='KH RIEL BALANCE'
                                clikBalanceText='CLIK BALANCE'
                                clikBalanceValue={`៛${50 * 4100}`}
                                avalaibleBalanceText='AVALAIBLE BALANCE'
                                avalaibleBalanceValue={`៛${40 * 4100}`}
                            />
                        </View>
                    </AnimatedTabs>
                </View>
                {this.renderDot()}
                <View style={{ flex: 1.5 }}>
                    <SectionList
                        renderSectionHeader={({ section }) => {
                            return (
                                <SectionHeader section={section.dateHeader} />
                            );
                        }}
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
                if (colorIndex == 1) {
                    colorArray.push('#537CAD');
                }
                else if (colorIndex == 2) {
                    colorArray.push('#F5D63D');
                }
                else if (colorIndex == 3) {
                    colorArray.push('#F06766');
                }
                else if (colorIndex == 4) {
                    colorArray.push('#A2D06F');
                }
                else if (colorIndex == 5) {
                    colorArray.push('#C584C7');
                }
                else if (colorIndex == 6) {
                    colorArray.push('#97D9E5');
                }
                else if (colorIndex == 7) {
                    colorArray.push('#FFB64D');
                }
                else if (colorIndex == 8) {
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
                            date: dateTime[i],
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
});
