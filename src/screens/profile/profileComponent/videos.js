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
import TextFormatted from '../../../components/TextFormatted';
import {theme} from '../../../utils/Constants';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import BottomSheet from '../../../components/bottomSheet';
import {createThumbnail} from 'react-native-create-thumbnail';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import ActivityLoader from '../../../components/ActivityLoader';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../../utils/CustomImages';

const Videos = () => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const navigation = useNavigation();
  const dimension = useWindowDimensions();
  const [uri, setUri] = useState();
  const [thumb, setThumb] = useState();
  const [User, setUser] = useState();
  const [Loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const refRBSheet = useRef();
  const videoData = [
    {vid: require('../../../assets/images/big_buck_bunny_720p_1mb.mp4')},
  ];
  const pickVideo = () => {
    launchImageLibrary({mediaType: 'video', videoQuality: 'high'}, response => {
      if (!response.didCancel) {
        setUri(response.assets[0]);
      }
    });
  };
  const picCamera = () => {
    launchCamera({mediaType: 'video', videoQuality: 'high'}, response => {
      if (!response.didCancel) {
        setUri(response.assets[0]);
      }
    });
  };

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

  function generateThumbnail() {
    try {
      const response = createThumbnail({
        url: 'https://technorizen.com/Dating/uploads/images/Video_20221029054356.video:1579558',
      });
      console.log('response');
      setThumb(response.path);
    } catch (err) {
      console.error(err);
    } finally {
    }
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }

  useEffect(() => {
    getUserData();
    generateThumbnail();
  }, []);

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
            onPress={
              () => {
                generateThumbnail();
              } /*  refRBSheet.current.open() */
            }
            style={{
              width: (dimension.width - 50) / 2,
              height: (dimension.width - 50) / 2,
              backgroundColor: ThemeMode.selectedTheme
                ? theme.colors.primary
                : theme.colors.primaryBlack,
              alignSelf: 'center',
              borderRadius: 20,
              shadowColor: '#8490ae85',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <ImageBackground
              source={require('../../../assets/icons/youtube.png')}
              style={{height: 60, width: 60}}
              resizeMode="contain">
              <Image
                source={
                  ThemeMode.themecolr == 'Red'
                    ? RedlightImage.plusicon
                    : ThemeMode.themecolr == 'Blue'
                    ? BluelightImage.plusiconblue
                    : ThemeMode.themecolr == 'Green'
                    ? GreenlightImage.plusicongreen
                    : ThemeMode.themecolr == 'Purple'
                    ? PurplelightImage.plusiconpurple
                    : ThemeMode.themecolr == 'Yellow'
                    ? YellowlightImage.plusiconyellow
                    : RedlightImage.plusicon
                }
                style={{
                  height: 29,
                  width: 29,
                  resizeMode: 'contain',
                  position: 'absolute',
                  zIndex: 1,
                  top: '-25%',
                  right: '-20%',
                }}
                resizeMode="contain"
              />
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
        <View style={{width: dimension.width / 2}}>
          <TouchableOpacity
            style={{
              marginTop: 20,
              marginHorizontal: 20,
              alignSelf: 'flex-end',
            }}
            onPress={() => navigation.navigate('playVideo', {data: User})}>
            <ImageBackground
              source={{uri: thumb}}
              style={{
                width: (dimension.width - 50) / 2,
                height: 253,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f00',
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
        </View>
      </View>

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
