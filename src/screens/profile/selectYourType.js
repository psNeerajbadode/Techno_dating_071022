import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { theme } from '../../utils/Constants';
import HeaderImage_1 from '../../components/HeaderImage_1';
import Header from '../../components/Header';
import TextFormatted from '../../components/TextFormatted';
import { Slider } from '@miblanchard/react-native-slider';
import Button from '../../components/Button';
import ButtonView from '../../components/buttonView';
import BottomSheet from '../../components/bottomSheet';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { BluelightImage, GreenlightImage, PurplelightImage, RedlightImage, YellowlightImage } from '../../utils/CustomImages';

const SelectYourType = () => {
  const navigation = useNavigation();
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [showMe, setShowMe] = useState('woman');
  const [lookingfor, setLookingfor] = useState('Casual');
  const [heightMajor, setHeightMajor] = useState('cm');
  const [weightMajor, setWeightMajor] = useState('kg');
  const refRBSheet = useRef();
  const ThemeMode = useSelector(state => state.Theme);

  const data = [
    { name: 'Casual', img: require('../../assets/icons/chattype1.png') },
    { name: 'Long term', img: require('../../assets/icons/relationshiptype1.png') },
    { name: 'Friends', img: require('../../assets/icons/typeD.png') },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack }}>
      <HeaderImage_1 height={155}>
        <Header
          marginTop={20}
          title={'Select your type'}
          right={
            <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={() => refRBSheet.current.open()}>
              <Image
                source={ThemeMode.selectedTheme ? require('../../assets/icons/Settings.png') : require('../../assets/icons/Settings_dark.png')}
                style={{ height: 40, width: 40, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          }
        />
      </HeaderImage_1>

      <ScrollView showsVerticalScrollIndicator={false}>
        <SliderView header={'Max age'} min={'18'} max={'40+'} value={age} onValueChange={setAge} val={(age * (50 - 18)).toFixed('0')} />
        <SliderView
          header={'Max height'}
          min={'-150' + heightMajor}
          max={'+200' + heightMajor}
          value={height}
          onValueChange={setHeight}
          val={(height * (200 - 150) + 150).toFixed('0')}
        />
        <SliderView
          header={'Max weight'}
          min={'40' + weightMajor}
          max={'+100' + weightMajor}
          value={weight}
          onValueChange={setWeight}
          val={(weight * (100 - 40) + 40).toFixed('0')}
        />
        <View style={{ marginLeft: 20, marginTop: 30 }}>
          <TextFormatted
            style={{ fontSize: 14, fontWeight: '600', color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary, flex: 1 }}
          >
            Show me
          </TextFormatted>
          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
            <TouchableOpacity onPress={() => setShowMe('man')}>
              <Image
                source={showMe == 'man' ? require('../../assets/icons/man_1.png') : require('../../assets/icons/man.png')}
                style={{ height: 110, width: 110, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
            <View style={{ width: 24 }} />
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => setShowMe('woman')}>
              <Image
                source={showMe == 'woman' ? require('../../assets/icons/woman_1.png') : require('../../assets/icons/woman.png')}
                style={{ height: 110, width: 110, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
              flex: 1,
              marginLeft: 20,
            }}
          >
            Looking For
          </TextFormatted>
          <FlatList
            data={data}
            horizontal
            contentContainerStyle={{ paddingLeft: 20 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ alignItems: 'center', marginRight: 20, marginVertical: 10 }}>
                <TouchableOpacity
                  onPress={() => setLookingfor(item.name)}
                  style={{
                    height: 158,
                    width: 134,
                    backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack,
                    borderRadius: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                    marginVertical: 13,
                  }}
                >
                  <Image source={item.img} style={{ height: 76, width: 76, resizeMode: 'contain' }} />
                  <TextFormatted
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
                      marginTop: 18,
                    }}
                  >
                    {item.name}
                  </TextFormatted>
                </TouchableOpacity>
                <Image
                  source={
                    item.name == lookingfor
                      ? ThemeMode.themecolr == 'Red'
                        ? RedlightImage.check_red
                        : ThemeMode.themecolr == 'Blue'
                        ? BluelightImage.check_blue
                        : ThemeMode.themecolr == 'Green'
                        ? GreenlightImage.check_green
                        : ThemeMode.themecolr == 'Purple'
                        ? PurplelightImage.check_purple
                        : ThemeMode.themecolr == 'Yellow'
                        ? YellowlightImage.check_yellow
                        : ReddarkImage.check_red
                      : require('../../assets/icons/check.png')
                  }
                  style={{ height: 28, width: 28, resizeMode: 'contain', bottom: 0 }}
                />
              </View>
            )}
          />
        </View>
        <BottomSheet refRBSheet={refRBSheet} height={370}>
          <Setting
            heightMajor={heightMajor}
            setHeightMajor={setHeightMajor}
            weightMajor={weightMajor}
            setWeightMajor={setWeightMajor}
            refRBSheet={refRBSheet}
          />
        </BottomSheet>
      </ScrollView>
      <ButtonView>
        <Button marginTop={1} buttonName={'Save'} color={theme.colors.primary} onPress={() => navigation.replace('myProfile')} />
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
        // step={1}
        onValueChange={onValueChange}
        // minimumValue={}
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
        <TextFormatted style={{ fontSize: 12, fontWeight: '400', color: '#8490AE' }}>{min}</TextFormatted>
        <TextFormatted style={{ fontSize: 12, fontWeight: '400', color: '#8490AE' }}>{max}</TextFormatted>
      </View>
    </View>
  );
};
const Setting = ({ heightMajor, setHeightMajor, weightMajor, setWeightMajor, refRBSheet }) => {
  const ThemeMode = useSelector(state => state.Theme);
  const dimension = useWindowDimensions();
  const [height1, setHeight1] = useState(heightMajor);
  const [weight1, setWeight1] = useState(weightMajor);

  return (
    <View>
      <ScrollView>
        <TextFormatted
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
            marginHorizontal: 20,
            marginTop: 10,
            marginBottom: 0,
          }}
        >
          Select your type
        </TextFormatted>

        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
            marginLeft: 40,
            marginTop: 20,
          }}
        >
          Height
        </TextFormatted>
        <Dropdown
          style={[styles.dropdown, { backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack }]}
          dropdownPosition="auto"
          containerStyle={{ borderRadius: 20, overflow: 'hidden' }}
          placeholderStyle={{ ...styles.placeholderStyle, color: theme.colors.primaryBlack }}
          selectedTextStyle={{ ...styles.selectedTextStyle, color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary }}
          data={[
            { label: 'Centimeters', value: 'cm' },
            { label: 'Meter', value: 'Meter' },
            { label: 'Feet', value: 'Feet' },
          ]}
          maxHeight={160}
          labelField="label"
          valueField="value"
          // placeholder={'Choose Gender'}
          value={height1}
          onChange={item => setHeight1(item.value)}
          renderRightIcon={() => <Icon name="chevron-small-down" color={theme.colors.primaryBlack} size={20} />}
        />
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
            marginLeft: 40,
            marginTop: 25,
          }}
        >
          Weight
        </TextFormatted>
        <Dropdown
          style={[styles.dropdown, { backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack }]}
          dropdownPosition="auto"
          containerStyle={{ borderRadius: 20, overflow: 'hidden' }}
          placeholderStyle={{ ...styles.placeholderStyle, color: theme.colors.primaryBlack }}
          selectedTextStyle={{ ...styles.selectedTextStyle, color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary }}
          data={[
            { label: 'Kilograms', value: 'kg' },
            { label: 'pounds', value: 'pounds' },
          ]}
          maxHeight={100}
          labelField="label"
          valueField="value"
          // placeholder={'Choose Gender'}
          value={weight1}
          onChange={item => setWeight1(item.value)}
          renderRightIcon={() => <Icon name="chevron-small-down" color={theme.colors.primaryBlack} size={20} />}
          // renderLeftIcon={() => <Image source={require('../../Assets/Icons/Gender.png')} style={{ height: 18, width: 18, resizeMode: 'contain' }} />}
        />
        <View style={{ height: 25 }} />
      </ScrollView>
      <ButtonView>
        <TextFormatted
          style={{ fontSize: 18, fontWeight: '700', color: '#8490AE', width: dimension.width / 2 - 20, textAlign: 'center' }}
          onPress={() => refRBSheet.current.close()}
        >
          Cancel
        </TextFormatted>
        <Button
          buttonName={'Select'}
          color={'#fff'}
          marginTop={1}
          marginBottom={1}
          width={dimension.width / 2 - 20}
          onPress={() => {
            refRBSheet.current.close();
            setHeightMajor(height1);
            setWeightMajor(weight1);
          }}
        />
      </ButtonView>
    </View>
  );
};
export default SelectYourType;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  placeholderStyle: { fontSize: 14, fontFamily: 'Rubik-Regular', paddingLeft: 10 },
  selectedTextStyle: { fontSize: 14, fontFamily: 'Rubik-Regular', paddingLeft: 10 },
});
