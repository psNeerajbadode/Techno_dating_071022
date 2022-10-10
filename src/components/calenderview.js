import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import TextFormatted from './TextFormatted';
import DropDown from './DropDown';
import {Calendar} from 'react-native-calendars';
import {theme} from '../utils/Constants';
import moment from 'moment';
import Button from './Button';

const CalenderView = ({refRBSheet, selectedDate, setSelectedDate}) => {
  const [refresh, setRefresh] = useState(true);
  const dimension = useWindowDimensions();
  useEffect(() => {
    if (!refresh) {
      setTimeout(() => {
        setRefresh(true);
      }, 10);
    }
  }, [refresh]);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const years = [
    '1993',
    '1994',
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
  ];
  return (
    <RBSheet
      ref={refRBSheet}
      height={dimension.height - 100}
      openDuration={250}
      customStyles={{
        container: {borderTopRightRadius: 40, borderTopLeftRadius: 40},
      }}>
      <ScrollView>
        <View
          style={{
            height: 4,
            width: 36,
            borderRadius: 20,
            backgroundColor: '#8490AE',
            alignSelf: 'center',
            marginTop: 10,
          }}
        />
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '300',
            color: theme.colors.primaryBlack,
            alignSelf: 'center',
            marginTop: 30,
          }}>
          Select your birthday date
        </TextFormatted>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 30,
          }}>
          <DropDown
            width={dimension.width / 2 - 30}
            label={'Month'}
            marginLeft={20}
            placeholder={months[moment(selectedDate).month()]}
            // selected={moment(selectedDate)}
            onSelect={(selectedItem, index) => {
              setSelectedDate(v =>
                moment(v).set('month', index).format('yyyy-MM-DD'),
              );
              setRefresh(false);
            }}
            top={1}
            items={months}
          />
          <View style={{width: 20}} />
          <DropDown
            width={dimension.width / 2 - 30}
            label={'Year'}
            marginLeft={20}
            // placeholder={sele}
            placeholder={moment(selectedDate).get('year') + ''}
            top={1}
            onSelect={(selectedItem, index) => {
              setSelectedDate(v =>
                moment(v)
                  .set('year', parseInt(selectedItem))
                  .format('yyyy-MM-DD'),
              );
              setRefresh(false);
            }}
            items={years}
          />
        </View>
        {/* <Button
          buttonName="Change To Jan"
          buttonColor={['#f00', '#f00']}
          onPress={() => {
            setSelectedDate(v => {
              // console.log(v.set('month', 0));
              return moment(v).set('year', 2020).format('yyyy-MM-DD');
            });

            setRefresh(false);
          }}
        />
        <Button
          buttonName="Change To Feb"
          buttonColor={['#f00', '#f00']}
          onPress={() => {
            setSelectedDate(v => {
              // console.log(v.set('month', 1));
              return moment(v).set('month', 1).format('yyyy-MM-DD');
            });
            setRefresh(false);
          }}
        /> */}

        {console.log(moment(selectedDate).format('yyyy-MM-DD'))}
        {refresh && (
          <Calendar
            current={moment(selectedDate).format('yyyy-MM-DD')}
            minDate={'1900-01-01'}
            onDayPress={day => {
              setSelectedDate(
                moment(
                  day.timestamp + new Date().getTimezoneOffset() * 60 * 1000,
                ).format('yyyy-MM-DD'),
              );
            }}
            markedDates={{
              [moment(selectedDate).format('yyyy-MM-DD')]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: '#EA4A5A',
                selectedTextColor: 'white',
              },
            }}
            style={{marginHorizontal: 20, marginVertical: 15}}
            customHeaderTitle
            hideDayNames={true}
            disableMonthChange={true}
            hideArrows
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            height: 100,
            width: dimension.width,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <TextFormatted
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#8490AE',
              width: dimension.width / 2 - 20,
              textAlign: 'center',
            }}
            onPress={() => refRBSheet.current.close()}>
            Cancel
          </TextFormatted>
          <Button
            buttonColor={theme.colors.primaryOn}
            buttonName={'Select'}
            color={'#fff'}
            marginTop={1}
            width={dimension.width / 2 - 20}
            onPress={() => refRBSheet.current.close()}
          />
        </View>
      </ScrollView>
    </RBSheet>
  );
};

export default CalenderView;

const styles = StyleSheet.create({});
