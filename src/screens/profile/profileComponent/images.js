import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TextFormatted from '../../../components/TextFormatted';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from '../../../components/bottomSheet';
import {theme} from '../../../utils/Constants';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {Use} from 'react-native-svg';
import ActivityLoader from '../../../components/ActivityLoader';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../../utils/CustomImages';

const Images = () => {
  const navigation = useNavigation();
  const dimension = useWindowDimensions();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [User, setUser] = useState();
  const [Loading, setLoading] = useState(false);
  const photos = [
    {img: require('../../../assets/images/unsplash_1.png')},
    {img: require('../../../assets/images/unsplash_2.png')},
    {img: require('../../../assets/images/unsplash_3.png')},
    {img: require('../../../assets/images/unsplash_4.png')},
    {img: require('../../../assets/images/unsplash_5.png')},
    {img: require('../../../assets/images/unsplash_6.png')},
  ];
  const [uri, setUri] = useState('');
  const refRBSheet = useRef();
  const pickImage = () => {
    launchImageLibrary({quality: 0.9}, response => {
      if (!response.didCancel) setUri(response.assets[0]);
    });
  };
  const picCamera = () => {
    launchCamera({}, response => {
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
        'type=Image',
    }).then(response => {
      setLoading(false);
      setUser(response.data.result);
    });
  };
  useEffect(() => {
    getUserData();
  }, []);
  console.log('User Img =>', User);
  return (
    <View>
      {Loading ? (
        <View style={{marginTop: dimension.width * 0.15}}>
          <ActivityLoader />
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              backgroundColor: ThemeMode.selectedTheme
                ? theme.colors.primary
                : theme.colors.primaryBlack,
            }}>
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
                      position: 'absolute',
                      zIndex: 1,
                      top: '15%',
                      right: '22%',
                      height: 29,
                      width: 29,
                    }}
                  />
                  <Image
                    source={require('../../../assets/icons/add_media.png')}
                    style={{width: '50%', height: '50%', resizeMode: 'contain'}}
                  />

                  <TextFormatted
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                      fontWeight: '600',
                      color: ThemeMode.selectedTheme
                        ? theme.colors.primaryBlack
                        : theme.colors.primary,
                    }}>
                    Add image
                  </TextFormatted>
                </TouchableOpacity>

                {User?.map((v, i) => (
                  <View>
                    {i == 0 && (
                      <TouchableOpacity
                        style={{
                          marginTop: 20,
                          marginHorizontal: 10,
                          alignSelf: 'flex-end',
                        }}
                        onPress={() =>
                          navigation.navigate('viewSelfMedia', {
                            imgIndex: i,
                            User: User,
                            Signup_User: null,
                          })
                        }>
                        <Image
                          source={{uri: v.image}}
                          style={{
                            width: (dimension.width - 50) / 2,
                            height: 253,
                            resizeMode: 'contain',
                            borderRadius: 20,
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
              <View style={{width: dimension.width / 2}}>
                {User?.map(
                  (v, i) =>
                    i == 1 && (
                      <TouchableOpacity
                        style={{marginTop: 20, marginHorizontal: 10}}
                        onPress={() =>
                          navigation.navigate('viewSelfMedia', {
                            imgIndex: i,
                            User: User,
                            Signup_User: null,
                          })
                        }>
                        <Image
                          source={{uri: v.image}}
                          style={{
                            width: (dimension.width - 50) / 2,
                            height: 281,
                            resizeMode: 'cover',
                            borderRadius: 20,
                          }}
                        />
                      </TouchableOpacity>
                    ),
                )}

                {User?.map(
                  (v, i) =>
                    i == 2 && (
                      <TouchableOpacity
                        style={{marginTop: 20, marginHorizontal: 10}}
                        onPress={() =>
                          navigation.navigate('viewSelfMedia', {
                            imgIndex: i,
                            User: User,
                            Signup_User: null,
                          })
                        }>
                        <Image
                          source={{uri: v.image}}
                          style={{
                            width: (dimension.width - 50) / 2,
                            height: 130,
                            resizeMode: 'cover',
                            borderRadius: 20,
                          }}
                        />
                      </TouchableOpacity>
                    ),
                )}
              </View>
            </View>
          </View>
          {/* {User?.map(
            (v, i) =>
              (i != 2 && i != 5) || (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('viewSelfMedia', {
                      imgIndex: i,
                      User: User,
                    })
                  }
                  style={{alignSelf: 'center', marginTop: 20}}>
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
          )} */}
        </View>
      )}
      <Option
        refRBSheet={refRBSheet}
        onPress={() => {
          picCamera();
          refRBSheet.current.close();
        }}
        onPress1={() => {
          pickImage();
          refRBSheet.current.close();
        }}
      />
    </View>
  );
};

const Option = ({refRBSheet, onPress, onPress1}) => {
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

export default Images;

const styles = StyleSheet.create({});
