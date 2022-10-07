import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { theme } from '../../utils/Constants';
import Header from '../../components/Header';
import HeaderImage_1 from '../../components/HeaderImage_1';
import Dropdown1 from '../../components/dropdown1';
import ButtonView from '../../components/buttonView';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import TextFormatted from '../../components/TextFormatted';
import { Slider } from '@miblanchard/react-native-slider';
import { BluelightImage, GreenlightImage, PurplelightImage, RedlightImage, YellowlightImage } from '../../utils/CustomImages';

const FilterLocation = () => {
  const ThemeMode = useSelector(state => state.Theme);
  const [country, setCountry] = useState('1');
  const [Kmmajor, setKmmajor] = useState('km');
  const [setkm, setSetkm] = useState();

  return (
    <View style={{ flex: 1, backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack }}>
      <HeaderImage_1 height={155}>
        <Header marginTop={20} title={'Filter location'} />
      </HeaderImage_1>
      <ScrollView>
        <Dropdown1
          title={'Filter by country'}
          data={[{ label: 'Italy', value: '1' }]}
          value={country}
          onChange={item => setCountry(item.value)}
          height={100}
        />
        <Dropdown1
          title={'Filter by city'}
          data={[{ label: 'Rome', value: '1' }]}
          value={country}
          onChange={item => setCountry(item.value)}
          height={100}
          renderRightIcon={<Image source={require('../../assets/icons/user_outline.png')} style={{ height: 24, width: 24, resizeMode: 'contain' }} />}
        />
        <Dropdown1
          title={'Select unit of measure'}
          data={[{ label: 'Km', value: '1' }]}
          value={country}
          onChange={item => setCountry(item.value)}
          height={100}
        />
        <View style={{ height: 20 }} />
        <SliderView header={'Max distance'} min={0} max={50} value={setkm} onValueChange={setSetkm} val={parseInt(setkm).toFixed(0)} />
      </ScrollView>
      <ButtonView>
        <Button buttonName={'Save'} marginTop={1} color={theme.colors.primary} />
      </ButtonView>
    </View>
  );
};

const SliderView = ({ header, min, max, value, onValueChange, val }) => {
  const ThemeMode = useSelector(state => state.Theme);
  const colorMode =
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
      : theme.colors.red;
  return (
    <View style={{ marginHorizontal: 20, marginTop: 30 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextFormatted
          style={{ fontSize: 14, fontWeight: '600', color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary, flex: 1 }}
        >
          {header}
        </TextFormatted>
        <TextFormatted style={{ fontSize: 14, fontWeight: '600', color: colorMode }}>{val}</TextFormatted>
      </View>
      <Slider
        value={value}
        onValueChange={onValueChange}
        minimumValue={min}
        maximumValue={max}
        containerStyle={{ height: 50 }}
        trackStyle={{ height: 6, borderRadius: 10 }}
        minimumTrackTintColor={colorMode}
        maximumTrackTintColor={'#FAFAFA'}
        renderThumbComponent={() => (
          <Image
            source={
              ThemeMode.themecolr == 'Red'
                ? RedlightImage.sliderImager
                : ThemeMode.themecolr == 'Blue'
                ? BluelightImage.sliderImage_bluer
                : ThemeMode.themecolr == 'Green'
                ? GreenlightImage.sliderImage_green
                : ThemeMode.themecolr == 'Purple'
                ? PurplelightImage.sliderImage_purple
                : ThemeMode.themecolr == 'Yellow'
                ? YellowlightImage.sliderImage_yellow
                : RedlightImage.sliderImager
            }
            style={{ height: 34, width: 34, resizeMode: 'contain' }}
          />
        )}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextFormatted style={{ fontSize: 12, fontWeight: '400', color: '#8490AE' }}>+{min}</TextFormatted>
        <TextFormatted style={{ fontSize: 12, fontWeight: '400', color: '#8490AE' }}>+{max}</TextFormatted>
      </View>
    </View>
  );
};
export default FilterLocation;

const styles = StyleSheet.create({});
