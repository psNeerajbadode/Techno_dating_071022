import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Video from 'react-native-video';
import { useRoute } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { theme } from '../../../utils/Constants';
import VideoPlayer from 'react-native-video-controls';
import { Slider } from '@miblanchard/react-native-slider';
import TextFormatted from '../../../components/TextFormatted';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { pureFinalPropsSelectorFactory } from 'react-redux/es/connect/selectorFactory';

const PlayVideo = ({ navigation }) => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const { params = {} } = useRoute();
  const [value, setValue] = useState(0.5555);
  const videoRef = useRef();
  const [push, setPuse] = useState();
  const [play, setPlay] = useState(false);
  const [show, setShow] = useState(false);
  const [judge, setJudge] = useState(false);

  // alert(push);

  // const togglePaused = () => setPuse(!push); // add this toggle function

  return (
    <View style={{ flex: 1, backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <VideoPlayer
          ref={videoRef}
          disableFullscreen={true}
          disableSeekbar={false}
          disableBack={true}
          disableVolume={true}
          tapAnywhereToPause={() => setPuse((v = !v))}
          // onPause={true}
          // onPlay={true}
          source={{ uri: params.data }}
          onShowControls={true}
          seekColor={'#F27380'}
        />

        {/* <Video
          source={{ uri: params.data }}
          style={{ height: '100%', width: '100%' }}
          resizeMode="cover"
          ref={videoRef}
          onPlaybackResume
          controls={true}
          //paused={true}
          onPictureInPictureStatusChanged={() => {
            <Image source={require('../../../assets/icons/Video_push_d.png')} resizeMode="contain" style={{ width: 104, height: 104 }} />;
          }}
        /> */}
        {/* {  <Image
          source={require('../../../assets/icons/play_video.png')}
          style={{ height: 104, width: 104, resizeMode: 'cover', position: 'absolute' }}
        />} */}
        {/* <View style={{ position: 'absolute', top: '45%' }}>
          <TouchableOpacity
            onPress={() => {
              setPuse(!push);
              if (push) {
                // videoRef.current.onPause({ paused: false });
                console.log(push);
              } else {
                console.log(push);
                // videoRef.current.onPause({ paused: true });
              }
              //videoRef.current.tapAnywhereToPause();
            }}
          >
            {push == true ? (
              <Image source={require('../../../assets/icons/Video_play_d.png')} resizeMode="contain" style={{ width: 104, height: 104 }} />
            ) : (
              <Image source={require('../../../assets/icons/Video_push_d.png')} resizeMode="contain" style={{ width: 104, height: 104 }} />
            )}
          </TouchableOpacity>
        </View> */}
      </View>

      {/* <View style={{ position: 'absolute', bottom: 10, width: '90%', alignSelf: 'center' }}>
        <TextFormatted style={{ fontSize: 12, fontWeight: '400', color: theme.colors.primary }}>0:11 / 0:43</TextFormatted>
        <Slider
          value={value}
          // step={1}
          onValueChange={setValue}
          // minimumValue={}
          containerStyle={{ height: 50 }}
          // maximumValue={videoRef.current.seek}
          trackStyle={{ height: 6, borderRadius: 10 }}
          minimumTrackTintColor={theme.colors.red}
          maximumTrackTintColor={'transparent'}
          renderThumbComponent={() => (
            <Image source={require('../../../assets/icons/sliderImage.png')} style={{ height: 34, width: 34, resizeMode: 'contain' }} />
          )}
        />
      </View> */}

      <View style={{ position: 'absolute', flexDirection: 'row', marginHorizontal: 20, marginTop: 50 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-start' }}>
          <Image
            source={ThemeMode.selectedTheme ? require('../../../assets/icons/back.png') : require('../../../assets/icons/back_dark.png')}
            style={{ height: 40, width: 40, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
          <Image
            source={ThemeMode.selectedTheme ? require('../../../assets/icons/menus.png') : require('../../../assets/icons/menù_dark.png')}
            style={{ height: 40, width: 40, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayVideo;

const styles = StyleSheet.create({});
