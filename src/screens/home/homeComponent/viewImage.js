import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Swiper from 'react-native-swiper';
import Header from '../../../components/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import { theme } from '../../../utils/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import TextFormatted from '../../../components/TextFormatted';
import LinearGradient from 'react-native-linear-gradient';
import MoreOptions from '../moreOptions';
import { useDispatch, useSelector } from 'react-redux';

const ViewImage = () => {
  const navigation = useNavigation();
  const { params = {} } = useRoute();
  const [judge, setJudge] = useState(false);
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const photos = [
    { img: require('../../../assets/images/unsplash_1.png') },
    { img: require('../../../assets/images/unsplash_2.png') },
    { img: require('../../../assets/images/unsplash_3.png') },
    { img: require('../../../assets/images/unsplash_4.png') },
    { img: require('../../../assets/images/unsplash_5.png') },
    { img: require('../../../assets/images/unsplash_6.png') },
  ];
  const refRBSheet = useRef();
  return (
    <View style={{ flex: 1 }}>
      <Swiper
        loop={false}
        style={styles.wrapper}
        index={params.imgIndex}
        showsButtons={true}
        showsPagination={false}
        buttonWrapperStyle={{ paddingHorizontal: 0 }}
        nextButton={
          <Image
            source={ThemeMode.selectedTheme ? require('../../../assets/icons/P_sidebar.png') : require('../../../assets/icons/next_dark.png')}
            style={{ height: 145, width: 25, resizeMode: 'contain' }}
          />
        }
        prevButton={
          <Image
            source={ThemeMode.selectedTheme ? require('../../../assets/icons/N_sidebar.png') : require('../../../assets/icons/prev_dark.png')}
            style={{ height: 145, width: 25, resizeMode: 'contain' }}
          />
        }
      >
        {photos?.map((it, i) => (
          <Image source={it.img} resizeMode="cover" style={{ height: '100%', width: '100%' }} />
        ))}
      </Swiper>
      <View style={{ position: 'absolute', flexDirection: 'row', marginHorizontal: 20, marginTop: 50 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-start' }}>
          <Image
            source={ThemeMode.selectedTheme ? require('../../../assets/icons/back.png') : require('../../../assets/icons/back_dark.png')}
            style={{ height: 40, width: 40, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <View>
          <Entypo
            onPress={() => refRBSheet.current.open()}
            name="dots-three-vertical"
            size={16}
            color={theme.colors.primary}
            style={{
              height: 40,
              width: 40,
              backgroundColor: ThemeMode.selectedTheme ? '#FFFFFF33' : '#1A1D2533',
              textAlign: 'center',
              textAlignVertical: 'center',
              borderRadius: 10,
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </View>
      {/* <View
        style={{
          height: 80,
          width: '100%',
          backgroundColor: ThemeMode.selectedTheme ? '#fcfcfc' : '#1A1D25D9',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          // paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,

          elevation: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
        }}
      > */}
      {/* <View style={{ marginLeft: 20 }}> */}
      {/* <TextFormatted style={{ fontSize: 14, fontWeight: '600', color: theme.colors.primaryBlack }}>Add your judgment</TextFormatted> */}
      {/* <TextFormatted style={{ fontSize: 14, fontWeight: '400', color: theme.colors.placeholder }}>85% compatibility</TextFormatted> */}
      {/* </View> */}
      {/* <View style={{ flexDirection: 'row' }}> */}
      {/* <TouchableOpacity
          style={{ marginRight: 12 }}
          onPress={() => {
            setJudge(!judge);
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linear}
            colors={
              ThemeMode.selectedTheme ? (judge ? ['#F4D968', '#E5AE6F'] : ['#fff', '#fff']) : judge ? ['#F4D968', '#E5AE6F'] : ['#1A1D25', '#1A1D25']
            }
          >
            <Image
              source={require('../../../assets/home_icons/flower.png')}
              style={{ height: 32, width: 32, resizeMode: 'contain', tintColor: judge ? '#fff' : '#8490AE' }}
            />
          </LinearGradient>
        </TouchableOpacity> */}

      {/* <TouchableOpacity
            style={{ marginRight: 12 }}
            onPress={() => {
              refRBSheet.current.open();
              setLike(true);
            }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.linear}
              colors={true ? ['#6ED79E', '#43B678', '#6CEB97'] : ['#fff', '#fff']}
            >
              <Image
                source={require('../../../assets/home_icons/like.png')}
                style={{ height: 26, width: 26, resizeMode: 'contain', tintColor: true ? '#fff' : '#8490AE' }}
              />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bg}>
            <Image
              source={require('../../../assets/home_icons/dislike.png')}
              style={{ height: 26, width: 26, resizeMode: 'contain', tintColor: '#8490AE' }}
            />
          </TouchableOpacity> */}
      {/* </View> */}
      {/* </View> */}
      <MoreOptions refRBSheet={refRBSheet} />
    </View>
  );
};

export default ViewImage;

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
    height: 64,
    width: 64,
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
