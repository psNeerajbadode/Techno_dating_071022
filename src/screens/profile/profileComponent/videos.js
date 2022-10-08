import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import TextFormatted from '../../../components/TextFormatted';
import {theme} from '../../../utils/Constants';
import Icon from 'react-native-vector-icons/Entypo';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import BottomSheet from '../../../components/bottomSheet';
import {createThumbnail} from 'react-native-create-thumbnail';
import {Thumbnail} from 'react-native-thumbnail-video';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import ActivityLoader from '../../../components/ActivityLoader';

const Videos = () => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const navigation = useNavigation();
  const dimension = useWindowDimensions();
  const [uri, setUri] = useState();
  const [thumb, setThumb] = useState();
  const [User, setUser] = useState();
  const [Loading, setLoading] = useState(false);
  const refRBSheet = useRef();
  const videoData = [
    {vid: require('../../../assets/images/big_buck_bunny_720p_1mb.mp4')},
  ];
  const pickVideo = () => {
    launchImageLibrary({mediaType: 'video', videoQuality: 'high'}, response => {
      if (!response.didCancel) {
        setUri(response.assets[0]);
        generateThumbnail(response.assets[0]);
      }
    });
  };
  const picCamera = () => {
    launchCamera({mediaType: 'video', videoQuality: 'high'}, response => {
      if (!response.didCancel) {
        setUri(response.assets[0]);
        generateThumbnail(response.assets[0]);
      }
    });
  };
  async function generateThumbnail(uri) {
    if (!uri) {
      return;
    }
    try {
      const response = await createThumbnail({
        url: uri.uri,
      });
      setThumb(response.path);
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  const getUserData = () => {
    setLoading(true);
    axios({
      method: 'get',
      url:
        'https://technorizen.com/Dating/webservice/getUserPostData?user_id=' +
        Staps.id +
        '&&' +
        'type=Video',
    }).then(response => {
      setLoading(false);
      setUser(response.data.result);
    });
  };
  useEffect(() => {
    getUserData();
  }, []);
  console.log('User =>', User);
  return (
    <ScrollView>
      {/* {Loading ? (
        <View style={{marginTop: dimension.width * 0.15}}>
          <ActivityLoader />
        </View>
      ) : ( */}
      <View style={{flexDirection: 'row'}}>
        <View style={{width: dimension.width / 2}}>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={{
              width: (dimension.width - 50) / 2,
              height: (dimension.width - 50) / 2,
              backgroundColor: ThemeMode.selectedTheme
                ? theme.colors.primary
                : theme.colors.primaryBlack,
              alignSelf: 'center',
              borderRadius: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <ImageBackground
              source={require('../../../assets/icons/youtube.png')}
              style={{height: 60, width: 60}}
              resizeMode="contain">
              <View
                style={{
                  height: 24,
                  width: 24,
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
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: -7,
                  top: -7,
                }}>
                <Icon name="plus" color={'#fff'} size={20} />
              </View>
            </ImageBackground>
            <TextFormatted
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: ThemeMode.selectedTheme
                  ? theme.colors.primaryBlack
                  : theme.colors.primary,
                marginTop: 5,
              }}>
              Add video
            </TextFormatted>
          </TouchableOpacity>
        </View>
        {/* <View style={{width: dimension.width / 2}}>
          {User.map((v, i) => (
            <View>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  marginHorizontal: 10,
                  alignSelf: 'flex-end',
                }}
                // onPress={() => navigation.navigate('viewSelfMedia', { imgIndex: i })}
              >
                <Video
                  source={{uri: v.video}}
                  style={{
                    width: (dimension.width - 50) / 2,
                    height: 253,
                    borderRadius: 20,
                  }}
                  disableFocus
                  paused
                  controls
                  resizeMode="cover"
                  hideShutterView={true}
                />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={{
              marginTop: 20,
              marginHorizontal: 20,
              alignSelf: 'flex-end',
            }}
            onPress={() => navigation.navigate('playVideo', {data: uri.uri})}>
            <ImageBackground
              source={{uri: thumb}}
              style={{
                width: (dimension.width - 50) / 2,
                height: 253,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              resizeMode="cover"
              imageStyle={{borderRadius: 20}}>
              <Image
                source={require('../../../assets/icons/play_video.png')}
                style={{
                  height: 60,
                  width: 60,
                  resizeMode: 'contain',
                  position: 'absolute',
                }}
              />
            </ImageBackground>
          </TouchableOpacity>
        </View> */}
      </View>
      {/*   )} */}

      <Option
        refRBSheet={refRBSheet}
        onPress={() => {
          picCamera();
          refRBSheet.current.close();
        }}
        onPress1={() => {
          pickVideo();
          refRBSheet.current.close();
        }}
      />
    </ScrollView>
  );
};

const Option = ({refRBSheet, onPress, onPress1}) => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <BottomSheet refRBSheet={refRBSheet} height={200}>
      <TextFormatted
        style={{
          fontSize: 18,
          fontWeight: '500',
          color: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        Select an Option
      </TextFormatted>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 40,
        }}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../../../assets/icons/camera.png')}
            style={{height: 50, width: 50, resizeMode: 'contain'}}
          />
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              marginTop: 5,
            }}>
            Camera
          </TextFormatted>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress1}>
          <Image
            source={require('../../../assets/images/gallery.png')}
            style={{height: 50, width: 50, resizeMode: 'contain'}}
          />
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              marginTop: 5,
            }}>
            Gallery
          </TextFormatted>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};
export default Videos;

const styles = StyleSheet.create({});
