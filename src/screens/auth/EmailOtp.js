import {
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImage from '../../components/HeaderImage';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import TextFormatted from '../../components/TextFormatted';
import Button from '../../components/Button';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Baseurl} from '../../utils/Baseurl';
import Toast from 'react-native-toast-message';
import {STAP} from '../../redux/actions/ActionType';

const EmailOtp = ({navigation}) => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const isPasscode = useSelector(state => state.isPasscode.isPasscode);
  const {params} = useRoute();
  const dimensions = useWindowDimensions();
  const [state, setState] = useState({
    pin1: '',
    pin2: '',
    pin3: '',
    pin4: '',
    pin5: '',
  });
  const textInputRef1 = useRef();
  const textInputRef2 = useRef();
  const textInputRef3 = useRef();
  const textInputRef4 = useRef();
  const textInputRef5 = useRef();
  const [Loading, setLoading] = useState(false);
  const [match, setMatch] = useState(false);
  const Otp = state.pin1 + state.pin2 + state.pin3 + state.pin4 + state.pin5;
  //console.log(Staps.user.id);
  async function Email_Otp() {
    try {
      const url = Baseurl + 'get_verified_code';
      const body = new FormData();
      body.append('otp_number', Otp);
      body.append('user_id', Staps.id);
      if (params?.isSignup) {
        body.append('check_otp', 'other');
      }
      setLoading(true);
      const res = await fetch(url, {
        method: 'Post',
        headers: {
          'content-type': 'multipart/form-data',
        },
        body: body,
      });
      const rslt = await res.json();
      if (rslt.status == 1) {
        setLoading(false);
        dispatch({type: STAP, payload: rslt.result});
        navigation.navigate(
          params?.isSignup ? 'step1' : isPasscode ? ' ' : 'ChangePassword',
        );
        console.log(rslt.message);
      } else {
        setLoading(false);
        // alert(rslt.result || rslt.message || 'Unknown error');
        console.log(rslt.status);
      }
    } catch (e) {
      alert('An error occured.');
      console.log(e);
    }
  }
  async function ResendOtp() {
    try {
      const url = Baseurl + 'resend_otp';
      const body = new FormData();
      // body.append('otp_number', Otp);
      body.append('user_id', Staps.id);

      const res = await fetch(url, {
        method: 'Post',
        headers: {
          'content-type': 'multipart/form-data',
        },
        body: body,
      });

      const rslt = await res.json();
      //console.log('resend opt =>', rslt);
      if (rslt.status == 1) {
        Toast.show({
          type: 'success',
          text1: 'OTP Successfull Send in Your Email',
          position: 'bottom',
        });
        setMatch(true);
        // navigation.navigate(params?.isSignup ? 'step1' : isPasscode ? 'RecoveryPassCode' : 'ChangePassword');
        console.log(rslt.status);
      } else {
        Toast.show({
          type: 'error',
          text1: 'OTP Send Faild',
          position: 'bottom',
        });
        // alert(rslt.result || rslt.message || 'Unknown error');
        console.log(rslt.status);
      }
    } catch (e) {
      alert('An error occured.');
      console.log(e);
    }
  }
  console.log(Staps.id);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <HeaderImage>
        <Header
          title={
            params?.isSignup
              ? 'Sign up'
              : isPasscode
              ? 'Passcode Recovery'
              : 'Password Recovery'
          }
          left={params?.isSignup ? true : false}
          marginTop={20}
        />
        <View style={{height: 20}} />
        <Logo />
      </HeaderImage>

      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
        <View style={{marginVertical: 20}}>
          <TextFormatted
            style={{
              fontSize: 22,
              fontWeight: '600',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              marginHorizontal: 20,
            }}>
            We have sent you an email!
          </TextFormatted>
          <TextFormatted
            style={{
              fontSize: 12,
              fontWeight: '300',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              marginHorizontal: 20,
              marginTop: 15,
            }}>
            Please check your inbox and enter the{' '}
            {isPasscode ? 'change passcode' : 'received code below'}
          </TextFormatted>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 30,
            }}>
            <TextInput
              style={[
                styles.textInput,
                {
                  width: Math.min((dimensions.width - (5 + 1) * 10) / 5, 60),
                  backgroundColor: ThemeMode.selectedTheme
                    ? theme.colors.primary
                    : theme.colors.primaryBlack,
                  color: ThemeMode.selectedTheme
                    ? theme.colors.primaryprimaryBlack
                    : theme.colors.primary,
                },
              ]}
              ref={textInputRef1}
              value={state.pin1}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={val => {
                setState({...state, pin1: val});
                if (val.length >= 1) textInputRef2.current.focus();
              }}
            />
            <TextInput
              style={[
                styles.textInput,
                {
                  width: Math.min((dimensions.width - (5 + 1) * 10) / 5, 60),
                  backgroundColor: ThemeMode.selectedTheme
                    ? theme.colors.primary
                    : theme.colors.primaryBlack,
                  color: ThemeMode.selectedTheme
                    ? theme.colors.primaryprimaryBlack
                    : theme.colors.primary,
                },
              ]}
              ref={textInputRef2}
              value={state.pin2}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={val => {
                setState({...state, pin2: val});
                if (val.length >= 1) textInputRef3.current.focus();
                else textInputRef1.current.focus();
              }}
            />
            <TextInput
              style={[
                styles.textInput,
                {
                  width: Math.min((dimensions.width - (5 + 1) * 10) / 5, 60),
                  backgroundColor: ThemeMode.selectedTheme
                    ? theme.colors.primary
                    : theme.colors.primaryBlack,
                  color: ThemeMode.selectedTheme
                    ? theme.colors.primaryprimaryBlack
                    : theme.colors.primary,
                },
              ]}
              ref={textInputRef3}
              value={state.pin3}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={val => {
                setState({...state, pin3: val});
                if (val.length >= 1) textInputRef4.current.focus();
                else textInputRef2.current.focus();
              }}
            />
            <TextInput
              style={[
                styles.textInput,
                {
                  width: Math.min((dimensions.width - (5 + 1) * 10) / 5, 60),
                  backgroundColor: ThemeMode.selectedTheme
                    ? theme.colors.primary
                    : theme.colors.primaryBlack,
                  color: ThemeMode.selectedTheme
                    ? theme.colors.primaryprimaryBlack
                    : theme.colors.primary,
                },
              ]}
              ref={textInputRef4}
              value={state.pin4}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={val => {
                setState({...state, pin4: val});
                if (val.length >= 1) textInputRef5.current.focus();
                else textInputRef3.current.focus();
              }}
            />
            <TextInput
              style={[
                styles.textInput,
                {
                  width: Math.min((dimensions.width - (5 + 1) * 10) / 5, 60),
                  backgroundColor: ThemeMode.selectedTheme
                    ? theme.colors.primary
                    : theme.colors.primaryBlack,
                  color: ThemeMode.selectedTheme
                    ? theme.colors.primaryprimaryBlack
                    : theme.colors.primary,
                },
              ]}
              ref={textInputRef5}
              value={state.pin5}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={val => {
                setState({...state, pin5: val});
                if (val.length >= 1) textInputRef5.current.focus();
                else textInputRef4.current.focus();
              }}
            />
          </View>
          <Button
            opacity={
              state.pin1 && state.pin2 && state.pin3 && state.pin4 && state.pin5
                ? 1
                : 0.5
            }
            onPress={() => Email_Otp()}
            Loading={Loading}
            buttonName={'Verify'}
            color={theme.colors.primary}
            containerStyle={{marginTop: 20}}
            disabled={
              state.pin1 && state.pin2 && state.pin3 && state.pin4 && state.pin5
                ? false
                : true
            }
          />
        </View>

        <TextFormatted
          onPress={() => ResendOtp()}
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            textAlign: 'center',
            marginVertical: 20,
          }}>
          Resend email
        </TextFormatted>
        <Toast />
      </ScrollView>
    </View>
  );
};

export default EmailOtp;

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Rubik-SemiBold',
    fontSize: 26,
    marginHorizontal: 5,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
