import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImageShadow from '../../components/HeaderImageShadow';
import Header from '../../components/Header';
import TextFormatted from '../../components/TextFormatted';
import Icon from 'react-native-vector-icons/Feather';
import {PASSCODE} from '../../redux/actions/ActionType';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const PassCode = () => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const navigation = useNavigation();
  const dimension = useWindowDimensions();
  const dispatch = useDispatch();
  const [ok, setOk] = useState(false);

  const [passcode, setPasscode] = useState([]);

  const Removeval = () => {
    const Val_array = [...passcode];
    Val_array.pop();
    setPasscode(Val_array);
  };
  console.log('Staps', Staps.app_dashboard_pass == passcode.join(''));

  function App_passcode() {
    if (Staps.app_dashboard_pass == passcode.join('')) {
      navigation.replace('HomeNavigation');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid Passcode',
        position: 'top',
      });
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <View style={{paddingBottom: 18}}>
        <HeaderImageShadow height={360}>
          <Header left title={'Sign in'} />
          <View
            style={{
              height: 130,
              width: 130,
              backgroundColor: '#fff',
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 28,
            }}>
            <Image
              source={require('../../assets/images/image.png')}
              style={{height: 135, width: 135, resizeMode: 'contain'}}
            />
          </View>
          <TextFormatted
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: '#FFFFFF',
              textAlign: 'center',
              marginTop: 15,
            }}>
            Good evening,
          </TextFormatted>
          <TextFormatted
            style={{
              fontSize: 32,
              fontWeight: '700',
              color: '#FFFFFF',
              textAlign: 'center',
            }}>
            Alexander
          </TextFormatted>
        </HeaderImageShadow>
        <Toast />
        <View
          style={{
            backgroundColor: ThemeMode.selectedTheme
              ? theme.colors.primary
              : theme.colors.primaryBlack,
            height: 60,
            position: 'absolute',
            bottom: 0,
            width: dimension.width - 40,
            alignSelf: 'center',
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {Array(4)
            .fill('')
            .map((_, i) => (
              <View
                style={{
                  height: 25,
                  width: 25,
                  backgroundColor: ThemeMode.selectedTheme
                    ? theme.colors.primary
                    : theme.colors.darkGrey,

                  borderRadius: 20,
                  margin: 12.5,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                }}>
                <TextFormatted
                  style={{
                    fontSize: 26,
                    fontWeight: '600',
                    color: ThemeMode.selectedTheme
                      ? theme.colors.Black
                      : theme.colors.primary,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    lineHeight: 26,
                  }}>
                  {passcode[i]}
                </TextFormatted>
              </View>
            ))}
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            width: 300,
            flexWrap: 'wrap',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          {Array(11)
            .fill('')
            .map((_, i) => (
              <TouchableOpacity
                disabled={passcode.length == 4 ? true : false}
                onPress={() => {
                  // if (i == 9) {
                  //   Removeval();
                  // } else {
                  // pass.push(i == 9 ? null : i == 10 ? 0 : i + 1);
                  // if (passcode.length == 4) {
                  //   // navigation.replace('HomeNavigation');
                  //   App_passcode();
                  // }
                  setPasscode(prevState => [...prevState, i == 10 ? 0 : i + 1]);
                  // }
                }}
                // disabled={i == 9}
                style={{width: 40, marginHorizontal: 30, marginVertical: 10}}>
                <TextFormatted
                  style={{
                    textAlign: 'center',
                    color: ThemeMode.selectedTheme
                      ? theme.colors.Black
                      : theme.colors.primary,
                    fontSize: 26,
                    fontWeight: '400',
                  }}>
                  {i == 9 ? (
                    <Icon
                      name="arrow-left"
                      size={30}
                      onPress={() => Removeval()}
                      color={
                        ThemeMode.selectedTheme
                          ? theme.colors.primaryBlack
                          : theme.colors.primary
                      }
                    />
                  ) : i == 10 ? (
                    0
                  ) : (
                    i + 1
                  )}
                </TextFormatted>
              </TouchableOpacity>
            ))}
          {passcode.length == 4 ? (
            <Icon
              name="arrow-right"
              size={30}
              onPress={() => App_passcode()}
              color={
                ThemeMode.selectedTheme
                  ? theme.colors.primaryBlack
                  : theme.colors.primary
              }
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                marginHorizontal: 35,
                flex: 1,
              }}
            />
          ) : (
            <TouchableOpacity
              style={{marginLeft: 24}}
              onPress={() => navigation.replace('FingerPrint')}>
              <Image
                source={require('../../assets/icons/fingerprint_1.png')}
                style={{resizeMode: 'contain', height: 50, width: 50}}
              />
            </TouchableOpacity>
          )}
        </View>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: ThemeMode.selectedTheme
              ? theme.colors.Black
              : theme.colors.primary,
            alignSelf: 'center',
            marginTop: 20,
            padding: 5,
          }}
          onPress={() => {
            navigation.replace('PasswordRecovery');
            dispatch({type: PASSCODE, payload: {isPasscode: true}});
          }}>
          Forgot your passcode?
        </TextFormatted>
      </ScrollView>
    </View>
  );
};

export default PassCode;

const styles = StyleSheet.create({});
