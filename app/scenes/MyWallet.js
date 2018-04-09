import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import SegmentTab from '../components/SegmentTab';
import CashBack from './CashBack';
import Transactions from './Transactions';
let navigation;
export default class MyWallet extends Component {

    static navigationOptions = {
        tabBarOnPress: (tab) => {
            tab.jumpToIndex(tab.scene.index)
            navigation.goBack()
        }
    }

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        this.state = ({
            segmentData: ['Transactions', 'Cash Back'],
            segmentScreen: [<Transactions />, <CashBack />],
            screenIndex: 0
        })
    }

    onSelectedSegmentIndex(screenIndex) {
        this.setState({ screenIndex })
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.segmentContainer}>
                    <SegmentTab
                        onSelectedSegmentIndex={this.onSelectedSegmentIndex.bind(this)}
                        segmentArray={this.state.segmentData}
                        textSelectedColor='#537CAD'
                        width={270}
                        height={37}
                        fontWeight='500'
                    />
                </View>
                <View style={styles.container}>
                    {this.state.segmentScreen[this.state.screenIndex]}
                </View>
            </View>
        );
    }
};
const styles = {
    mainView: {
        flex: 1,
        backgroundColor: '#eee'
    },
    segmentContainer: {
        height: 50,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 10,
        backgroundColor: 'transparent'
    },
    textStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        fontWeight: '600'
    }
};