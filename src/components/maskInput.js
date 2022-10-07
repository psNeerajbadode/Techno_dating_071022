import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import TextFormatted from './TextFormatted';
import { theme } from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
const MaskInput = ({ label, value, onChangeText, labelColor, right, containerStyle, marginLeft, marginHorizontal, placeholder, ...props }) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <View style={containerStyle}>
      <TextFormatted
        style={{
          fontSize: 14,
          fontWeight: '600',
          color: labelColor || ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
          flex: 1,
          marginLeft: marginLeft || 40,
        }}
      >
        {label}
      </TextFormatted>
      <View
        style={{
          backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack,
          marginHorizontal: marginHorizontal || 20,
          borderRadius: 20,
          paddingHorizontal: 20,
          height: 50,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          marginVertical: 5,
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <TextInputMask
          // type={'credit-card'}
          // type={type}
          // options={{
          //   obfuscated: false,
          //   issuer: 'visa-or-mastercard',
          // }}
          // options={options}
          // maxLength={}
          {...props}
          value={value}
          onChangeText={onChangeText}
          style={{
            flex: 1,
            padding: 0,
            fontSize: 14,
            fontFamily: 'Rubik-Regular',
            color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
          }}
          placeholder={placeholder}
          placeholderTextColor={ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary}
        />
        {right}
      </View>
    </View>
  );
};

export default MaskInput;

const styles = StyleSheet.create({});
