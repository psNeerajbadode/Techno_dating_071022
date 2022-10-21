import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import TextFormatted from '../../../components/TextFormatted';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../../../utils/Constants';
import Button from '../../../components/Button';
import Icon from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from '../../../components/bottomSheet';
import SearchBar from '../../../components/SearchBar';
import {useSelector} from 'react-redux';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../../utils/CustomImages';
import Sheetbutton from '../../../components/Sheetbutton';

const UserLikeBottomSheet = ({refRBSheet, setLike}) => {
  const ThemeMode = useSelector(state => state.Theme);
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const DatatypeRef = useRef();
  const [type, setType] = useState();
  const [search, setSearch] = useState('');
  const [additem, setAdditem] = useState([]);
  const kaylength = search.length;
  const userprofile = require('../../../assets/images/profile2.png');
  const data = [
    {
      img: require('../../../assets/icons/clapperboard.png'),
      title: 'Movies',
      subtitle: 'Tell me what to watch tonight',
    },

    // { img: require('../../../assets/icons/icecream.png'), title: 'Ice cream' },
    // { img: require('../../../assets/icons/table.png'), title: 'Restaurant' },
    {
      img: require('../../../assets/icons/hot_coffee.png'),
      title: 'Coffee',
      subtitle: 'Take me to your favorite cafe',
    },
    // { img: require('../../../assets/icons/beach_chair.png'), title: 'Beach' },
    // { img: require('../../../assets/icons/pina_colada.png'), title: 'Bar' },
    {
      img: require('../../../assets/icons/mirror_ball.png'),
      title: 'Club',
      subtitle: 'Let’s have some fun',
    },
    // { img: require('../../../assets/icons/pizza.png'), title: 'Pizza' },
    // { img: require('../../../assets/icons/museum.png'), title: 'Museum' },
    // { img: require('../../../assets/icons/theater.png'), title: 'Theater' },
    // { img: require('../../../assets/icons/micro.png'), title: 'karaoke' },
    // { img: require('../../../assets/icons/wine_glass.png'), title: 'Wine' },
    // { img: require('../../../assets/icons/beer.png'), title: 'Beer' },
    // { img: require('../../../assets/icons/zoo.png'), title: 'Zoo' },
    {
      img: require('../../../assets/icons/art_and_design.png'),
      title: 'Art',
      subtitle: 'Take me to your favorite Art',
    },
    {
      img: require('../../../assets/icons/sports.png'),
      title: 'Sports',
      subtitle: 'Take me to your favorite Sports',
    },
    // { img: require('../../../assets/icons/teddy_bear.png'), title: 'Bear' },
    // { img: require('../../../assets/icons/lectern.png'), title: 'Politics' },
    // { img: require('../../../assets/icons/picnic_basket.png'), title: 'Picnic' },
    // { img: require('../../../assets/icons/cooking.png'), title: 'Cooking' },
    // { img: require('../../../assets/icons/books.png'), title: 'Reading' },
    // { img: require('../../../assets/icons/diy.png'), title: 'DIY' },
    // { img: require('../../../assets/icons/dog.png'), title: 'Animals' },
    // { img: require('../../../assets/icons/dice.png'), title: 'Board Games' },
    {
      img: require('../../../assets/icons/aeroplane.png'),
      title: 'Travel',
      subtitle: 'Take me to your favorite Travel',
    },
    // { img: require('../../../assets/icons/polo.png'), title: 'Fashion' },
    // { img: require('../../../assets/icons/herbal_tea.png'), title: 'Tea' },
    // { img: require('../../../assets/icons/photography.png'), title: 'Photography' },
    // { img: require('../../../assets/icons/shopping_bags.png'), title: 'Shopping' },
    {
      img: require('../../../assets/icons/console.png'),
      title: 'Games',
      subtitle: 'Take me to your favorite Games',
    },
    // { img: require('../../../assets/icons/manuscript.png'), title: 'Writing' },
    // { img: require('../../../assets/icons/nature.png'), title: 'Outdoors' },
    // { img: require('../../../assets/icons/rumba.png'), title: 'Dancing' },
    // { img: require('../../../assets/icons/walking.png'), title: 'Walking' },
    // { img: require('../../../assets/icons/ecology.png'), title: 'Environment' },
    // { img: require('../../../assets/icons/love.png'), title: 'Volunteering' },
    // { img: require('../../../assets/icons/instagram.png'), title: 'Instagram' },
    // { img: require('../../../assets/icons/architecture.png'), title: 'Architecture' },
    {
      img: require('../../../assets/icons/love_1.png'),
      title: 'Friends',
      subtitle: 'Let’s be friends. Maybe even besties',
    },
  ];

  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        height={600}
        closeOnDragDown={true}
        closeOnPressBack={true}
        customStyles={{
          draggableIcon: {height: 0},
          container: {borderTopLeftRadius: 40, borderTopRightRadius: 40},
        }}>
        <StatusBar backgroundColor={'#00000077'} />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
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
          style={{flex: 1, marginTop: -20}}>
          <View
            style={{
              height: 4,
              width: 36,
              backgroundColor: '#fff',
              borderRadius: 10,
              alignSelf: 'center',
              marginTop: 10,
            }}
          />
          <Icon
            name="close-a"
            size={16}
            color="#fff"
            style={{
              alignSelf: 'flex-end',
              marginRight: 30,
              marginTop: 10,
              padding: 7,
            }}
            onPress={() => refRBSheet.current.close()}
          />
          <ScrollView>
            <ImageBackground
              source={require('../../../assets/icons/circle.png')}
              resizeMode="contain"
              style={{
                height: dimension.width - 100,
                width: dimension.width - 100,
                alignSelf: 'center',
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={userprofile}
                style={{
                  height: dimension.width / 2.5,
                  width: dimension.width / 2.5,
                  borderRadius: 100,
                  borderWidth: 4,
                  borderColor: '#fff',
                }}
              />
              <TouchableOpacity onPress={() => navigation.navigate('message')}>
                <LinearGradient
                  style={{
                    height: 55,
                    width: 55,
                    position: 'absolute',
                    bottom: '0%',
                    left: '15%',
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
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
                  }>
                  <Image
                    resizeMode="contain"
                    source={require('../../../assets/icons/like_match.png')}
                    style={{height: 30, width: 30}}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </ImageBackground>
            <TextFormatted
              style={{
                fontSize: 26,
                fontWeight: '700',
                color: theme.colors.primary,
                textAlign: 'center',
                marginTop: 17,
              }}>
              Emma Hatchan
            </TextFormatted>
            <TextFormatted
              style={{
                fontSize: 18,
                fontWeight: '400',
                color: theme.colors.primary,
                textAlign: 'center',
              }}>
              22 years old
            </TextFormatted>
            <TextFormatted
              style={{
                fontSize: 16,
                fontWeight: '300',
                color: theme.colors.primary,
                textAlign: 'center',
                marginTop: 20,
              }}>
              You have 3 Passions in common!
            </TextFormatted>

            <Sheetbutton
              ButtonName={'Send message'}
              onPress={() => {
                refRBSheet.current.close();
                DatatypeRef.current.open();
                setLike(true);
                // navigation.navigate('chats');
              }}
            />
            <TextFormatted
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: theme.colors.primary,
                alignSelf: 'center',
                marginVertical: 12,
                padding: 5,
              }}
              onPress={() => {
                refRBSheet.current.close();
                setLike(true);
              }}>
              View profile
            </TextFormatted>
          </ScrollView>
        </LinearGradient>
      </RBSheet>
      <BottomSheet
        refRBSheet={DatatypeRef}
        height={600}
        children={
          <View style={{marginHorizontal: 10, marginTop: 90}}>
            <View style={{alignSelf: 'center'}}>
              <SearchBar
                onPress={() => setSearch('')}
                placeholder={'Search date type'}
                onChangeText={setSearch}
                value={search}
              />
            </View>
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
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{
                alignSelf: 'center',
                marginVertical: 20,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row',
                width: '96%',
                paddingHorizontal: 35,
                paddingVertical: 15,
                borderRadius: 15,
              }}>
              <Image
                resizeMode="contain"
                source={
                  ThemeMode.themecolr == 'Red'
                    ? RedlightImage.chat_Red1
                    : ThemeMode.themecolr == 'Blue'
                    ? BluelightImage.chat_blue1
                    : ThemeMode.themecolr == 'Green'
                    ? GreenlightImage.chat_green1
                    : ThemeMode.themecolr == 'Purple'
                    ? PurplelightImage.chat_purple1
                    : ThemeMode.themecolr == 'Yellow'
                    ? YellowlightImage.chat_yellow1
                    : RedlightImage.chat_Red1
                }
                style={{width: 45, height: 45, marginRight: 10}}
              />
              <TextFormatted
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: theme.colors.primary,
                }}>
                Open to prepositions
              </TextFormatted>
            </LinearGradient>

            <FlatList
              data={data.filter(item => {
                return item.title.toLowerCase().includes(search.toLowerCase());
              })}
              contentContainerStyle={{paddingBottom: 20}}
              style={{height: 260, paddingTop: 15}}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() =>
                    setAdditem(pre =>
                      pre.find((v, i) => v == item.title)
                        ? pre.filter((v, i) => v != item.title)
                        : [...pre, item.title],
                    )
                  }
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 15,
                    marginVertical: 8,
                    justifyContent: 'space-between',
                    shadowColor: '#8490ae85',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 10,
                    backgroundColor: ThemeMode.selectedTheme
                      ? theme.colors.primary
                      : theme.colors.primaryBlack,
                    borderRadius: 15,
                    marginHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      overflow: 'hidden',
                      flex: 1,
                      marginRight: 20,
                    }}>
                    <Image
                      source={item.img}
                      style={{
                        height: 40,
                        width: 40,
                        resizeMode: 'contain',
                        opacity: 1,
                        marginRight: 10,
                      }}
                    />
                    <View>
                      <TextFormatted
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                          color: ThemeMode.selectedTheme
                            ? theme.colors.primaryBlack
                            : theme.colors.primary,
                          flex: 1,
                          marginLeft: 10,
                        }}>
                        {item.title}
                      </TextFormatted>
                      <TextFormatted
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: theme.colors.darkGrey,
                          flex: 1,
                          marginLeft: 10,
                        }}>
                        {item.subtitle}
                      </TextFormatted>
                    </View>
                  </View>
                  <Image
                    source={
                      additem.find((v, i) => v == item.title)
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
                          : RedlightImage.check_red
                        : require('../../../assets/icons/check.png')
                    }
                    style={{height: 29, width: 29, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              )}
            />
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                height: 90,
                width: dimension.width,
                backgroundColor: ThemeMode.selectedTheme
                  ? theme.colors.primary
                  : theme.colors.primaryBlack,
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
                  width: dimension.width / 2 - 10,
                  textAlign: 'center',
                }}
                onPress={() => DatatypeRef.current.close()}>
                Cancel
              </TextFormatted>
              <Button
                opacity={additem.length >= 1 ? 1 : 0.5}
                disabled={additem.length >= 1 ? false : true}
                buttonName={'Send'}
                color={'#fff'}
                marginTop={1}
                width={dimension.width / 2 - 10}
                onPress={() => {
                  navigation.navigate('chats', {params: additem});
                }}
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

export default UserLikeBottomSheet;

const styles = StyleSheet.create({});
