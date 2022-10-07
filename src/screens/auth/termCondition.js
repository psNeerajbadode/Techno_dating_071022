import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { theme } from '../../utils/Constants';
import HeaderImage from '../../components/HeaderImage';
import Header from '../../components/Header';
import TextFormatted from '../../components/TextFormatted';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const TermCondition = () => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <View style={{ flex: 1, backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack }}>
      <HeaderImage>
        <Header title={'Terms & Conditions'} />
        <View
          style={{
            height: 147,
            width: 147,
            // backgroundColor: '#fff',
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 50,
          }}
        >
          <Image source={require('../../assets/images/notes.png')} style={{ height: 100, width: 100, resizeMode: 'contain' }} />
        </View>
      </HeaderImage>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '300',
            color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          Before using our app please agree our terms and conditions in order to proceded
        </TextFormatted>
        <TouchableOpacity style={{ paddingVertical: 10, flexDirection: 'row' }}>
          <TextFormatted
            style={{ fontSize: 16, fontWeight: '700', color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary, flex: 1 }}
          >
            Terms & Conditions
          </TextFormatted>
          <Icon name="navigate-next" color={ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingVertical: 10, flexDirection: 'row' }}>
          <TextFormatted
            style={{ fontSize: 16, fontWeight: '700', color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary, flex: 1 }}
          >
            Privacy notice
          </TextFormatted>
          <Icon name="navigate-next" color={ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingVertical: 10, flexDirection: 'row' }}>
          <TextFormatted
            style={{ fontSize: 16, fontWeight: '700', color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary, flex: 1 }}
          >
            Security tips
          </TextFormatted>
          <Icon name="navigate-next" color={ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary} size={20} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default TermCondition;

const styles = StyleSheet.create({});
