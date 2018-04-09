import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SectionList,
    ActivityIndicator,
    TouchableWithoutFeedback
} from 'react-native';
import { Rating } from 'react-native-elements';
import { SearchBar } from '../../components';
import { SegmentControl } from '@clik.asia/clik-shared-app';
import LinearGradient from 'react-native-linear-gradient';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../../Fonts/Fonts';

export default class Rewards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
            tabSelectedIndex: 0,
            data: this.getDatasHot(),
            title: 'REWARDS'
        }
    }

    getDatasHot() {
        const data = [
            {
                type: 'hot',
                imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                name: 'Amazon Coffee',
                rating: 4.5,
                Progam: '$3 cashback on 10th purchase',
                Progress: 'Inactive - Visit Amazon Coffee today!',
                ProgressPercent: '50%'
            },
            {
                type: 'hot',
                rating: 4,
                imageUri: 'http://s-yoolk-images.s3.amazonaws.com/kh/logo_images/original/1369991390/1402919?1369991390',
                name: 'ucare pharma',
                Progam: '$3 cashback on 10th purchase',
                Progress: 'Inactive - Visit Amazon Coffee today!',
                price: '$12',
                ProgressPercent: '60%'
            },
            {
                type: 'hot',
                rating: 1,
                imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                name: 'Amazon Coffee',
                Progam: '$3 cashback on 10th purchase',
                Progress: 'Inactive - Visit Amazon Coffee today!',
                ProgressPercent: '30%'
            },
            {
                type: 'hot',
                rating: 4,
                imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                name: 'Amazon Coffee',
                Progam: '$3 cashback on 10th purchase',
                Progress: 'Inactive - Visit Amazon Coffee today!'
            },
            {
                type: 'hot',
                rating: 4,
                imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                name: 'Amazon Coffee',
                Progam: '$3 cashback on 10th purchase',
                Progress: 'Inactive - Visit Amazon Coffee today!'
            },
        ]
        return data;
    }

    getDatasRewards() {
        const data = [
            {
                type: 'reward',
                imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                name: 'Amazon Coffee',
                rating: 4.5,
                price: '$12',
                Progam: '$3 cashback on 10th purchase',
                Progress: 'Inactive - Visit Amazon Coffee today!',
                ProgressPercent: '50%'
            },
        ]
        return data;
    }

    getDatasBrowse() {
        const data = [
            {
                type: 'browse',
                imageUri: 'http://restaurants.regionaldirectory.us/restaurant-table-720.jpg',
                name: 'Food and Beverage',
                data: [
                    {
                        type: 'reward',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                        name: 'Amazon Coffee',
                        rating: 4.5,
                        Progam: '$3 cashback on 10th purchase',
                        Progress: 'Inactive - Visit Amazon Coffee today!',
                        ProgressPercent: '50%'
                    },
                    {
                        type: 'reward',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                        name: 'Amazon Coffee',
                        rating: 4.5,
                        Progam: '$3 cashback on 10th purchase',
                        Progress: 'Inactive - Visit Amazon Coffee today!',
                        ProgressPercent: '50%'
                    },
                    {
                        type: 'reward',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                        name: 'Amazon Coffee',
                        rating: 4.5,
                        Progam: '$3 cashback on 10th purchase',
                        Progress: 'Inactive - Visit Amazon Coffee today!',
                        ProgressPercent: '50%'
                    }
                ]
            },
            {
                type: 'browse',
                imageUri: 'https://i.pinimg.com/originals/38/bd/ac/38bdac1109883d5341f5d6d2f561eb1d.jpg',
                name: 'Market',
                data: [
                    {
                        type: 'reward',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                        name: 'Amazon Coffee',
                        rating: 4.5,
                        Progam: '$3 cashback on 10th purchase',
                        Progress: 'Inactive - Visit Amazon Coffee today!',
                        ProgressPercent: '50%'
                    },
                    {
                        type: 'reward',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                        name: 'Amazon Coffee',
                        rating: 4.5,
                        Progam: '$3 cashback on 10th purchase',
                        Progress: 'Inactive - Visit Amazon Coffee today!',
                        ProgressPercent: '50%'
                    },
                    {
                        type: 'reward',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                        name: 'Amazon Coffee',
                        rating: 4.5,
                        Progam: '$3 cashback on 10th purchase',
                        Progress: 'Inactive - Visit Amazon Coffee today!',
                        ProgressPercent: '50%'
                    }
                ]
            },
            {
                type: 'browse',
                imageUri: 'http://globalb2bcontacts.com/assets/img/hospitality.jpg',
                name: 'Hospitality',
                data: [
                    {
                        type: 'reward',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                        name: 'Amazon Coffee',
                        rating: 4.5,
                        Progam: '$3 cashback on 10th purchase',
                        Progress: 'Inactive - Visit Amazon Coffee today!',
                        ProgressPercent: '50%'
                    },
                    {
                        type: 'reward',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                        name: 'Amazon Coffee',
                        rating: 4.5,
                        Progam: '$3 cashback on 10th purchase',
                        Progress: 'Inactive - Visit Amazon Coffee today!',
                        ProgressPercent: '50%'
                    },
                    {
                        type: 'reward',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                        name: 'Amazon Coffee',
                        rating: 4.5,
                        Progam: '$3 cashback on 10th purchase',
                        Progress: 'Inactive - Visit Amazon Coffee today!',
                        ProgressPercent: '50%'
                    }
                ]
            },
            {
                type: 'browse',
                imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZsxQxe43TbvGbgPvQUSVn145ktDcZcon_ctZf-kaiAofFpv338g',
                name: 'Shop',
                data: [
                    {
                        type: 'reward',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                        name: 'Amazon Coffee',
                        rating: 4.5,
                        Progam: '$3 cashback on 10th purchase',
                        Progress: 'Inactive - Visit Amazon Coffee today!',
                        ProgressPercent: '50%'
                    },
                    {
                        type: 'reward',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                        name: 'Amazon Coffee',
                        rating: 4.5,
                        Progam: '$3 cashback on 10th purchase',
                        Progress: 'Inactive - Visit Amazon Coffee today!',
                        ProgressPercent: '50%'
                    },
                    {
                        type: 'reward',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                        name: 'Amazon Coffee',
                        rating: 4.5,
                        Progam: '$3 cashback on 10th purchase',
                        Progress: 'Inactive - Visit Amazon Coffee today!',
                        ProgressPercent: '50%'
                    }
                ]
            },
            {
                type: 'browse',
                imageUri: 'https://www.bls.gov/spotlight/2017/expenditures-on-arts-movies-sporting-events-and-other-entertainments-and-recreational-activities/images/cover_image.jpg',
                name: 'Entertainment',
                data: [
                    {
                        type: 'reward',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                        name: 'Amazon Coffee',
                        rating: 4.5,
                        Progam: '$3 cashback on 10th purchase',
                        Progress: 'Inactive - Visit Amazon Coffee today!',
                        ProgressPercent: '50%'
                    },
                    {
                        type: 'reward',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                        name: 'Amazon Coffee',
                        rating: 4.5,
                        Progam: '$3 cashback on 10th purchase',
                        Progress: 'Inactive - Visit Amazon Coffee today!',
                        ProgressPercent: '50%'
                    },
                    {
                        type: 'reward',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Cafe_Amazon_Logo.jpg/220px-Cafe_Amazon_Logo.jpg',
                        name: 'Amazon Coffee',
                        rating: 4.5,
                        Progam: '$3 cashback on 10th purchase',
                        Progress: 'Inactive - Visit Amazon Coffee today!',
                        ProgressPercent: '50%'
                    }
                ]
            }
        ]
        return data;
    }

    onSegmentSelected = (child) => {
        this.setState({
            tabSelectedIndex: child.props.value,
            data: child.props.data,
            title: child.props.title
        })
    }

    renderHeader(section) {
        if (section.title)
            return (<View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginBottom: 8
                }}>
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: 15,
                    backgroundColor: '#e9e9ee'
                }} />
                <SegmentControl
                    width={115}
                    height={37}
                    itemStyle={{
                        paddingLeft: 0,
                        paddingRight: 0
                    }}
                    style={{
                        shadowOffset: {
                            width: 0,
                            height: 1
                        },
                        shadowColor: 'black',
                        borderRadius: 10,
                        shadowOpacity: 0.3,
                        shadowRadius: 2,
                        elevation: 4,
                    }}
                    onSelected={this.onSegmentSelected}>
                    <Text selected={this.state.tabSelectedIndex == 0} value={0} title='REWARDS' data={this.getDatasHot()}>Hot</Text>
                    <Text selected={this.state.tabSelectedIndex == 1} value={1} title='ACTIVE REWARDS' data={this.getDatasRewards()}>Active Rewards</Text>
                    <Text selected={this.state.tabSelectedIndex == 2} value={2} title='CATEGORIES' data={this.getDatasBrowse()}>Browse</Text>
                </SegmentControl>
            </View>)
    }

    renderHeaderCard(item) {
        return (<View
            style={{
                marginBottom: 8,
                marginLeft: 16,
                marginRight: 16,
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowColor: 'black',
                borderRadius: 10,
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: 4
            }} >
            <Image
                source={{ uri: item.data.imageUri }}
                resizeMode='cover'
                style={{
                    width: '100%',
                    height: 190,
                    borderRadius: 10,
                }} />
            <LinearGradient
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: 190,
                    borderRadius: 10,
                }}
                colors={['transparent', '#000']}
                start={{ x: 0.0, y: 0.6 }}
                end={{ x: 0.0, y: 1.2 }} />
            <Text style={{
                bottom: 20,
                width: '100%',
                textAlign: 'center',
                position: 'absolute',
                fontFamily: fontBold,
                backgroundColor: 'transparent',
                fontSize: 20,
                color: 'white',
                flex: 1
            }}>{item.data.detail}</Text>
        </View>)
    }

    onItemPress(item) {
        this.props.navigation.navigate('MerchantDetail', item);
    }

    renderHotItem(item) {
        return (
            <TouchableWithoutFeedback
                onPress={() => this.onItemPress(item)}
            >
                <View style={{
                    marginLeft: 16,
                    marginRight: 16,
                    marginBottom: 8,
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        flexDirection: 'row'
                    }} >
                        <Image
                            source={{ uri: item.imageUri }}
                            resizeMode='cover'
                            style={{
                                width: 85,
                                height: 85,
                                borderRadius: 10,
                                marginRight: 16
                            }} />
                        <View style={{ margin: 16, marginRight: 8, flex: 1 }}>
                            <Text style={{
                                color: '#666666',
                                fontFamily: fontBold,
                                backgroundColor: 'transparent',
                                fontSize: 14,
                                flex: 1
                            }}>{item.name}</Text>
                            <Rating
                                showRating={false}
                                type="star"
                                startingValue={item.rating || 0}
                                readonly={true}
                                imageSize={10}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={{
                                    color: '#666666',
                                    fontFamily: fontBold,
                                    backgroundColor: 'transparent',
                                    fontSize: 10
                                }}>Progam: </Text>
                                <Text style={{
                                    color: '#666666',
                                    fontFamily: fontSemiBold,
                                    backgroundColor: 'transparent',
                                    fontSize: 10,
                                    flex: 1
                                }}>{item.Progam}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={{
                                    color: '#666666',
                                    fontFamily: fontBold,
                                    backgroundColor: 'transparent',
                                    fontSize: 10
                                }}>Progress: </Text>
                                <Text style={{
                                    color: '#666666',
                                    fontFamily: fontSemiBold,
                                    backgroundColor: 'transparent',
                                    fontSize: 10,
                                    flex: 1
                                }}>{item.Progress}</Text>
                            </View>
                        </View>
                        <View >
                            <Text style={{
                                alignSelf: 'center',
                                marginTop: 16,
                                flex: 1,
                                fontFamily: fontBold,
                                color: '#666666'
                            }}>{item.price}</Text>
                            <Image
                                source={require('../../images/ic_more_vert.png')}
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: 10,
                                    margin: 8,
                                    tintColor: '#BDBDBD'
                                }} />
                        </View>
                    </View>
                    <View
                        style={{ width: '100%', height: 3, backgroundColor: '#E3E3E3' }}>
                        <View
                            style={{ width: item.ProgressPercent || '0%', height: 3, backgroundColor: '#6BC4BC' }} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    renderBrowseItem(item) {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState({
                        data: item.data,
                        title: item.name
                    })
                }}>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 16,
                    marginRight: 16,
                    marginBottom: 8,
                    alignContent: 'center'
                }}>
                    <Image
                        source={{ uri: item.imageUri }}
                        resizeMode='cover'
                        style={{
                            width: 85,
                            height: 85,
                            marginRight: 16
                        }} />
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{
                            color: '#666666',
                            fontFamily: fontBold,
                            backgroundColor: 'transparent',
                            fontSize: 14,
                        }}>{item.name}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderItem(item, index) {
        switch (item.type) {
            case 'card':
                return this.renderHeaderCard(item);
            case 'hot':
            case 'reward':
                return this.renderHotItem(item);
            case 'browse':
                return this.renderBrowseItem(item);
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.title}</Text>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 16,
                    marginRight: 16,
                }}>
                    <SearchBar style={{ flex: 1, marginBottom: 8 }} />
                    <Image
                        source={require('../../images/filter.png')}
                        resizeMode='contain'
                        style={{ width: 24, height: 24, margin: 8, tintColor: '#BDBDBD' }}>
                    </Image>
                </View>
                <SectionList
                    sections={[
                        {
                            data: [{
                                type: 'card',
                                data: {
                                    imageUri: 'https://machi-log.net/wp-content/uploads/2016/11/shutterstock_457987222.jpg',
                                    detail: '$3 Cash Back From Amazon'
                                }
                            }]
                        },
                        {
                            title: 'J',
                            data: this.state.data
                        },
                    ]}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    renderSectionHeader={({ section }) => this.renderHeader(section)}
                />
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#333333',
        fontSize: 25,
        fontFamily: fontBold,
        marginBottom: 8,
        marginLeft: 16,
        marginRight: 16,
    }
});