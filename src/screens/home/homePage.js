import {
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Swiper from 'react-native-swiper';
import TextFormatted from '../../components/TextFormatted';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Notification from './notification';
import MoreOptions from './moreOptions';
import SelectCategory from './selectCategory';
import {useSelector} from 'react-redux';
import {theme} from '../../utils/Constants';
import * as Animatable from 'react-native-animatable';
import pulse from 'react-native-pulse';
import Pulse from 'react-native-pulse';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import ActivityLoader from '../../components/ActivityLoader';
import Toast from 'react-native-toast-message';
const HomePage = () => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refliky_amy = useRef();
  const userRef = useRef();
  const PluseRef = useRef();
  const scroll = useRef();
  const dimension = useWindowDimensions();
  const [liky, setliky] = useState(true);
  const [indexV, setIndexV] = useState(0);
  const [plu_button, setplu_button] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Userall, setUserall] = useState();
  const [Userpost, setUserpost] = useState();
  const [Otherid, setOtherid] = useState();
  console.log('Userpost=>', Userpost);
  const Userimage = [
    {
      img: require('../../assets/images/unsplash_1.png'),
    },
    {
      img: require('../../assets/images/unsplash_2.png'),
    },
    {
      img: require('../../assets/images/unsplash_1.png'),
    },
  ];
  const data = [
    {
      username: 'Sofia Dickens',
      timing: '28 years old',
      userprofile: require('../../assets/images/profile.png'),
      image: [
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
        {
          img: require('../../assets/images/unsplash_2.png'),
        },
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
      ],
    },
    {
      username: 'Emma Hatchan',
      timing: '23 years old',
      userprofile: require('../../assets/images/profile2.png'),
      image: [
        {
          img: require('../../assets/images/unsplash_2.png'),
        },
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
      ],
    },
    {
      username: 'Emma Hatchan',
      timing: '25 years old',
      userprofile: require('../../assets/images/profile.png'),
      image: [
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
        {
          img: require('../../assets/images/unsplash_2.png'),
        },
      ],
    },
    {
      username: 'Emma Hatchan',
      timing: '26 years old',
      userprofile: require('../../assets/images/profile2.png'),
      image: [
        {
          img: require('../../assets/images/unsplash_2.png'),
        },
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
      ],
    },
    {
      username: 'Sofia Dickens',
      timing: '28 years old',
      userprofile: require('../../assets/images/profile.png'),
      image: [
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
        {
          img: require('../../assets/images/unsplash_2.png'),
        },
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
      ],
    },
    {
      username: 'Sofia Dickens',
      timing: '28 years old',
      userprofile: require('../../assets/images/profile.png'),
      image: [
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
        {
          img: require('../../assets/images/unsplash_2.png'),
        },
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
      ],
    },
  ];

  function UserScroll() {
    if (Userall.length == indexV + 1) {
      setplu_button(false);
      Toast.show({
        type: 'info',
        text1: 'User List End',
        position: 'top',
      });
    } else {
      setplu_button(true);
      setTimeout(() => {
        setIndexV(indexV + 1);
        userRef.current.scrollToIndex({index: indexV + 1});
      }, 750);
    }
  }

  const getUserAll = () => {
    setLoading(true);
    axios({
      method: 'get',
      url:
        'https://technorizen.com/Dating/webservice/get_all_user?user_id=' +
        Staps.id,
    }).then(response => {
      setLoading(false);
      setUserall(response.data.result);
    });
  };
  const getUserPost = () => {
    axios({
      method: 'get',
      url:
        'https://technorizen.com/Dating/webservice/getallUserPostData?user_id=' +
        Staps.id,
    }).then(response => {
      setUserpost(response.data.result);
    });
  };
  // const likeApi = () => {
  //   try {
  //     const body = new FormData();
  //     body.append('user_id', Staps.id);
  //     body.append('other_user_id', otherid);
  //     axios({
  //       url: 'https://technorizen.com/Dating/webservice/user_like',
  //       method: 'POST',
  //       data: body,
  //       headers: {
  //         'content-type': 'multipart/form-data',
  //       },
  //     })
  //       .then(function (response) {
  //         if (response.data.status == 1) {
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log('catch', error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getUserAll();
    getUserPost();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />

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
          <FlatList
            data={Userall}
            initialScrollIndex={indexV}
            onScroll={() => {
              setplu_button(false);
            }}
            pagingEnabled={true}
            ref={userRef}
            renderItem={({item}) => (
              <View style={{flex: 1, height: dimension.height}}>
                <Swiper
                  loop={false}
                  showsButtons={true}
                  showsPagination={false}
                  buttonWrapperStyle={{paddingHorizontal: 0}}
                  nextButton={
                    <Image
                      source={
                        ThemeMode.selectedTheme
                          ? require('../../assets/icons/P_sidebar.png')
                          : require('../../assets/icons/next_dark.png')
                      }
                      style={{height: 145, width: 25, resizeMode: 'contain'}}
                    />
                  }
                  prevButton={
                    <Image
                      source={
                        ThemeMode.selectedTheme
                          ? require('../../assets/icons/N_sidebar.png')
                          : require('../../assets/icons/prev_dark.png')
                      }
                      style={{height: 145, width: 25, resizeMode: 'contain'}}
                    />
                  }>
                  {Userimage?.map(
                    (it, i) => (
                      /*  it.user_id == item.user_id && ( */
                      <View
                        style={{
                          height: dimension.height,
                          width: dimension.width,
                        }}>
                        {/*      {it.type == 'Image' && ( */}
                        <Image
                          source={it.img}
                          resizeMode="cover"
                          style={{
                            height: dimension.height,
                            width: dimension.width,
                          }}
                        />
                        {/*   )} */}
                      </View>
                    ),
                    /*   ), */
                  )}
                </Swiper>
                <View
                  style={{
                    position: 'absolute',
                    top: 44,
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('userProfile')}>
                    <Image
                      source={
                        item?.image
                          ? {uri: item?.image}
                          : require('../../assets/images/Icon_profile.png')
                      }
                      style={{
                        height: 56,
                        width: 56,
                        resizeMode: 'cover',
                        borderRadius: 50,
                        borderWidth: 3,
                        borderColor: theme.colors.darkGrey,
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{marginLeft: 8, flex: 1}}>
                    <TextFormatted
                      style={{fontSize: 16, fontWeight: '700', color: '#fff'}}>
                      {item?.user_name + ' ' + item?.surname}
                    </TextFormatted>
                    <TextFormatted
                      style={{fontSize: 12, fontWeight: '400', color: '#fff'}}>
                      {new Date().getFullYear() - item.dob.slice(0, 4)} years
                      old
                    </TextFormatted>
                  </View>
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 40,
                      backgroundColor: ThemeMode.selectedTheme
                        ? '#FFFFFF33'
                        : '#1A1D254D',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      marginRight: 10,
                    }}
                    onPress={() => refRBSheet1.current.open()}>
                    <LinearGradient
                      colors={
                        ThemeMode.themecolr == 'Red'
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
                      }
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 1}}
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 50,
                        position: 'absolute',
                        top: 5,
                        right: 10,
                        zIndex: 1,
                      }}
                    />
                    <Image
                      source={require('../../assets/icons/Notifyy.png')}
                      style={{height: 25, width: 25, resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => refRBSheet.current.open()}
                    style={{
                      height: 40,
                      width: 40,
                      backgroundColor: ThemeMode.selectedTheme
                        ? '#FFFFFF33'
                        : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                    }}>
                    {ThemeMode.selectedTheme ? (
                      <Entypo
                        name="dots-three-vertical"
                        color={'#fff'}
                        size={16}
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
              </View>
            )}
          />
        </View>
      )}
      <Toast />
      <ImageBackground
        resizeMode="contain"
        source={
          ThemeMode.selectedTheme
            ? require('../../assets/images/Tab_bg1.png')
            : require('../../assets/images/dar_home.png')
        }
        style={{
          height: 65,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Tab
          currentTab={true}
          source={require('../../assets/home_icons/home.png')}
        />
        <Tab source={require('../../assets/home_icons/focus.png')} />
        <Tab
          onPress={() => {
            UserScroll();
          }}
          Animatable={
            <View>
              {plu_button == true && (
                <Pulse
                  ref={PluseRef}
                  color={
                    ThemeMode.themecolr == 'Red'
                      ? theme.colors.red
                      : ThemeMode.themecolr == 'Blue'
                      ? theme.colors.Blue
                      : ThemeMode.themecolr == 'Green'
                      ? theme.colors.Green
                      : ThemeMode.themecolr == 'Purple'
                      ? theme.colors.Purple
                      : ThemeMode.themecolr == 'Yellow'
                      ? theme.colors.Yellow
                      : theme.colors.red
                  }
                  diameter={80}
                />
              )}
              <Animatable.Image
                source={
                  ThemeMode.selectedTheme
                    ? require('../../assets/icons/like_dark2.png')
                    : require('../../assets/icons/like_dark.png')
                }
                // animation="fadeInUp"
                ref={refliky_amy}
                //duration={2000}
                // iterationCount={1}
                style={{
                  height: ThemeMode.selectedTheme ? 70 : 105,
                  width: ThemeMode.selectedTheme ? 70 : 105,
                  resizeMode: 'contain',
                }}
                // easing={'ease-in-circ'}
              ></Animatable.Image>
            </View>
          }
        />

        <Tab
          source={require('../../assets/icons/colormssg.png')}
          onPress={() => navigation.navigate('chatList')}></Tab>

        <Tab
          source={require('../../assets/home_icons/profile.png')}
          onPress={() => navigation.navigate('myProfile')}
        />
      </ImageBackground>
      <View
        style={{
          borderRadius: 50,
          borderBottomWidth: 2,
          borderBottomColor:
            ThemeMode.themecolr == 'Red'
              ? theme.colors.red
              : ThemeMode.themecolr == 'Blue'
              ? theme.colors.Blue
              : ThemeMode.themecolr == 'Green'
              ? theme.colors.Green
              : ThemeMode.themecolr == 'Purple'
              ? theme.colors.Purple
              : ThemeMode.themecolr == 'Yellow'
              ? theme.colors.Yellow
              : theme.colors.red,
          width: '34%',
          position: 'absolute',
          bottom: 0,
        }}></View>

      <Notification refRBSheet={refRBSheet1} />
      <MoreOptions refRBSheet={refRBSheet} />
      <SelectCategory refRBSheet={refRBSheet2} />
    </View>
  );
};

