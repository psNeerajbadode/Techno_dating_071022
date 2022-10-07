import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import Swiper from 'react-native-swiper';
import Header from '../../components/Header';
import Feather from 'react-native-vector-icons/Feather';
import {theme} from '../../utils/Constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import TextFormatted from '../../components/TextFormatted';
import LinearGradient from 'react-native-linear-gradient';
import MoreOptions from '../home/moreOptions';
import {useDispatch, useSelector} from 'react-redux';

const ViewSelfMedia = () => {
  const navigation = useNavigation();
  const {params = {}} = useRoute();
  const ThemeMode = useSelector(state => state.Theme);
  const photos = [
    {img: require('../../assets/images/unsplash_1.png')},
    {img: require('../../assets/images/unsplash_2.png')},
    {img: require('../../assets/images/unsplash_3.png')},
    {img: require('../../assets/images/unsplash_4.png')},
    {img: require('../../assets/images/unsplash_5.png')},
    {img: require('../../assets/images/unsplash_6.png')},
  ];
  console.log('User', params.imgIndex);
  const refRBSheet = useRef();

  return (
    <View style={{flex: 1}}>
      <Swiper
        loop={false}
        style={styles.wrapper}
        index={params.imgIndex}
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
        {params.User?.map((it, i) => (
          /* params?.imgIndex == i && */ <Image
            source={{uri: it.image}}
            resizeMode="cover"
            style={{height: '100%', width: '100%'}}
          />
        ))}
      </Swiper>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 50,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{alignSelf: 'flex-start'}}>
          <Image
            source={
              ThemeMode.selectedTheme
                ? require('../../assets/icons/back.png')
                : require('../../assets/icons/back_dark.png')
            }
            style={{height: 40, width: 40, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <View>
          {ThemeMode.selectedTheme ? (
            <Feather
              // onPress={() => refRBSheet.current.open()}
              name="download"
              size={16}
              color={theme.colors.primary}
              style={{
                height: 40,
                width: 40,
                backgroundColor: '#FFFFFF33',
                textAlign: 'center',
                textAlignVertical: 'center',
                borderRadius: 10,
                alignSelf: 'flex-end',
              }}
            />
          ) : (
            <TouchableOpacity style={{alignSelf: 'flex-start'}}>
              <Image
                source={require('../../assets/icons/download_dark.png')}
                style={{height: 40, width: 40, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ViewSelfMedia;

const styles = StyleSheet.create({
  linear: {
    height: 50,
    width: 50,
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
