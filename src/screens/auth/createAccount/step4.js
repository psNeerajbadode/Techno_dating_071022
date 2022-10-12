import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HeaderImage_1 from '../../../components/HeaderImage_1';
import Pagination from '../../../components/Pagination';
import ButtonView from '../../../components/buttonView';
import Button from '../../../components/Button';
import {theme} from '../../../utils/Constants';
import TextFormatted from '../../../components/TextFormatted';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker';
import {createThumbnail} from 'react-native-create-thumbnail';
import {useDispatch, useSelector} from 'react-redux';
import {STAP} from '../../../redux/actions/ActionType';
import axios from 'axios';
import {ShowToast} from '../../../utils/Baseurl';

const Step4 = ({navigation}) => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  console.log('Staps4', Staps);
  const dimension = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState([]);
  const [vid, setVid] = useState(false);
  const [thumb, setThumb] = useState();

  const images = media.filter(v => v.type != 'video/mp4');
  const video = media.filter(v => v.type == 'video/mp4');
  console.log(video);
  const selectImage = async () => {
    await ImagePicker.launchImageLibrary(
      {
        mediaType: 'mixed',
        videoQuality: 'high',
        selectionLimit: 5,
        quality: 1,
      },
      response => {
        if (!response.didCancel) {
          if (
            media
              .concat(...response.assets)
              .filter(v => v.type.includes('video')).length < 2 &&
            media
              .concat(...response.assets)
              .filter(v => !v.type.includes('video')).length < 6
          ) {
            setMedia(media.concat(...response.assets));
          } else {
            ShowToast(
              ' Upload at least 2 media to proceed and a maximum of 5 photo and 1 video',
            );
          }
        }
      },
    );
  };

  async function generateThumbnail() {
    try {
      const response = await createThumbnail({
        url: video[0].uri,
      });
      setThumb(response.path);
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  const ImageApi = () => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append('user_id', Staps.id);
      images.forEach(Val => {
        body.append('image[]', {
          uri: Val.uri,
          type: Val.type,
          name: Val.fileName,
        });
      });

      axios({
        url: 'https://technorizen.com/Dating/webservice/signup5',
        method: 'POST',
        data: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('image Api', response.data);
          if (response.data.status == 1) {
            setLoading(false);
            dispatch({type: STAP, payload: response.data.result});
            navigation.navigate('step5');
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

  const VideoApi = () => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append('user_id', Staps.id);
      body.append('image', video[0].uri);
      axios({
        url: 'https://technorizen.com/Dating/webservice/signup6',
        method: 'POST',
        data: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('Video Api', response.data);
          if (response.data.status == 1) {
            setLoading(false);
            dispatch({type: STAP, payload: response.data.result});
            navigation.navigate('step5');
            console.log(response.data);
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
      <HeaderImage_1 height={170} marginBottom={1}>
        <Pagination
          title={'Create account'}
          subTitle={'Add media'}
          position={4}
        />
      </HeaderImage_1>

      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Icon
            name="alert-circle"
            size={30}
            color={'#8490AE'}
            style={{transform: [{rotate: '180deg'}]}}
          />
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#8490AE',
              flex: 1,
              marginLeft: 10,
              marginTop: 10,
            }}>
            Upload at least 2 media to proceed and a maximum of 5 photo and 1
            video
          </TextFormatted>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View style={{width: '50%', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => selectImage()}
              style={{
                width: (dimension.width - 60) / 2,
                height: 158,
                backgroundColor: ThemeMode.selectedTheme
                  ? theme.colors.primary
                  : theme.colors.primaryBlack,
                borderRadius: 40,
                shadowColor: '#8490ae85',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <AntDesign
                name="pluscircle"
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
                size={25}
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  top: '15%',
                  right: '22%',
                }}
              />
              <Image
                source={require('../../../assets/icons/add_media.png')}
                style={{width: '50%', height: '50%', resizeMode: 'contain'}}
              />

              <TextFormatted
                style={{
                  fontSize: 12,
                  color: ThemeMode.selectedTheme
                    ? theme.colors.primaryBlack
                    : theme.colors.primary,
                  fontWeight: '600',
                  marginTop: 10,
                }}>
                Add media
              </TextFormatted>
            </TouchableOpacity>
            {setVid ? (
              <View>
                {media?.map(
                  (it, i) =>
                    i == 1 && (
                      <Image
                        source={{uri: it.uri}}
                        style={{
                          width: (dimension.width - 60) / 2,
                          height: 261,
                          resizeMode: 'cover',
                          borderRadius: 20,
                          marginTop: 10,
                        }}
                      />
                    ),
                )}
              </View>
            ) : (
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
            )}
          </View>
          <View style={{width: '50%', alignItems: 'center'}}>
            {media?.map((it, i) =>
              i == 0 || i == 2 ? (
                <Image
                  source={{uri: it.uri}}
                  style={{
                    width: (dimension.width - 60) / 2,
                    height: i == 0 ? 281 : 130,
                    resizeMode: 'cover',
                    borderRadius: 20,
                    marginTop: 20,
                  }}
                />
              ) : (
                <View />
              ),
            )}
          </View>
        </View>
        {media?.map((it, i) =>
          i == 3 || i == 4 ? (
            <Image
              source={{uri: it.uri}}
              style={{
                width: dimension.width - 40,
                height: 223,
                resizeMode: 'cover',
                borderRadius: 20,
                marginTop: 20,
                alignSelf: 'center',
              }}
            />
          ) : (
            <View />
          ),
        )}
      </ScrollView>
      <ButtonView>
        <Button
          opacity={media?.length >= 2 && media?.length <= 6 ? 1 : 0.5}
          buttonName={'Next'}
          marginTop={1}
          Loading={loading}
          disabled={media?.length >= 2 && media?.length <= 6 ? false : true}
          color={'#fff'}
          onPress={
            () => {
              ImageApi();
              VideoApi();
            } /* navigation.navigate('step5') */
          }
        />
      </ButtonView>
    </View>
  );
};

export default Step4;

const styles = StyleSheet.create({});
