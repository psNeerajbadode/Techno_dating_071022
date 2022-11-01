import {
  FlatList,
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
import UserLikeBottomSheet from './homeComponent/userLikeBottomSheet';
import {useRef} from 'react';
import MoreOptions from './moreOptions';
import {useSelector} from 'react-redux';
import {theme} from '../../utils/Constants';
import {useRoute} from '@react-navigation/native';
import ActivityLoader from '../../components/ActivityLoader';
import axios from 'axios';
import Netinforsheet from '../../components/Netinforsheet';
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
  const [Userpost, setUserpost] = useState();
  const dimension = useWindowDimensions();
  console.log(Userdata?.id);
  const getUser = () => {
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
  const getUserData = () => {
    axios({
      method: 'get',
      url:
        'https://technorizen.com/Dating/webservice/getUserPostData?user_id=' +
        params +
        '&&' +
        'type=Image',
    }).then(response => {
      setUserpost(response.data.result);
    });
  };
  useEffect(() => {
    getUser();
    getUserData();
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
                {Userdata?.user_name}
              </TextFormatted>
              <TextFormatted
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: theme.colors.primary,
                  textAlign: 'center',
                  marginTop: 3,
                }}>
                {new Date().getFullYear() - Userdata?.dob?.slice(0, 4)}
                {/* 22 */} years old
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
                source={
                  Userdata?.image == null
                    ? require('../../assets/images/image.png')
                    : {uri: Userdata?.image}
                }
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
            {media == 0 ? (
              <View
                style={{
                  paddingBottom: dimension.width * 0.9,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: dimension.width / 2}}>
                    {Userpost?.map(
                      (v, i) =>
                        (i != 0 && i != 2) || (
                          <TouchableOpacity
                            style={{
                              marginTop: 20,
                              marginHorizontal: 10,
                              alignSelf: 'flex-end',
                            }}
                            onPress={() =>
                              navigation.navigate('viewImage', {
                                imgIndex: i,
                                Userphoto: Userpost,
                              })
                            }>
                            <Image
                              source={{uri: v.image}}
                              style={{
                                width: (dimension.width - 50) / 2,
                                height: i == 0 ? 230 : 337,
                                resizeMode: 'cover',
                                borderRadius: 20,
                              }}
                            />
                          </TouchableOpacity>
                        ),
                    )}
                  </View>
                  <View style={{width: dimension.width / 2}}>
                    {Userpost?.map(
                      (v, i) =>
                        (i != 1 && i != 3 && i != 4) || (
                          <TouchableOpacity
                            style={{marginTop: 20, marginHorizontal: 10}}
                            onPress={() =>
                              navigation.navigate('viewImage', {
                                imgIndex: i,
                                Userphoto: Userpost,
                              })
                            }>
                            <Image
                              source={{uri: v.image}}
                              style={{
                                width: (dimension.width - 50) / 2,
                                height: i == 1 ? 166 : i == 3 ? 238 : 143,
                                resizeMode: 'cover',
                                borderRadius: 20,
                              }}
                            />
                          </TouchableOpacity>
                        ),
                    )}
                  </View>
                </View>
                {Userpost?.map(
                  (v, i) =>
                    i != 5 || (
                      <TouchableOpacity
                        style={{marginTop: 20, alignSelf: 'center'}}
                        onPress={() =>
                          navigation.navigate('viewImage', {
                            imgIndex: i,
                            Userphoto: Userpost,
                          })
                        }>
                        <Image
                          source={{uri: v.image}}
                          style={{
                            width: dimension.width - 40,
                            height: 143,
                            resizeMode: 'cover',
                            borderRadius: 20,
                          }}
                        />
                      </TouchableOpacity>
                    ),
                )}
              </View>
            ) : (
              <View
                style={{
                  paddingBottom: dimension.width * 0.9,
                }}>
                <TextFormatted
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: ThemeMode.selectedTheme
                      ? theme.colors.primaryBlack
                      : theme.colors.primary,
                    marginLeft: 40,
                  }}>
                  Passions
                </TextFormatted>
                <FlatList
                  data={Userdata?.category}
                  horizontal
                  style={{paddingHorizontal: 10}}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => (
                    <View
                      style={{
                        height: 100,
                        width: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: item?.image}}
                        style={{height: 50, width: 50, resizeMode: 'contain'}}
                      />
                      <TextFormatted
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#8490AE',
                        }}>
                        {item?.passion_name}
                      </TextFormatted>
                    </View>
                  )}
                />
                <View style={{height: 20}}></View>
                <UserInformation
                  source={require('../../assets/icons/account.png')}
                  height={24}
                  width={24}
                  title={'About me'}
                  text={Userdata?.about}
                />
                <UserInformation
                  source={require('../../assets/icons/equality.png')}
                  title={'Sexual orientation'}
                  text={Userdata?.sexual_orientation}
                />
                <UserInformation
                  source={require('../../assets/icons/search_2.png')}
                  title={'Looking for'}
                  text={Userdata?.looking_for}
                />
                <UserInformation
                  source={require('../../assets/icons/book.png')}
                  title={'Education'}
                  text={Userdata?.education}
                />
                <UserInformation
                  source={require('../../assets/icons/location.png')}
                  title={'Ethnicity'}
                  text={Userdata?.ethnicity}
                />
                <UserInformation
                  source={require('../../assets/icons/translation.png')}
                  title={'Language'}
                  text={'English'}
                />
                <UserInformation
                  source={require('../../assets/icons/favourites.png')}
                  title={'Zodiac'}
                  text={Userdata?.zodiac}
                />
                <UserInformation
                  source={require('../../assets/icons/baby_carriage.png')}
                  title={'Has kids'}
                  text={Userdata?.kids}
                />
                <UserInformation
                  source={require('../../assets/icons/cocktail.png')}
                  title={'Drinks'}
                  text={Userdata?.drink}
                />
                <UserInformation
                  source={require('../../assets/icons/cigarrete.png')}
                  title={'Smokes'}
                  text={Userdata?.smoke}
                />
              </View>
            )}
          </ScrollView>
          <UserLikeBottomSheet
            U_id={Userdata?.id}
            refRBSheet={refRBSheet}
            like={like}
            setLike={setLike}
          />

          <MoreOptions refRBSheet={refRBSheet1} />
          <Netinforsheet />
        </View>
      )}
    </View>
  );
};
const UserInformation = ({title, text, source}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <View style={{marginHorizontal: 25, marginVertical: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={source}
          style={{height: 24, width: 24, resizeMode: 'contain'}}
        />
        <TextFormatted
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginLeft: 10,
          }}>
          {title}
        </TextFormatted>
      </View>
      <TextFormatted
        style={{
          fontSize: 14,
          fontWeight: '400',
          color: '#8490AE',
          marginTop: 10,
        }}>
        {text}
      </TextFormatted>
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
