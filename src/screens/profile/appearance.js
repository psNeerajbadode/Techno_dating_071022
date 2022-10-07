import { Image, ScrollView, StyleSheet, TouchableOpacity, View, useWindowDimensions, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import HeaderImage_1 from '../../components/HeaderImage_1';
import TextFormatted from '../../components/TextFormatted';
import { Divider } from 'react-native-paper';
import ButtonView from '../../components/buttonView';
import { theme } from '../../utils/Constants';
import { THEMEMODE } from '../../redux/actions/ActionType';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import { BluelightImage, GreenlightImage, PurplelightImage, ReddarkImage, RedlightImage, YellowlightImage } from '../../utils/CustomImages';
import LinearGradient from 'react-native-linear-gradient';
import Statusbar from '../../components/Statusbar';

const Appearance = ({ navigation }) => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const dimension = useWindowDimensions();
  const [selectedTheme, setSelectedTheme] = useState(ThemeMode.selectedTheme);
  const [themecolr, setthemecolr] = useState(ThemeMode.themecolr);
  // const [load, setLoad] = useState({});
  const StateFun = () => {
    dispatch({ type: THEMEMODE, payload: { selectedTheme, themecolr } });
    navigation.navigate('settings');
  };

  console.log(selectedTheme, themecolr);
  return (
    <View style={{ flex: 1, backgroundColor: selectedTheme ? theme.colors.primary : theme.colors.primaryBlack }}>
      <ImageBackground
        style={{ height: 170, width: '100%', paddingTop: 30, marginBottom: 15 }}
        source={
          themecolr == 'Red'
            ? ThemeMode.selectedTheme
              ? RedlightImage.Bg_Img1
              : ReddarkImage.Bg_Img1
            : themecolr == 'Blue'
            ? ThemeMode.selectedTheme
              ? BluelightImage.Bg_Img1
              : BluelightImage.Bg_Img1
            : themecolr == 'Green'
            ? ThemeMode.selectedTheme
              ? GreenlightImage.Bg_Img1
              : GreenlightImage.Bg_Img1
            : themecolr == 'Purple'
            ? ThemeMode.selectedTheme
              ? PurplelightImage.Bg_Img1
              : PurplelightImage.Bg_Img1
            : themecolr == 'Yellow'
            ? ThemeMode.selectedTheme
              ? YellowlightImage.Bg_Img1
              : YellowlightImage.Bg_Img1
            : ThemeMode.selectedTheme
            ? RedlightImage.Bg_Img1
            : ReddarkImage.Bg_Img1
        }
        resizeMode="stretch"
      >
        <Statusbar backgroundColor={'transparent'} hidden={false} barStyle={'light-content'} />
        <Header marginTop={20} title={'Appearance'} />
      </ImageBackground>

      <ScrollView>
        <Theme
          data={['Light mode', 'Dark mode']}
          header={selectedTheme ? 'Light mode' : 'Dark mode'}
          onPress={() => setSelectedTheme(!selectedTheme)}
          source={selectedTheme ? require('../../assets/icons/Lightt.png') : require('../../assets/icons/DarkK.png')}
          setSelectedTheme={setSelectedTheme}
          selectedTheme={selectedTheme}
          Box_BG={selectedTheme ? '#fff' : '#1A1D25'}
          header_color={selectedTheme ? '#1A1D25' : '#fff'}
          themecolr={themecolr}
          setthemecolr={setthemecolr}
        />

        <View style={{ height: 20 }} />
      </ScrollView>

      <ButtonView backgroundColor={selectedTheme ? theme.colors.primary : theme.colors.primaryBlack}>
        <TouchableOpacity onPress={() => StateFun()} style={{ alignSelf: 'center', marginTop: 1 }}>
          <LinearGradient
            colors={
              themecolr == 'Red'
                ? theme.colors.primaryOn
                : themecolr == 'Blue'
                ? theme.colors.primaryBlue
                : themecolr == 'Green'
                ? theme.colors.primaryGreen
                : themecolr == 'Purple'
                ? theme.colors.primaryPurple
                : themecolr == 'Yellow'
                ? theme.colors.primaryYellow
                : theme.colors.primaryOn
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              paddingVertical: 12,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 40,
              width: 200,
              height: 50,
            }}
          >
            <TextFormatted style={{ fontSize: 18, fontWeight: '700', color: theme.colors.primary }}>Next</TextFormatted>
          </LinearGradient>
        </TouchableOpacity>
      </ButtonView>
    </View>
  );
};
const Theme = ({ header, themecolr, setthemecolr, onPress, source, Box_BG, header_color }) => {
  const dimension = useWindowDimensions();
  return (
    <View>
      <TextFormatted style={{ fontSize: 16, fontWeight: '700', color: header_color, marginBottom: 28, textAlign: 'center', marginTop: 20 }}>
        {header}
      </TextFormatted>
      <ImageBackground source={require('../../assets/icons/Br_theme.png')} resizeMode="contain" style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity onPress={onPress} style={{ alignSelf: 'center', marginTop: -10 }}>
          <Image source={source} resizeMode="contain" style={{ width: 80, height: 32 }} />
        </TouchableOpacity>

        <View
          style={{
            marginTop: 18,
            alignSelf: 'center',
            width: dimension.width / 2,
            height: dimension.width / 2,
            justifyContent: 'space-between',
            backgroundColor: Box_BG,
            borderRadius: 30,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: dimension.width / 2,
              height: 70,
              marginTop: -10,
              transform: [{ skewY: '-5deg' }],
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            colors={
              themecolr == 'Red'
                ? theme.colors.primaryOn
                : themecolr == 'Blue'
                ? theme.colors.primaryBlue
                : themecolr == 'Green'
                ? theme.colors.primaryGreen
                : themecolr == 'Purple'
                ? theme.colors.primaryPurple
                : themecolr == 'Yellow'
                ? theme.colors.primaryYellow
                : theme.colors.primaryOn
            }
          >
            <Image resizeMode="contain" source={require('../../assets/icons/Check456.png')} style={{ width: 33, height: 33 }} />
          </LinearGradient>
          <View style={{ marginTop: -35 }}>
            <Divider style={{ height: 8, backgroundColor: '#8490AE', marginHorizontal: 24, borderRadius: 10, marginTop: 15, opacity: 0.5 }} />
            <Divider style={{ height: 8, backgroundColor: '#8490AE', marginHorizontal: 24, borderRadius: 10, marginTop: 5, opacity: 0.5 }} />
            <Divider
              style={{ height: 8, backgroundColor: '#8490AE', marginHorizontal: 24, borderRadius: 10, marginTop: 5, width: 70, opacity: 0.5 }}
            />
          </View>
          <Image
            resizeMode="contain"
            source={require('../../assets/icons/t_bttn.png')}
            style={{
              height: 19,
              width: 80,
              alignSelf: 'center',
              marginBottom: 10,
              tintColor:
                themecolr == 'Red'
                  ? theme.colors.red
                  : themecolr == 'Blue'
                  ? theme.colors.Blue
                  : themecolr == 'Green'
                  ? theme.colors.Green
                  : themecolr == 'Purple'
                  ? theme.colors.Purple
                  : themecolr == 'Yellow'
                  ? theme.colors.Yellow
                  : theme.colors.red,
            }}
          />
        </View>

        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              alignSelf: 'center',
            },
          ]}
        >
          <Color_theme
            onPress={() => setthemecolr('Red')}
            marginTop={-55}
            source={themecolr == 'Red' ? require('../../assets/icons/Red_active.png') : require('../../assets/icons/Red_diactive.png')}
          />
          <Color_theme
            onPress={() => setthemecolr('Blue')}
            marginTop={10}
            source={themecolr == 'Blue' ? require('../../assets/icons/Blue_active.png') : require('../../assets/icons/Blue_diactive.png')}
          />

          <Color_theme
            onPress={() => setthemecolr('Green')}
            source={themecolr == 'Green' ? require('../../assets/icons/Green_active.png') : require('../../assets/icons/Green_diactive.png')}
          />

          <Color_theme
            onPress={() => setthemecolr('Purple')}
            marginTop={10}
            source={themecolr == 'Purple' ? require('../../assets/icons/Purple_active.png') : require('../../assets/icons/Purple_diactive.png')}
          />

          <Color_theme
            onPress={() => setthemecolr('Yellow')}
            marginTop={-55}
            source={themecolr == 'Yellow' ? require('../../assets/icons/Yellow_active.png') : require('../../assets/icons/Yellow_diactive.png')}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const Color_theme = ({ onPress, source, marginTop, marginBottom }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignSelf: 'center',
        marginTop: marginTop || 45,
        marginBottom: marginBottom || -20,
        borderColor: '#1A1D25',
      }}
    >
      <Image source={source} resizeMode="contain" style={{ width: 51, height: 51 }} />
    </TouchableOpacity>
  );
};
export default Appearance;

const styles = StyleSheet.create({});
