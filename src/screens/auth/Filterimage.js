import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Brightness, Contrast, Saturate } from 'react-native-color-matrix-image-filters';
import { Slider } from '@miblanchard/react-native-slider';
import { theme } from '../../utils/Constants';
import TextFormatted from '../../components/TextFormatted';

const Filterimage = () => {
  const [brightness, setBrightness] = useState(1);
  const [saturate, setSaturate] = useState(1);
  const [contrast, setContrast] = useState(1);
  //   const [bight, setBight] = useState();//
  const bight = parseFloat(brightness);
  const Satr = parseFloat(saturate);
  const contra = parseFloat(contrast);

  console.log(bight);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
        <Brightness amount={bight}>
          <Image
            resizeMode="cover"
            source={require('../../assets/images/image.png')}
            style={{ alignSelf: 'center', width: 200, height: 200, marginVertical: 20 }}
          />
        </Brightness>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextFormatted style={{ fontSize: 14, fontWeight: '600', color: theme.colors.Black }}>Brightness</TextFormatted>
          <TextFormatted style={{ color: theme.colors.red, fontSize: 14, fontWeight: '600' }}>+{parseFloat(brightness).toFixed(0)}</TextFormatted>
        </View>

        <Slider
          value={bight}
          // step={1}
          onValueChange={v => setBrightness(v)}
          // minimumValue={}
          minimumValue={0}
          maximumValue={10}
          containerStyle={{ height: 50 }}
          trackStyle={{ height: 6, borderRadius: 10 }}
          minimumTrackTintColor={theme.colors.red}
          maximumTrackTintColor={'#FAFAFA'}
          renderThumbComponent={() => (
            <Image source={require('../../assets/icons/sliderImage.png')} style={{ height: 34, width: 34, resizeMode: 'contain' }} />
          )}
        />
      </View>
      <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
        <Contrast amount={contra}>
          <Image
            resizeMode="cover"
            source={require('../../assets/images/image.png')}
            style={{ alignSelf: 'center', width: 200, height: 200, marginVertical: 20 }}
          />
        </Contrast>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextFormatted style={{ fontSize: 14, fontWeight: '600', color: theme.colors.Black }}>Contrast</TextFormatted>
          <TextFormatted style={{ color: theme.colors.red, fontSize: 14, fontWeight: '600' }}>+{parseFloat(contrast).toFixed(0)}</TextFormatted>
        </View>
        <Slider
          value={contra}
          // step={1}
          onValueChange={v => setContrast(v)}
          // minimumValue={}
          minimumValue={0}
          maximumValue={10}
          containerStyle={{ height: 50 }}
          trackStyle={{ height: 6, borderRadius: 10 }}
          minimumTrackTintColor={theme.colors.red}
          maximumTrackTintColor={'#FAFAFA'}
          renderThumbComponent={() => (
            <Image source={require('../../assets/icons/sliderImage.png')} style={{ height: 34, width: 34, resizeMode: 'contain' }} />
          )}
        />
      </View>

      <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
        <Saturate amount={Satr}>
          <Image
            resizeMode="cover"
            source={require('../../assets/images/image.png')}
            style={{ alignSelf: 'center', width: 200, height: 200, marginVertical: 20 }}
          />
        </Saturate>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextFormatted style={{ fontSize: 14, fontWeight: '600', color: theme.colors.Black }}>Saturation</TextFormatted>
          <TextFormatted style={{ color: theme.colors.red, fontSize: 14, fontWeight: '600' }}>+{parseFloat(saturate).toFixed(0)}</TextFormatted>
        </View>
        <Slider
          value={Satr}
          // step={1}
          onValueChange={v => setSaturate(v)}
          // minimumValue={}
          minimumValue={0}
          maximumValue={10}
          containerStyle={{ height: 50 }}
          trackStyle={{ height: 6, borderRadius: 10 }}
          minimumTrackTintColor={theme.colors.red}
          maximumTrackTintColor={'#FAFAFA'}
          renderThumbComponent={() => (
            <Image source={require('../../assets/icons/sliderImage.png')} style={{ height: 34, width: 34, resizeMode: 'contain' }} />
          )}
        />
      </View>
      <Brightness amount={bight}>
        <Contrast amount={contra}>
          <Saturate amount={Satr}>
            <Image
              resizeMode="cover"
              source={require('../../assets/images/image.png')}
              style={{ alignSelf: 'center', width: 200, height: 200, marginVertical: 20 }}
            />
          </Saturate>
        </Contrast>
      </Brightness>
    </ScrollView>
  );
};

export default Filterimage;

const styles = StyleSheet.create({});
