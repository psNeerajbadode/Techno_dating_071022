import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImage_1 from '../../components/HeaderImage_1';
import Header from '../../components/Header';
import TextFormatted from '../../components/TextFormatted';
import LinearGradient from 'react-native-linear-gradient';
import MoreOptions from '../home/moreOptions';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import Netinforsheet from '../../components/Netinforsheet';

const Chats = () => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [multipleFile, setMultipleFile] = useState([]);
  const refRBSheet = useRef();

  const [passion, setpassion] = useState([]);
  const {params} = useRoute();
  const [mess, setMess] = useState('');
  const [show, setShow] = useState(false);
  const [getmsg, setGetmsg] = useState();

  const dimension = useWindowDimensions();

  const chatData = [
    {
      reciverId: 1,
      img: require('../../assets/images/unsplash_1.png'),
      msg1: 'Alex, let’s meet this weekend. I’ll check with Dave too 😎',
      time: '8:27 PM',
    },
    {
      sernderId: 0,
      img: require('../../assets/images/unsplash_1.png'),
      msg1: 'Sure. Let’s aim for saturday',
      msg2: 'I’m visiting mom this sunday 👻',
      time: '8:56 PM',
    },
    {
      reciverId: 1,
      img: require('../../assets/images/unsplash_1.png'),
      msg1: 'Alrighty! Will give you a call shortly 🤗',
      time: '9:01 PM',
    },
    {
      sernderId: 0,
      img: require('../../assets/images/unsplash_1.png'),
      msg1: '❤️',
      time: '9:04 PM',
    },
    {
      reciverId: 1,
      img: require('../../assets/images/unsplash_1.png'),
      msg1: 'Hey you! Are you there?',
      time: '11:53 AM',
    },
    {
      sernderId: 0,
      img: require('../../assets/images/unsplash_1.png'),
      msg1: '👋 Hi Jess! What’s up?',
      time: '12:14 PM',
    },
  ];
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

  const InsertChat = () => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append('sender_id', Staps.id);
      body.append('receiver_id', 38);
      body.append('chat_message', mess);
      axios({
        url: 'https://technorizen.com/Dating/webservice/insert_chat',
        method: 'POST',
        data: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('response', JSON.stringify(response));
          if (response.data.status == 1) {
            setLoading(false);
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

  const Getchat_api = () => {
    axios({
      method: 'get',
      url:
        'https://technorizen.com/Dating/webservice/get_chat?sender_id=' +
        /* Staps.id */ 49 +
        '&' +
        'receiver_id=' +
        38,
    }).then(response => {
      console.log('Chat Message =>', response.data.result);
      setGetmsg(response.data.result);
    });
  };

  const getPassion = () => {
    axios({
      method: 'get',
      url: `https://technorizen.com/Dating/webservice/get_passion`,
    }).then(response => {
      console.log('response=>', response.data.result);
      setpassion(response.data.result);
    });
  };

  useEffect(() => {
    getPassion();
    Getchat_api();
  }, []);
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
          }
        />
      </HeaderImage_1>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            padding: 15,
            borderBottomRightRadius: 50,
            borderTopLeftRadius: 50,
            borderBottomLeftRadius: 50,
            // marginLeft: 50,
            marginTop: 20,
            marginRight: 10,
            marginBottom: 15,
            alignSelf: 'flex-end',
            flex: 1,
            backgroundColor:
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
          }}>
          <TextFormatted
            style={{
              fontSize: 13,
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
        </View>
        {params.params != null && (
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {passion.map(
              (v, i) =>
                params.params[i] == v.id && (
                  <View
                    style={{
                      width: dimension.width / 3,
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginBottom: 15,
                    }}>
                    <Image
                      source={{uri: v.image}}
                      resizeMode="contain"
                      style={{width: 45, height: 45}}
                    />
                    <TextFormatted
                      style={{
                        fontSize: 15,
                        fontWeight: '700',
                        color: theme.colors.darkGrey,
                        marginTop: 10,
                      }}>
                      {v.passion_name}
                    </TextFormatted>
                  </View>
                ),
            )}
          </View>
        )}

        <FlatList
          data={getmsg}
          inverted
          renderItem={({item, i}) => (
            <View
              style={{
                marginLeft: 20,
                marginTop: 22,
                marginHorizontal: 15,
                alignItems:
                  item.receiver_id != null ? 'flex-start' : 'flex-end',
              }}>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {item.receiver_id != null && (
                  <Image
                    source={require('../../assets/images/unsplash_1.png')}
                    style={{
                      height: 64,
                      width: 64,
                      resizeMode: 'cover',
                      borderRadius: 50,
                    }}
                  />
                )}
                <View
                  style={{
                    paddingVertical: 15,
                    paddingRight: 20,
                    backgroundColor:
                      item.receiver_id != null
                        ? ThemeMode.selectedTheme
                          ? '#FAFAFA'
                          : '#FFFFFF0D'
                        : ThemeMode.themecolr == 'Red'
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
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    borderBottomRightRadius: 50,
                    borderTopLeftRadius: item.receiver_id != null ? 0 : 50,
                    borderTopRightRadius: item.receiver_id == null ? 0 : 50,
                    borderBottomLeftRadius: 50,
                    justifyContent: 'flex-start',
                  }}>
                  <TextFormatted
                    style={{
                      fontSize: 12,
                      fontWeight: '300',
                      color:
                        item.receiver_id == null
                          ? theme.colors.primary
                          : ThemeMode.selectedTheme
                          ? theme.colors.primaryBlack
                          : theme.colors.primary,
                      marginLeft: 15,
                    }}>
                    {item.chat_message}
                  </TextFormatted>
                  <TextFormatted
                    style={{
                      fontSize: 12,
                      fontWeight: '300',
                      color:
                        item.receiver_id == null
                          ? theme.colors.primary
                          : ThemeMode.selectedTheme
                          ? theme.colors.primaryBlack
                          : theme.colors.primary,
                      marginLeft: 15,
                    }}>
                    12:55
                  </TextFormatted>
                </View>
              </View>
            </View>
          )}
        />

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
              backgroundColor: ThemeMode.selectedTheme
                ? '#FAFAFA'
                : '#FFFFFF0D',
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
            /*  onPress={selectMultipleFile} */
          >
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
        <TouchableOpacity
          style={{marginLeft: 15}}
          onPress={() => {
            setMess('');
            InsertChat();
          }}>
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
      <Netinforsheet />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({});
