import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import TextFormatted from '../../components/TextFormatted';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';

const MoreOptions = ({ refRBSheet }) => {
  const refRBSheet2 = useRef();
  const [isReport, setIsReport] = useState(0);
  const ThemeMode = useSelector(state => state.Theme);
  const colormode =
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
    <RBSheet
      ref={refRBSheet}
      height={120}
      closeOnDragDown={true}
      closeOnPressBack={true}
      customStyles={{
        wrapper: {},
        draggableIcon: { backgroundColor: '#8490AE' },
        container: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack,
        },
      }}
    >
      <StatusBar backgroundColor={'#00000077'} />
      <TouchableOpacity
        style={{ flexDirection: 'row', marginLeft: 20, marginRight: 30, paddingVertical: 2, marginTop: 20 }}
        onPress={() => {
          setIsReport(1);
          refRBSheet2.current.open();
        }}
      >
        <TextFormatted style={{ fontSize: 14, fontWeight: '600', color: colormode, flex: 1 }}>Report...</TextFormatted>
        <Icon name="navigate-next" size={20} color={colormode} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', marginLeft: 20, marginRight: 30, paddingVertical: 2, marginTop: 10 }}
        onPress={() => {
          setIsReport(0);
          refRBSheet2.current.open();
        }}
      >
        <TextFormatted
          style={{ fontSize: 14, fontWeight: '600', color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary, flex: 1 }}
        >
          Block account
        </TextFormatted>
        <Icon name="navigate-next" size={20} color={ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary} />
      </TouchableOpacity>
      <BlockReport refRBSheet={refRBSheet} refRBSheet2={refRBSheet2} isReport={isReport} setIsReport={setIsReport} />
    </RBSheet>
  );
};
const BlockReport = ({ refRBSheet2, refRBSheet, isReport, setIsReport }) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <RBSheet
      ref={refRBSheet2}
      height={500}
      closeOnDragDown={true}
      closeOnPressBack={true}
      customStyles={{
        draggableIcon: { backgroundColor: '#8490AE' },
        container: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          overflow: 'visible',
          backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack,
        },
      }}
    >
      <StatusBar backgroundColor={'#00000077'} translucent />

      <AntDesign
        onPress={() => {
          refRBSheet.current.open();
          refRBSheet2.current.close();
        }}
        name="arrowleft"
        size={20}
        color={ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary}
        style={{
          height: 40,
          width: 40,
          backgroundColor: ThemeMode.selectedTheme ? '#FFFFFF33' : 'transparent',
          textAlign: 'center',
          textAlignVertical: 'center',
          borderRadius: 12,
          marginLeft: 20,
        }}
      />
      <LinearGradient
        colors={['#EEF4FF', '#CFE7FD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ height: 144, width: 144, borderRadius: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 25 }}
      >
        <LinearGradient
          colors={
            ThemeMode.themecolr == 'Red'
              ? theme.colors.primaryOn
              : ThemeMode.themecolr == 'Blue'
              ? theme.colors.primaryBlue
              : ThemeMode.themecolr == 'Green'
              ? theme.colors.primaryGreen
              : ThemeMode.themecolr == 'Purple'
              ? theme.colors.primaryPurple
              : ThemeMode.themecolr == 'Yellow'
              ? theme.colors.primaryYellow
              : theme.colors.primaryOn
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ height: 124, width: 124, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={isReport == 1 ? require('../../assets/icons/alert.png') : require('../../assets/icons/akar.png')}
            style={{ height: 63, width: 63, resizeMode: 'contain' }}
          />
        </LinearGradient>
      </LinearGradient>
      <TextFormatted
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
          marginHorizontal: 20,
          marginTop: 40,
        }}
      >
        {isReport == 1 ? 'Why are you reporting this account?' : 'Are you sure you want to block this account?'}
      </TextFormatted>
      <TextFormatted style={{ fontSize: 14, fontWeight: '400', color: '#8490AE', marginHorizontal: 20, marginTop: 14 }}>
        {isReport == 1
          ? 'Your reports are always anonymous'
          : 'By blocking this profile , you will not be able to visit it again or send/receive any message'}
      </TextFormatted>
      {isReport == 1 ? (
        <View>
          <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 20, marginRight: 30, paddingVertical: 2, marginTop: 30 }}>
            <TextFormatted
              style={{ fontSize: 14, fontWeight: '600', color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary, flex: 1 }}
            >
              Report post
            </TextFormatted>
            <Icon name="navigate-next" size={20} color={ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 20, marginRight: 30, paddingVertical: 2, marginTop: 10 }}>
            <TextFormatted
              style={{ fontSize: 14, fontWeight: '600', color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary, flex: 1 }}
            >
              Report account
            </TextFormatted>
            <Icon name="navigate-next" size={20} color={ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary} />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Button
            buttonName={'Block account'}
            color={'#fff'}
            onPress={() => {
              // refRBSheet.current.open();
              refRBSheet2.current.close();
            }}
          />
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: theme.colors.primaryBlack,
              alignSelf: 'center',
              marginTop: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            onPress={() => {
              refRBSheet.current.open();
              refRBSheet2.current.close();
            }}
          >
            Cancel
          </TextFormatted>
        </View>
      )}
    </RBSheet>
  );
};
export default MoreOptions;

const styles = StyleSheet.create({});
