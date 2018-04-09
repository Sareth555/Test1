
import React, { Component } from 'react';
import { Color } from '../styles'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import {
  HeaderView,
  Button,
  InputText
} from '@clik.asia/clik-shared-app';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateText
} from '../redux/actions/createAccountAction';
import I18n from '../i18n';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class CreateAccount extends Component {

  updateText = (key, value) => {
    const data = {
      [key]: value
    };
    this.props.updateText(data);
  }

  render() {
    const {
      container,
    } = styles;
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.inputContainer}>
          <HeaderView
            style={{ marginBottom: 50 }}
            title={I18n.t("createAccount")}
            message={I18n.t("pleaseChooseAUsername")}
          />
          <InputText
            textHint={I18n.t("username")}
            autoCorrect={false}
            onChangeText={(text) => {
              this.updateText('username', text);
            }}
            value={this.props.createAccountReducer.username}
            textMessage={this.props.createAccountReducer.usernameMsg}
            autoCapitalize='none'
          />
          <InputText
            textHint={I18n.t("phoneNumber")}
            value={this.props.createAccountReducer.phoneNumber}
            textMessage={this.props.createAccountReducer.phoneNumberMsg}
            onChangeText={(text) => {
              this.updateText('phoneNumber', text);
            }}
            keyboardType='phone-pad'
          />
          <InputText
            textHint={I18n.t("password")}
            value={this.props.createAccountReducer.password}
            textMessage={this.props.createAccountReducer.passwordMsg}
            onChangeText={(text) => {
              this.updateText('password', text);
            }}
            secureTextEntry
          />
          <InputText
            textHint={I18n.t("confirmPassword")}
            value={this.props.createAccountReducer.passwordConfirm}
            textMessage={this.props.createAccountReducer.passwordConfirmMsg}
            onChangeText={(text) => {
              this.updateText('passwordConfirm', text);
            }}
            secureTextEntry
          />
          <View style={{ paddingTop: 40, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button
              text={I18n.t("continue")}
              disable={!this.props.createAccountReducer.isValid}
              onPress={() => this.props.navigation.navigate('SMSVerificationScreen')}
            /></ View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorBackground
  },
  inputContainer: {
    flex: 4,
    justifyContent: 'flex-start',
    margin: 30,
    marginBottom: 0,
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 30,
  }
});

function mapStateToProps(state) {
  return {
    localeReducer: state.localeReducer,
    createAccountReducer: state.createAccountReducer,
    ProfileReducer: state.ProfileReducer,
  }
}

function mapDisatchToProps(dispatch) {
  return {
    updateText: bindActionCreators(updateText, dispatch)
  }
}

export default connect(mapStateToProps, mapDisatchToProps)(CreateAccount);
