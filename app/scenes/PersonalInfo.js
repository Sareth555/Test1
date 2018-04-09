
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updatePersonalInfo
} from '../redux/actions/ProfileAction';
import I18n from '../i18n';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';

import {
  Color,
  Styles
} from '../styles';

import {
  InputText,
  Button,
  ImageRound
} from '@clik.asia/clik-shared-app';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class PersonalInfo extends Component {

  state = {
    isDateTimePickerVisible: false,
    pickingDateType: ""
  };

  _showDateTimePicker(type) {
    console.log(type);
    this.setState({
      isDateTimePickerVisible: true,
      pickingDateType: type
    });
  }

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this._hideDateTimePicker();
    this.props.updatePersonalInfo({
      [this.state.pickingDateType]: Moment(date).format('MM/DD/YYYY')
    })
  };

  bodyContain(){
    const body =
    <View style={styles.descriptionContainerStyle}>
      
        <Text style={styles.descriptionTextStyle}>
            {I18n.t("congratulations")} Matthew!
        </Text>
        <Text style={styles.descriptionTextStyle}>
            {I18n.t("accReg1")}{"\n"}{I18n.t("accReg2")}{"\n"}{I18n.t("accReg3")}
        </Text>
        <Text style={styles.descriptionTextStyle}>
        {I18n.t("accReg4")}{"\n"}{I18n.t("accReg5")}
        </Text>

    </View>
    
    return body;
  }
  letGoFunction(){
    this.props.navigation.navigate('CreatePin')
  }

  render() {
    return (

      <ScrollView keyboardShouldPersistTaps='handled' style={{ padding: 30 }}>
        <Text style={styles.title}>{I18n.t("personalInfoTitle")}</Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 30,
          marginBottom: 24
        }}>
          <View style={[Styles.cardShadow, { borderRadius: 40 }]}>
            <ImageRound
              source={{ uri: this.props.profileInfo.profileUrl }} />
          </View>
        </View>
        <InputText
          textHint={I18n.t("givenName")}
          value={this.props.profileInfo.ginvenName}
          onChangeText={(text) => this.props.updatePersonalInfo({
            "ginvenName": text
          })}
        />
        <InputText
          textHint={I18n.t("familyName")}
          value={this.props.profileInfo.familyName}
          onChangeText={(text) => this.props.updatePersonalInfo({
            "familyName": text
          })}
        />
        <InputText
          textHint={I18n.t("userName")}
          value={this.props.profileInfo.userName}
          onChangeText={(text) => this.props.updatePersonalInfo({
            "userName": text
          })}
        />
        <InputText
          textHint={I18n.t("phoneNumber")}
          keyboardType={'phone-pad'}
          value={this.props.profileInfo.phoneNumber}
          onChangeText={(text) => this.props.updatePersonalInfo({
            "phoneNumber": text
          })}
        />
        <InputText
          textHint={I18n.t("password")}
          secureTextEntry
          value={this.props.profileInfo.password}
          onChangeText={(text) => this.props.updatePersonalInfo({
            "password": text
          })}
        />
        <View style={{ height: 24 }} />
        <InputText
          textHint={I18n.t("address")}
          value={this.props.profileInfo.address}
          onChangeText={(text) => this.props.updatePersonalInfo({
            "address": text
          })}
        />
        <InputText
          textHint={I18n.t("postalCode")}
          keyboardType={'numeric'}
          value={this.props.profileInfo.postalCode}
          onChangeText={(text) => this.props.updatePersonalInfo({
            "postalCode": text
          })}
        />
        <InputText
          textHint={I18n.t("country")}
          value={this.props.profileInfo.country}
          onChangeText={(text) => this.props.updatePersonalInfo({
            "country": text
          })}
        />
        <View style={{ height: 24 }} />
        <InputText
          textHint={I18n.t("passportNo")}
          keyboardType={'numeric'}
          value={this.props.profileInfo.passportNo}
          onChangeText={(text) => this.props.updatePersonalInfo({
            "passportNo": text
          })}
        />
        <InputText
          textHint={I18n.t("dob")}
          onPress={() => { this._showDateTimePicker("dateBirth") }}
          value={this.props.profileInfo.dateBirth}
          onChangeText={(text) => this.props.updatePersonalInfo({
            "dateBirth": text
          })}
        />
        <InputText
          textHint={I18n.t("nationality")}
          value={this.props.profileInfo.nationality}
          onChangeText={(text) => this.props.updatePersonalInfo({
            "nationality": text
          })}
        />
        <InputText
          textHint={I18n.t("placeOfBirth")}
          value={this.props.profileInfo.placeBirth}
          onChangeText={(text) => this.props.updatePersonalInfo({
            "placeBirth": text
          })}
        />
        <InputText
          textHint={I18n.t("dateIssued")}
          value={this.props.profileInfo.dateIssued}
          onChangeText={(text) => this.props.updatePersonalInfo({
            "dateIssued": text
          })}
        />
        <InputText
          textHint={I18n.t("expireDate")}
          value={this.props.profileInfo.dateExpiry}
          onChangeText={(text) => this.props.updatePersonalInfo({
            "dateExpiry": text
          })}
        />
        <View style={{ height: 24 }} />
        <Button text={I18n.t("activateAccount")}
          onPress={() => this.props.navigation.navigate('ActionResult',
          {
            title: 'ACCOUNT REGISTERTED',
            buttonBgColor: '#80C2BC',
            buttonTextColor: 'white',
            buttonTitle: I18n.t("letGo"),
            buttonWidth: 120,
            buttonHeight: 50,
            image: require('../images/ticked_icon.png'),
            bodyContain:this.bodyContain(),
            onButtonPress: ()=>this.letGoFunction(),
          }
          )} />

        <View style={{ marginTop: 24, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => { this.props.navigation.goBack() }}
          >
            <Text style={[styles.textUnderLine]}>
              {I18n.t("cancel")}
            </Text>
          </TouchableOpacity></View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          confirmTextIOS="Done"
        />
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundColor
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black'
  },
  textUnderLine: {
    fontSize: 14,
    color: '#727272',
    textDecorationLine: 'underline'
  },
  phoneTextTitle: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: '700',
    color: '#444'

},
descriptionContainerStyle: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10

},
descriptionTextStyle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    textAlign: 'center',
    color: '#666'
},
btnLetGoContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
},
subButtonStyle: {
    width: 150,
    height: 40,
},
descriptionTextStyle: {
  fontSize: 16,
  marginTop: 30,
  alignItems: 'center',
  justifyContent: 'center',
  width: 300,
  textAlign: 'center',
  color: '#666'
},
switchCurrencyContainer: {
  flex: 3,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 20
},
pinConfirmedTitle: {
  marginTop: 15,
  fontSize: 20,
  fontWeight: '700',
  color: '#444'
},
});

function mapStateToProps(state) {
  return {
    profileInfo: state.ProfileReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePersonalInfo: bindActionCreators(updatePersonalInfo, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