const Tab = ({
  disabled,
  onPress,
  source,
  currentTab,
  style,
  Animatable,
  onLongPress,
  activePoint,
}) => {
  const dimension = useWindowDimensions();
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        marginBottom: 6,
      }}>
      <View
        style={{
          width: (dimension.width - 118) / 5,
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
        }}>
        {Animatable}
        {activePoint}
        <Image
          source={source}
          style={
            style || {
              height: 27,
              width: 27,
              resizeMode: 'contain',
              opacity: currentTab ? 1 : 0.5,
              marginTop: 15,
              marginBottom: 5,
            }
          }
        />
        <View
          style={{
            width: '50%',
            borderRadius: 5,
            borderWidth: 1.5,
            borderColor:
              currentTab == true
                ? ThemeMode.themecolr == 'Red'
                  ? theme.colors.red
                  : ThemeMode.themecolr == 'Blue'
                  ? theme.colors.Blue
                  : ThemeMode.themecolr == 'Green'
                  ? theme.colors.Green
                  : ThemeMode.themecolr == 'Purple'
                  ? theme.colors.Purple
                  : ThemeMode.themecolr == 'Yellow'
                  ? theme.colors.Yellow
                  : theme.colors.red
                : 'transparent',
          }}></View>
      </View>
    </TouchableOpacity>
  );
};
export default HomePage;

const styles = StyleSheet.create({});
