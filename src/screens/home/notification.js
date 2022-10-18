import {
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import TextFormatted from '../../components/TextFormatted';
import {theme} from '../../utils/Constants';
import {useSelector} from 'react-redux';

const Notification = ({refRBSheet}) => {
  const ThemeMode = useSelector(state => state.Theme);
  const data = [
    {
      img: require('../../assets/images/profile.png'),
      mess: 'Send you a message',
      name: 'Sofia Dickens',
      timing: '12:34',
    },
    {
      img: require('../../assets/images/profile2.png'),
      mess: 'Liked your profile',
      name: 'Sarah Parker',
      timing: 'Yesterday',
    },
    {
      img: require('../../assets/images/profile.png'),
      mess: 'Send you a message',
      name: 'Carla Lopez',
      timing: 'Yesterday',
    },
    {
      img: require('../../assets/images/profile2.png'),
      mess: 'Send you a message',
      name: 'Sofia Dickens',
      timing: 'Yesterday',
    },
    {
      img: require('../../assets/images/profile2.png'),
      mess: 'Send you a message',
      name: 'Sofia Dickens',
      timing: 'Yesterday',
    },
    {
      img: require('../../assets/images/profile2.png'),
      mess: 'Send you a message',
      name: 'Sofia Dickens',
      timing: 'Yesterday',
    },
    {
      img: require('../../assets/images/profile2.png'),
      mess: 'Send you a message',
      name: 'Sofia Dickens',
      timing: 'Yesterday',
    },
    {
      img: require('../../assets/images/profile2.png'),
      mess: 'Send you a message',
      name: 'Sofia Dickens',
      timing: 'Yesterday',
    },
    {
      img: require('../../assets/images/profile2.png'),
      mess: 'Send you a message',
      name: 'Sofia Dickens',
      timing: 'Yesterday',
    },
    {
      img: require('../../assets/images/profile2.png'),
      mess: 'Send you a message',
      name: 'Sofia Dickens',
      timing: 'Yesterday',
    },
    {
      img: require('../../assets/images/profile2.png'),
      mess: 'Send you a message',
      name: 'Sofia Dickens',
      timing: 'Yesterday',
    },
    {
      img: require('../../assets/images/profile2.png'),
      mess: 'Send you a message',
      name: 'Sofia Dickens',
      timing: 'Yesterday',
    },
  ];
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={600}
      closeOnPressBack={true}
      customStyles={{
        wrapper: {},
        draggableIcon: {backgroundColor: '#8490AE'},
        container: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          overflow: 'visible',
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
        },
      }}>
      <StatusBar backgroundColor={'#00000077'} />
      <TouchableOpacity
        onPress={() => refRBSheet.current.close()}
        style={{
          alignSelf: 'flex-end',
          marginRight: 30,
          marginTop: 5,
        }}>
        <Image
          source={require('../../assets/icons/close_immg.png')}
          style={{
            height: 8,
            width: 8,
            resizeMode: 'contain',
            alignSelf: 'flex-end',
            padding: 10,
            tintColor: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
          }}
        />
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              alignItems: 'center',
              paddingVertical: 7,
              marginBottom: 10,
            }}>
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 50,
                backgroundColor:
                  index <= 1
                    ? ThemeMode.themecolr == 'Red'
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
                    : '#8490AE4D',
                alignSelf: 'center',
                marginRight: 12,
              }}
            />
            <ImageBackground
              source={item.img}
              style={{height: 53, width: 53}}
              imageStyle={{
                borderRadius: 50,
                borderWidth: 3,
                borderColor:
                  index <= 1
                    ? ThemeMode.themecolr == 'Red'
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
                    : theme.colors.softGrey,
              }}
              resizeMode="contain"></ImageBackground>
            <View style={{marginLeft: 12, flex: 1}}>
              <TextFormatted
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: ThemeMode.selectedTheme
                    ? theme.colors.primaryBlack
                    : theme.colors.primary,
                }}>
                {item.name}
              </TextFormatted>
              <TextFormatted
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: '#8490AE',
                  marginTop: 5,
                }}>
                {item.mess}
              </TextFormatted>
            </View>
            <TextFormatted
              style={{fontSize: 12, fontWeight: '300', color: '#8490AE'}}>
              {item.timing}
            </TextFormatted>
          </TouchableOpacity>
        )}
      />
    </RBSheet>
  );
};

export default Notification;

const styles = StyleSheet.create({});
