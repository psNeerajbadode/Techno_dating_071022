import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { theme } from '../../../utils/Constants';
import TextFormatted from '../../../components/TextFormatted';
import Button from '../../../components/Button';

const NeedBreack = ({ refRBSheet }) => {
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={510}
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
          Are you sure you want to delete your account?
        </TextFormatted>
        <TextFormatted
          style={{ fontSize: 14, fontWeight: '400', color: theme.colors.darkGrey, textAlign: 'center', marginHorizontal: 30, marginTop: 20 }}
        >
          If you need your account, you will permanently lose your profile, mesages, photos and matches. If you delete your account, this action
          cannot be undone.
        </TextFormatted>
        <TextFormatted
          style={{ fontSize: 14, fontWeight: '400', color: theme.colors.darkGrey, textAlign: 'center', marginHorizontal: 30, marginTop: 20 }}
        >
          If you’d like rather keep your account but not be shown to others, you can hide your account instead. You can turn this off in settings.
        </TextFormatted>
        <TextFormatted
          style={{ fontSize: 14, fontWeight: '400', color: theme.colors.darkGrey, textAlign: 'center', marginHorizontal: 30, marginTop: 20 }}
        >
          Are you sure you want to delete your account?
        </TextFormatted>
      </ScrollView>
      <Button buttonName={'Delete account'} marginBottom={20} />
    </RBSheet>
  );
};

export default NeedBreack;

const styles = StyleSheet.create({});
