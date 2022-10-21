import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {theme} from '../../../utils/Constants';
import TextFormatted from '../../../components/TextFormatted';
import Button from '../../../components/Button';

const Other = ({refRBSheet}) => {
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={450}
      closeOnPressBack={true}
      customStyles={{
        wrapper: {},
        draggableIcon: {backgroundColor: '#8490AE'},
        container: {borderTopLeftRadius: 40, borderTopRightRadius: 40},
      }}>
      <StatusBar backgroundColor={'#00000077'} />
      {/*      <AntDesign
       
        name="arrowleft"
        size={20}
      
        style={{
          height: 40,
          width: 40,
          backgroundColor: '#FFFFFF33',
          textAlign: 'center',
          textAlignVertical: 'center',
          borderRadius: 12,
          marginLeft: 20,
        }}
      /> */}
      <TouchableOpacity
        onPress={() => {
          refRBSheet.current.close();
        }}
        style={{
          alignSelf: 'flex-start',
          marginLeft: 30,
          marginTop: 5,
        }}>
        <Image
          source={require('../../../assets/icons/sheet_arrow.png')}
          style={{
            height: 5,
            width: 5,
            resizeMode: 'contain',
            alignSelf: 'flex-end',
            padding: 8,
            tintColor: theme.colors.primaryBlack,
          }}
        />
      </TouchableOpacity>

      <ScrollView>
        <TextFormatted
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: theme.colors.primaryBlack,
            textAlign: 'center',
            marginHorizontal: 34,
            marginTop: 20,
          }}>
          Other
          {/* Fresh Start */}
        </TextFormatted>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: theme.colors.darkGrey,
            textAlign: 'center',
            marginHorizontal: 30,
            marginTop: 20,
          }}>
          Help us improve
          {/*  Help us to improve your experience. Why do you want fresh start? */}
        </TextFormatted>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: theme.colors.primaryBlack,
            marginLeft: 20,
            marginTop: 15,
          }}>
          Tell us more
        </TextFormatted>
        <TextInput
          multiline={true}
          placeholder="Insert text"
          placeholderTextColor={theme.colors.darkGrey}
          style={{
            backgroundColor: theme.colors.primary,
            height: 160,
            marginHorizontal: 20,
            paddingVertical: 15,
            paddingHorizontal: 15,
            textAlignVertical: 'top',
            borderRadius: 5,
            shadowColor: '#8490ae85',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 10,
            marginVertical: 5,
            fontSize: 14,
            fontFamily: 'Rubik-Light',
            color: theme.colors.primaryBlack,
          }}
        />
      </ScrollView>
      <Button buttonName={'Delete account'} marginBottom={20} />
    </RBSheet>
  );
};

export default Other;

const styles = StyleSheet.create({});
