import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { theme } from '../../../utils/Constants';
import TextFormatted from '../../../components/TextFormatted';
import Button from '../../../components/Button';

const Other = ({ refRBSheet }) => {
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={350}
      closeOnPressBack={true}
      customStyles={{
        wrapper: {},
        draggableIcon: { backgroundColor: '#8490AE' },
        container: { borderTopLeftRadius: 40, borderTopRightRadius: 40 },
      }}
    >
      <StatusBar backgroundColor={'#00000077'} />
      <AntDesign
        onPress={() => {
          refRBSheet.current.close();
        }}
        name="arrowleft"
        size={20}
        color={theme.colors.primaryBlack}
        style={{
          height: 40,
          width: 40,
          backgroundColor: '#FFFFFF33',
          textAlign: 'center',
          textAlignVertical: 'center',
          borderRadius: 12,
          marginLeft: 20,
        }}
      />
      <ScrollView>
        <TextFormatted
          style={{ fontSize: 18, fontWeight: '600', color: theme.colors.primaryBlack, textAlign: 'center', marginHorizontal: 34, marginTop: 20 }}
        >
          Fresh Start
        </TextFormatted>
        <TextFormatted
          style={{ fontSize: 14, fontWeight: '400', color: theme.colors.darkGrey, textAlign: 'center', marginHorizontal: 30, marginTop: 20 }}
        >
          Help us to improve your experience. Why do you want fresh start?
        </TextFormatted>
        <TextFormatted style={{ fontSize: 14, fontWeight: '600', color: theme.colors.primaryBlack, marginLeft: 20, marginTop: 15 }}>
          Tell us more
        </TextFormatted>
        <TextInput
          placeholder="Insert text"
          placeholderTextColor={theme.colors.darkGrey}
          style={{
            backgroundColor: theme.colors.primary,
            marginHorizontal: 20,
            height: 50,
            paddingHorizontal: 15,
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
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
