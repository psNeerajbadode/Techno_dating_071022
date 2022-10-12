import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import HeaderImage from '../../components/HeaderImage';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import TextFormatted from '../../components/TextFormatted';
import {theme} from '../../utils/Constants';
import TextInputFormat from '../../components/TextInputFormat';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {STAP} from '../../redux/actions/ActionType';
import axios from 'axios';

const ChangePassword = ({navigation}) => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [newPassword, setNewPassword] = useState();
  const [reNewPassword, setReNewPassword] = useState();
  const [show, setShow] = useState(false);
  const [showr, setShowr] = useState(false);
  const [Loading, setLoading] = useState(false);
  console.log(newPassword);
  const validPass = pass => {
    return String(pass).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/);
  };

  const ChangePassApi = () => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append('user_id', Staps.id);
      body.append('password', newPassword);
      axios({
        url: 'https://technorizen.com/Dating/webservice/change_password',
        method: 'POST',
        data: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('Change Api', response.data);
          if (response.data.status == 1) {
            setLoading(false);
            dispatch({type: STAP, payload: response.data.result});
            navigation.navigate(navigation.replace('SuccessPassword'));
          } else {
            setLoading(false);
          }
        })
        .catch(function (error) {
          console.log('catch', error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <HeaderImage>
        <Header title={'Password Recovery'} />
        <View style={{height: 20}} />
        <Logo />
      </HeaderImage>

      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}
        keyboardShouldPersistTaps="handled">
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
            Create new password
          </TextFormatted>
        </View>
        <View>
          <TextInputFormat
            label={'New password'}
            labelColor={
              newPassword == '' ||
              (newPassword != null && !validPass(newPassword))
                ? theme.colors.red
                : theme.colors.primaryBlack
            }
            borderWidth={
              newPassword == '' ||
              (newPassword != null && !validPass(newPassword))
                ? 1
                : 0
            }
            placeholder={'Insert your new password'}
            value={newPassword}
            onChangeText={setNewPassword}
            containerStyle={{marginTop: 20}}
            right={
              <Icon
                name={show ? 'md-eye-off-outline' : 'md-eye-outline'}
                size={23}
                color={'#8490AE'}
                onPress={() => setShow(!show)}
                style={{marginLeft: 10}}
              />
            }
            secureTextEntry={show ? false : true}
          />
          {!(
            newPassword == '' ||
            (newPassword != null && !validPass(newPassword))
          ) || (
            <TextFormatted
              style={{
                fontSize: 12,
                fontWeight: '300',
                color: '#EA4A5A',
                marginHorizontal: 40,
                marginTop: 10,
              }}>
              Password should be minimum 8 digits length with 1 Uppercase and 1
              number
            </TextFormatted>
          )}
          <TextInputFormat
            label={'Repeat password'}
            labelColor={
              reNewPassword == '' || !(reNewPassword == newPassword)
                ? theme.colors.red
                : ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary
            }
            borderWidth={
              reNewPassword == '' || !(reNewPassword == newPassword) ? 1 : 0
            }
            placeholder={'Repeat your new password'}
            value={reNewPassword}
            onChangeText={setReNewPassword}
            containerStyle={{marginTop: 20}}
            right={
              <Icon
                name={showr ? 'md-eye-off-outline' : 'md-eye-outline'}
                size={23}
                color={'#8490AE'}
                onPress={() => setShowr(!showr)}
                style={{marginLeft: 10}}
              />
            }
            secureTextEntry={showr ? false : true}
          />
        </View>
        <Button
          opacity={
            newPassword == reNewPassword && validPass(newPassword) ? 1 : 0.5
          }
          onPress={() => ChangePassApi()}
          buttonName={'Save password'}
          Loading={Loading}
          disabled={
            newPassword == reNewPassword && validPass(newPassword)
              ? false
              : true
          }
        />
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: theme.colors.primaryBlack,
            marginTop: 15,
            textAlign: 'center',
            padding: 5,
          }}>
          Cancel
        </TextFormatted>
      </ScrollView>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
