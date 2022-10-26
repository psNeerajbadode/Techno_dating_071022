import {
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImage_1 from '../../components/HeaderImage_1';
import Header from '../../components/Header';
import HeaderImage from '../../components/HeaderImage';
import TextFormatted from '../../components/TextFormatted';
import LinearGradient from 'react-native-linear-gradient';
import Images from './profileComponent/images';
import Videos from './profileComponent/videos';
import Information from './profileComponent/information';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import ActivityLoader from '../../components/ActivityLoader';

const MyProfile = () => {
  const navigation = useNavigation();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const dimension = useWindowDimensions();
  const [media, setMedia] = useState(0);
  const [User, setUser] = useState();
  const [load, setLoad] = useState();

  const data = [
    {title: 'Matches', count: '237'},
    {title: 'Likes', count: '10k'},
    {title: 'Dislikes', count: '1k'},
  ];
  const mediadata = [
    {title: 'Images', img: require('../../assets/home_icons/gallery.png')},
    {
      title: 'Video',
      img: require('../../assets/home_icons/video_marketing.png'),
    },
    {title: 'Information', img: require('../../assets/icons/information.png')},
  ];
  const homeTab = [
    {
      icon: require('../../assets/home_icons/home.png'),
      link: 'homePage',
    },
    {
      icon: require('../../assets/home_icons/focus.png'),
      link: 'myProfile',
    },
    {
      icon: require('../../assets/home_icons/love.png'),
      link: 'myProfile',
    },
    {
      icon: require('../../assets/home_icons/messages.png'),
      link: 'chatList',
    },
    {
      icon: require('../../assets/home_icons/profile.png'),
      link: 'myProfile',
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <View>
        <HeaderImage height={240} marginBottom={40}>
          <Header
            title={'My profile'}
            left={
              <TouchableOpacity onPress={() => navigation.navigate('settings')}>
                <Image
                  source={
                    ThemeMode.selectedTheme
                      ? require('../../assets/icons/Settings.png')
                      : require('../../assets/icons/Settings_dark.png')
                  }
                  style={{height: 40, width: 40, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            }
            right={
              <TouchableOpacity
                onPress={() => navigation.navigate('editProfile')}>
                <Image
                  source={
                    ThemeMode.selectedTheme
                      ? require('../../assets/icons/edit_White.png')
                      : require('../../assets/icons/edit_dark.png')
                  }
                  style={{height: 40, width: 40, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
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
            {Staps.user_name}
          </TextFormatted>
          <TextFormatted
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: theme.colors.primary,
              textAlign: 'center',
              marginTop: 3,
            }}>
            {/* {new Date().getFullYear() - Staps.dob.slice(0, 4)} */} 28 years
            old
          </TextFormatted>
        </HeaderImage>
        <View
          style={{
            height: 95,
            width: 95,
            backgroundColor: '#fff',
            borderRadius: 60,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            position: 'absolute',
            bottom: 15,
            shadowColor: '#8490ae85',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 10,
          }}>
          <Image
            source={
              Staps.image == null
                ? require('../../assets/images/image.png')
                : {uri: Staps.image}
            }
            style={{
              height: 98,
              width: 98,
              resizeMode: 'contain',
              borderRadius: 50,
            }}
          />
        </View>
      </View>
      <ScrollView>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          {data.map(v => (
            <View
              style={{
                width: (dimension.width - 62) / 3,
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <TextFormatted
                style={{fontSize: 14, fontWeight: '400', color: '#8490AE'}}>
                {v.title}
              </TextFormatted>
              <TextFormatted
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: ThemeMode.selectedTheme
                    ? theme.colors.primaryBlack
                    : theme.colors.primary,
                  marginTop: 5,
                }}>
                {v.count}
              </TextFormatted>
            </View>
          ))}
        </View>
        <View>
          <View
            style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
            {mediadata.map((v, i) => (
              <View>
                <TouchableOpacity
                  style={{marginHorizontal: 5}}
                  onPress={() => setMedia(i)}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={
                      media == i
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
                        : ThemeMode.selectedTheme
                        ? ['transparent', 'transparent']
                        : ['#FFFFFF0D', '#FFFFFF0D']
                    }
                    style={{
                      height: 71,
                      paddingHorizontal: 26,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={v.img}
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'contain',
                        tintColor: media == i ? '#fff' : '#8490AE',
                      }}
                    />
                    <TextFormatted
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                        color: media == i ? '#fff' : '#8490AE',
                        marginTop: 8,
                      }}>
                      {v.title}
                    </TextFormatted>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        {media == 0 ? <Images /> : media == 1 ? <Videos /> : <Information />}
      </ScrollView>

      <ImageBackground
        resizeMode="cover"
        style={{
          height: 65,
          width: '100%',
          backgroundColor: ThemeMode.selectedTheme ? '#FFFFFFE5' : '#22242BB2',
          //backgroundColor: 'rgba(255, 255, 255, 0.1)',
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Tab
          source={require('../../assets/home_icons/home.png')}
          onPress={() => navigation.navigate('homePage')}
        />
        <Tab source={require('../../assets/home_icons/focus.png')} />

        <Tab
          source={require('../../assets/icons/colormssg.png')}
          onPress={() => navigation.navigate('chatList')}
        />

        <Tab
          currentTab={true}
          source={require('../../assets/home_icons/profile.png')}
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
          width: '32%',
        }}></View>
    </View>
  );
};

const Tab = ({disabled, onPress, source, currentTab, style}) => {
  const dimension = useWindowDimensions();
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{marginBottom: 6}}>
      <View
        style={{
          width: dimension.width / 5,
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
        }}>
        <Animatable.View
          animation={'fadeIn'}
          duration={1500}
          easing={'ease-in'}>
          <Image
            source={source}
            style={
              style || {
                height: 27,
                width: 27,
                resizeMode: 'contain',
                marginTop: 15,
                marginBottom: 5,
                opacity: currentTab ? 1 : 0.5,
                tintColor: ThemeMode.selectedTheme
                  ? theme.colors.primaryBlack
                  : theme.colors.primary,
              }
            }
          />
        </Animatable.View>
        {currentTab == true && (
          <View
            style={{
              width: '50%',
              borderRadius: 5,
              borderWidth: currentTab ? 1.5 : 0,
              borderColor:
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
            }}></View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default MyProfile;

const styles = StyleSheet.create({});
