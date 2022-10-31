import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderImage from '../../components/HeaderImage';
import Header from '../../components/Header';
import TextFormatted from '../../components/TextFormatted';
import LinearGradient from 'react-native-linear-gradient';
import UserMedia from './homeComponent/userMedia';
import UserInformation from './homeComponent/userInformation';
import UserLikeBottomSheet from './homeComponent/userLikeBottomSheet';
import {useRef} from 'react';
import MoreOptions from './moreOptions';
import {useDispatch, useSelector} from 'react-redux';
import {theme} from '../../utils/Constants';
import {useRoute} from '@react-navigation/native';
import ActivityLoader from '../../components/ActivityLoader';
import axios from 'axios';
import Netinforsheet from '../../components/Netinforsheet';

import {STAP} from '../../redux/actions/ActionType';
const UserProfile = ({navigation}) => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const userprofile = require('../../assets/images/profile.png');
  const [media, setMedia] = useState(0);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();

  const {params} = useRoute();
  const [like, setLike] = useState(false);
  const [judge, setJudge] = useState(false);
  const [disLike, setDisLike] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Userdata, setUserdata] = useState();
  const dimension = useWindowDimensions();
  const getUserAll = () => {
    setLoading(true);
    axios({
      method: 'get',
      url:
        'https://technorizen.com/Dating/webservice/get_profile?user_id=' +
        params,
    }).then(response => {
      setLoading(false);
      setUserdata(response.data.result);
    });
  };

  useEffect(() => {
    getUserAll();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      {Loading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: ThemeMode.selectedTheme
              ? theme.colors.primary
              : theme.colors.primaryBlack,
            justifyContent: 'center',
          }}>
          <ActivityLoader />
        </View>
      ) : (
        <View>
          <View>
            <HeaderImage height={240} marginBottom={40}>
              <Header
                marginTop={20}
                right={
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('chats', {params: null})
                      }
                      style={{
                        height: 40,
                        width: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                      }}>
                      {ThemeMode.selectedTheme ? (
                        <Image
                          source={require('../../assets/icons/send_light2.png')}
                          style={{
                            height: 40,
                            width: 40,
                            resizeMode: 'contain',
                            marginRight: 10,
                          }}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/icons/send_darkk.png')}
                          style={{
                            height: 40,
                            width: 40,
                            resizeMode: 'contain',
                            marginRight: 10,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <View style={{width: 15}} />

                    <TouchableOpacity
                      onPress={() => refRBSheet1.current.open()}
                      style={{
                        height: 40,
                        width: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                      }}>
                      {ThemeMode.selectedTheme ? (
                        <Image
                          source={require('../../assets/icons/menus.png')}
                          style={{
                            height: 40,
                            width: 40,
                            resizeMode: 'contain',
                            marginRight: 10,
                          }}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/icons/menù_dark.png')}
                          style={{
                            height: 40,
                            width: 40,
                            resizeMode: 'contain',
                            marginRight: 10,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                }
              />
              <TextFormatted
                style={{
                  fontSize: 22,
                  fontWeight: '700',
                  color: theme.colors.primary,
                  textAlign: 'center',
                  marginTop: 17,
                }}>
                Emma Hatchan
              </TextFormatted>
              <TextFormatted
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: theme.colors.primary,
                  textAlign: 'center',
                  marginTop: 3,
                }}>
                22 years old
              </TextFormatted>
            </HeaderImage>
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={{
                height: 108,
                width: 108,
                backgroundColor: '#fff',
                borderRadius: 60,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                position: 'absolute',
                bottom: 0,
              }}>
              <Image
                source={userprofile}
                style={{
                  height: 98,
                  width: 98,
                  resizeMode: 'contain',
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginVertical: 25,
              }}>
              <TouchableOpacity
                style={{marginHorizontal: 5}}
                onPress={() => setMedia(0)}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={
                    media == 0
                      ? ThemeMode.themecolr == 'Red'
                        ? theme.colors.primaryOn
                        : ThemeMode.themecolr == 'Blue'
                        ? theme.colors.primaryBlue
                        : ThemeMode.themecolr == 'Green'
                        ? theme.colors.primaryGreen
                        : ThemeMode.themecolr == 'Purple'
                        ? theme.colors.primaryPurple
                        : ThemeMode.themecolr == 'Yellow'
                        ? theme.colors.primaryYellow
                        : theme.colors.primaryOn
                      : ['transparent', 'transparent']
                  }
                  style={{
                    height: 71,
                    width: 91,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/home_icons/gallery.png')}
                    style={{
                      height: 30,
                      width: 30,
                      resizeMode: 'contain',
                      tintColor: media == 0 ? '#fff' : '#8490AE',
                    }}
                  />
                  <TextFormatted
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: media == 0 ? '#fff' : '#8490AE',
                      marginTop: 8,
                    }}>
                    Media
                  </TextFormatted>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginHorizontal: 5}}
                onPress={() => setMedia(1)}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={
                    media == 1
                      ? ThemeMode.themecolr == 'Red'
                        ? theme.colors.primaryOn
                        : ThemeMode.themecolr == 'Blue'
                        ? theme.colors.primaryBlue
                        : ThemeMode.themecolr == 'Green'
                        ? theme.colors.primaryGreen
                        : ThemeMode.themecolr == 'Purple'
                        ? theme.colors.primaryPurple
                        : ThemeMode.themecolr == 'Yellow'
                        ? theme.colors.primaryYellow
                        : theme.colors.primaryOn
                      : ['transparent', 'transparent']
                  }
                  style={{
                    height: 71,
                    width: 124,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/icons/information.png')}
                    style={{
                      height: 30,
                      width: 30,
                      resizeMode: 'contain',
                      tintColor: media == 1 ? '#fff' : '#8490AE',
                    }}
                  />
                  <TextFormatted
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: media == 1 ? '#fff' : '#8490AE',
                      marginTop: 8,
                    }}>
                    Information
                  </TextFormatted>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            {media == 0 ? <UserMedia /> : <UserInformation />}
            <UserLikeBottomSheet
              refRBSheet={refRBSheet}
              like={like}
              setLike={setLike}
            />
          </ScrollView>
          <MoreOptions refRBSheet={refRBSheet1} />
          <Netinforsheet />
        </View>
      )}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  linear: {
    height: 64,
    width: 64,
    borderRadius: 50,

    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  bg: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    marginRight: 12,
  },
});
