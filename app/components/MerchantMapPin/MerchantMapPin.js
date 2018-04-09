import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import { Icon } from '@clik.asia/clik-shared-app';
import MapPin from '../../images/svgs/MapPin';
import SvgIcon from 'react-native-svg-icon';

class MerchantMapPin extends Component {
    render() {
        return (
            <View style={{justifyContent: 'center'}}>
                {/* <Icon name="MapPin" svgs={MapPin}/>  */}
                <SvgIcon name="MapPin" svgs={MapPin}/>
                {/* <Image style={{width: 36, height: 36}} source={require('./ClikDropPin.png')}/> */}
            </View>
        )
    }
}

export { MerchantMapPin }