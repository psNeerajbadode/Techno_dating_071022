import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImage_1 from '../../components/HeaderImage_1';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import TextFormatted from '../../components/TextFormatted';
import LinearGradient from 'react-native-linear-gradient';
import MoreOptions from '../home/moreOptions';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {useRoute} from '@react-navigation/native';

const Chats = () => {
  const [multipleFile, setMultipleFile] = useState([]);
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const refRBSheet = useRef();
  const {params} = useRoute();
  const [mess, setMess] = useState('');
  const [show, setShow] = useState(false);
  console.log(params);
  const dimension = useWindowDimensions();

  const selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      for (const res of results) {
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      setMultipleFile(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // alert('Canceled from multiple doc picker');
      } else {
        // alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const data = [
    {
      img: require('../../assets/icons/clapperboard.png'),
      title: 'Movies',
      subtitle: 'Tell me what to watch tonight',
    },

    {
      img: require('../../assets/icons/hot_coffee.png'),
      title: 'Coffee',
      subtitle: 'Take me to your favorite cafe',
    },

    {
      img: require('../../assets/icons/mirror_ball.png'),
      title: 'Club',
      subtitle: 'Let’s have some fun',
    },

    {
      img: require('../../assets/icons/art_and_design.png'),
      title: 'Art',
      subtitle: 'Take me to your favorite Art',
    },
    {
      img: require('../../assets/icons/sports.png'),
      title: 'Sports',
      subtitle: 'Take me to your favorite Sports',
    },

    {
      img: require('../../assets/icons/aeroplane.png'),
      title: 'Travel',
      subtitle: 'Take me to your favorite Travel',
    },

    {
      img: require('../../assets/icons/console.png'),
      title: 'Games',
      subtitle: 'Take me to your favorite Games',
    },

    {
      img: require('../../assets/icons/love_1.png'),
      title: 'Friends',
      subtitle: 'Let’s be friends. Maybe even besties',
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
      <HeaderImage_1 height={150} marginBottom={1}>
        <Header
          marginTop={18}
          title={'Emma Hatchan, 22'}
          right={
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={{
                height: 40,
                width: 40,
                backgroundColor: ThemeMode.selectedTheme
                  ? '#FFFFFF33'
                  : '#1A1D2533',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                position: 'absolute',
                right: 0,
              }}>
              <Icon name="dots-three-vertical" color={'#fff'} size={16} />
            </TouchableOpacity>
          }
        />
      </HeaderImage_1>
      <ScrollView style={{flex: 1}}>
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
          style={{
            padding: 15,
            borderBottomRightRadius: 50,
            borderTopLeftRadius: 50,
            borderBottomLeftRadius: 50,
            // marginLeft: 50,
            marginTop: 20,
            marginRight: 20,
            marginBottom: 15,
            alignSelf: 'flex-end',
            flex: 1,
          }}>
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: theme.colors.primary,
            }}>
            Hi, these are the date types I prefer
            <TextFormatted
              style={{
                fontSize: 12,
                fontWeight: '300',
                color: theme.colors.primary,
              }}>
              12:56
            </TextFormatted>
          </TextFormatted>
        </LinearGradient>
        {params.params != null && (
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {data.map(
              (v, i) =>
                params.params[i] == v.title && (
                  <View
                    style={{
                      width: dimension.width / 3,
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginBottom: 15,
                    }}>
                    <Image
                      source={v.img}
                      resizeMode="contain"
                      style={{width: 50, height: 50}}
                    />
                    <TextFormatted
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: theme.colors.darkGrey,
                        marginTop: 12,
                      }}>
                      {v.title}
                    </TextFormatted>
                  </View>
                ),
            )}
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            marginTop: 20,
            marginRight: 50,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/images/unsplash_1.png')}
            style={{
              height: 64,
              width: 64,
              resizeMode: 'cover',
              borderRadius: 50,
            }}
          />
          <View
            style={{
              padding: 15,
              backgroundColor: '#FAFAFA',
              marginLeft: 10,
              flexDirection: 'row',
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Image
              style={{
                width: 27,
                height: 9,
                tintColor: ThemeMode.selectedTheme
                  ? theme.colors.darkGrey
                  : theme.colors.primary,
              }}
              resizeMode="contain"
              source={require('../../assets/icons/chat_dots.png')}
            />
            <TextFormatted
              style={{
                fontSize: 12,
                fontWeight: '300',
                color: ThemeMode.selectedTheme
                  ? theme.colors.primaryBlack
                  : theme.colors.primary,
                marginLeft: 15,
              }}>
              12:55
            </TextFormatted>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: ThemeMode.selectedTheme
              ? theme.colors.primary
              : theme.colors.primaryBlack,
            padding: 0,
            borderRadius: 50,
            paddingHorizontal: 10,
            shadowColor: '#8490ae85',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 10,
            flex: 1,
          }}>
          <TextInput
            placeholder="Type your message"
            value={mess}
            onChangeText={setMess}
            style={{
              flex: 1,
              padding: 10,
              fontFamily: 'Rubik-Regular',
              fontSize: 14,
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
            }}
            placeholderTextColor={'#8490AE'}
          />

          <TouchableOpacity
            style={{
              alignSelf: 'center',
              width: 22,
              height: 22,
            }}
            onPress={selectMultipleFile}>
            <Image
              style={{
                width: 22,
                height: 22,
                tintColor: ThemeMode.selectedTheme
                  ? theme.colors.Black
                  : theme.colors.primary,
              }}
              resizeMode="contain"
              source={require('../../assets/icons/pin_chat.png')}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{marginLeft: 15}} onPress={() => setMess('')}>
          <LinearGradient
            colors={
              mess == ''
                ? ['#8490AE', '#ADB9D7']
                : ThemeMode.themecolr == 'Red'
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
            style={{
              height: 38,
              width: 38,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 19,
                height: 19,
                tintColor: '#fff',
              }}
              resizeMode="contain"
              source={require('../../assets/icons/send_arrow.png')}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <MoreOptions refRBSheet={refRBSheet} />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({});
