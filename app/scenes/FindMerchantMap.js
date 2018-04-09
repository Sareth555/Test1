import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    HeaderView,
    Button
} from '@clik.asia/clik-shared-app';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import { MerchantMapPin } from '../components/MerchantMapPin';
import { PinKeyboard } from '../components';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';
let navigation;
export default class FindMerchantMap extends React.Component {
    static navigationOptions = {
        tabBarOnPress: (tab) => {
            tab.jumpToIndex(tab.scene.index)
            navigation.goBack()
        }
    }
    state = {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.505,
            longitudeDelta: 0.62,
        },
        error: null,
        coords: [],
        selectedMarker: null,
        markers:
            [
                {
                    latlng: {
                        latitude: 11.54873,
                        longitude: 104.9324155
                    },
                    title: "AEON MALL Phnom Penh",
                    description: "#132, Street Samdach Sothearos, Sangkat Tonle Bassac, Khan Chamkarmon, Phnom Penh"
                },
                {
                    latlng: {
                        latitude: 11.554946,
                        longitude: 104.932693
                    },
                    title: "Meta House",
                    description: "37 Samdach Sothearos Blvd (3), Phnom Penh"
                },
                {
                    latlng: {
                        latitude: 11.554126,
                        longitude: 104.928642
                    },
                    title: "Khéma Pasteur",
                    description: "Oknha Chrun You Hak St. (294), Phnom Penh"
                },
                {
                    latlng: {
                        latitude: 11.556413,
                        longitude: 104.928213
                    },
                    title: "Independence Monument",
                    description: "Landmark 20-m tower built in 1958 to celebrate Cambodia's independence from France"
                },
                {
                    latlng: {
                        latitude: 11.550771,
                        longitude: 104.921478
                    },
                    title: "Epic Club",
                    description: "No122B, Sangkat Tonel Bassac, Phnom Penh 12301"
                },
            ]

    }
    constructor(props) {
        super(props)
        navigation = this.props.navigation;
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // this.refs.map.animateToCoordinate(position.coords, 700);
                this.refs.map.animateToRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                    animated: true,
                  })
                this.setState({
                    current: {
                        latlng: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    }
                });
            },
            (error) => {
                this.setState({ error: error.message });
            },
            { enableHighAccuracy: true, timeout: 100000, maximumAge: 1000 },
        );
    }

    async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&mode=driving`)
            console.log("resp", resp);
            let respJson = await resp.json();
            // console.log("respJson", respJson);
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            // console.log("points", points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            this.setState({ coords: coords })
            return coords
        } catch (error) {
            alert("Something wrong!");
            // console.log(error);
            return error
        }
    }

    onRegionChange(region) {
        this.setState({
            region
        });
    }

    onMarkerPress = (latlng, marker) => {
        this.setState({ selectedMarker: marker });
        this.getDirections(
            `${this.state.current.latlng.latitude},${this.state.current.latlng.longitude}`,
            `${marker.latlng.latitude}, ${marker.latlng.longitude}`)
    }

    onMapPress = () => {
        this.setState({ selectedMarker: null });
    }

    renderCurrentMarker() {
        if (this.state.current) {
            return (
            // <Marker coordinate={this.state.current.latlng} pinColor='#000' />
            <MapView.Marker coordinate={this.state.current.latlng}>
			    <View>
                    <Image source={require('../images/UserMapIcon.png')} style={{width: 50, height: 50, backgroundColor:'transparent'}} />
                    
                </View>
                <View style={{backgroundColor:'transparent', position: 'absolute', justifyContent: 'center', alignItems: 'center',width :50, height: 50}}>
                {/* <Image source={{ uri: 'https://www.valleybusinessreport.com/wp-content/uploads/2017/07/default-avatar-tech-guy.png' }} style={{width: 26, height: 26, borderRadius: 13}} /> */}
                <Image source={require('../images/girl2.jpeg')} style={{width: 26, height: 26, borderRadius: 13}} />
                </View>
		    </MapView.Marker>
            
        );
        } return null;
    }

    renderMarkerInfo() {
        if (this.state.selectedMarker != null) {
            const { title, description, latlng } = this.state.selectedMarker;
            const { latlng: cLatLng } = this.state.current;
            return (
                <View style={styles.markerDetailContainer}>
                    <TouchableOpacity onPress={
                        () =>
                            this.getDirections(
                                `${cLatLng.latitude},${cLatLng.longitude}`,
                                `${latlng.latitude}, ${latlng.longitude}`)}>
                        <Image
                            style={{
                                width: 70,
                                height: 70,
                                backgroundColor: 'rgba(255, 165, 0, 0.99)',
                                alignSelf: 'center'
                            }}
                            source={require('../images/khema_logo.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.markerDescriptionContainer}>
                        <Text style={styles.markerTitle}>{title}</Text>
                        <Text style={styles.markerDescription}>{description}</Text>
                        {/* <Text>abc</Text> */}
                        <View style={{flexDirection: 'row', marginTop: 5}}>
                        <Image source={require('../images/top_up_wallet.png')} 
                            style={{width: 20, height: 20, backgroundColor: '#F5D63D', tintColor: 'white', borderRadius: 5, marginRight: 3}} />
                        <Image source={require('../images/withdraw_cash.png')} 
                            style={{width: 20, height: 20, backgroundColor: '#97D9E5', tintColor: 'white', borderRadius: 5, marginLeft: 3}} />
                        </View>
                    </View>
                </View>
            );
        }
        return null;
    }

    render() {
        return (
            <View style={styles.main_container}>

                <View style={{ flexDirection: 'row', position: 'absolute' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: '#F5D63D' }}>
                        <Text style={{ fontSize: 12, paddingLeft: 8, fontFamily: fontBold, flex: 1, alignSelf: 'flex-end', marginBottom: 7 }}>TOP UP BOOKED: 00:59 MINS REMAINING</Text>
                        <Button
                            textColor='black'
                            textStyle={{ fontSize: 10 }}
                            buttonStyle={{ backgroundColor: 'white', marginTop: 24, marginBottom: 4, marginRight: 4, width: 90, height: 24 }}
                            onPress={() => this.props.navigation.navigate('QRCodeScreen')}
                            text={'VIEW MY QR'}
                        />
                    </View>
                </View>

                <HeaderView
                    style={styles.headerView}
                    title="Find Location"
                    message="The following locations are available to top up your wallet. Click on a location for directions or scroll around for more options."
                />
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ flex: 1 }}
                    initialRegion={this.state.region}
                    showsUserLocation={false}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
					showsCompass={true}
                    // onRegionChange={this.onRegionChange.bind(this)}
                    ref={'map'}
                    onPress={() => this.onMapPress()}
                >
                    {this.state.markers.map((marker, i) => (

                        <Marker
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                            key={marker.title}
                            onPress={e => {
                                e.stopPropagation();
                                this.onMarkerPress(e.nativeEvent.coordinate, marker)
                            }
                            }
                        >
                            <MerchantMapPin />
                            <MapView.Callout tooltip={true} />
                            
                        </Marker>
                    ))}
                    {this.renderCurrentMarker()}
                    <MapView.Polyline
                        coordinates={this.state.coords}
                        lineCap='round'
                        lineJoin='bevel'
                        strokeWidth={3}
                        strokeColor="#6BC4BC"
                    />
                </MapView>
                {this.renderMarkerInfo()}
            </View>
        );
    }
}

const styles = {
    main_container: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },
    headerView: {
        padding: 36,
        paddingTop: 5,
        paddingBottom: 15
    },
    markerDetailContainer: {
        flex: 1,
        position: 'absolute',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        bottom: 20,
        left: 8,
        right: 8,
        padding: 14,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 1,
        shadowOpacity: 0.5
    },
    markerDescriptionContainer: {
        flex: 3,
        marginLeft: 12,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    markerTitle: {
        fontWeight: '900',
        fontSize: 14,
        fontFamily :fontRegular
    },
    markerDescription: {
        fontSize: 12,
        fontFamily: fontRegular
    },
    container: {
        marginTop: 55,
        marginBottom: 30,
        alignItems: 'center'
    },
    foot: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 30
    },
    inputContainerStyle: {
        backgroundColor: 'transparent'
    },
    imageStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    }
};