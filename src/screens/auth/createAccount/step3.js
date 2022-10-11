import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderImage_1 from '../../../components/HeaderImage_1';
import Pagination from '../../../components/Pagination';
import SearchBar from '../../../components/SearchBar';
import Icon from 'react-native-vector-icons/Feather';
import TextFormatted from '../../../components/TextFormatted';
import Button from '../../../components/Button';
import {theme} from '../../../utils/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../../utils/CustomImages';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {STAP} from '../../../redux/actions/ActionType';
import ActivityLoader from '../../../components/ActivityLoader';

const Step3 = () => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setload] = useState(false);
  const [passion, setpassion] = useState([]);
  const [rslt, setRslt] = useState();
  const [passion_is, setPassion_is] = useState([]);
  const navigation = useNavigation();
  const animals = [];
  const data = [
    {img: require('../../../assets/icons/icecream.png'), title: 'Ice cream'},
    {img: require('../../../assets/icons/table.png'), title: 'Restaurant'},
    {img: require('../../../assets/icons/hot_coffee.png'), title: 'Coffee'},
    {img: require('../../../assets/icons/beach_chair.png'), title: 'Beach'},
    {img: require('../../../assets/icons/pina_colada.png'), title: 'Bar'},
    {img: require('../../../assets/icons/mirror_ball.png'), title: 'Club'},
    {img: require('../../../assets/icons/pizza.png'), title: 'Pizza'},
    {img: require('../../../assets/icons/museum.png'), title: 'Museum'},
    {img: require('../../../assets/icons/theater.png'), title: 'Theater'},
    {img: require('../../../assets/icons/micro.png'), title: 'karaoke'},
    {img: require('../../../assets/icons/wine_glass.png'), title: 'Wine'},
    {img: require('../../../assets/icons/beer.png'), title: 'Beer'},
    {img: require('../../../assets/icons/zoo.png'), title: 'Zoo'},
    {img: require('../../../assets/icons/art_and_design.png'), title: 'Art'},
    {img: require('../../../assets/icons/clapperboard.png'), title: 'Movies'},
    {img: require('../../../assets/icons/sports.png'), title: 'Sports'},
    {img: require('../../../assets/icons/teddy_bear.png'), title: 'Bear'},
    {img: require('../../../assets/icons/lectern.png'), title: 'Politics'},
    {img: require('../../../assets/icons/picnic_basket.png'), title: 'Picnic'},
    {img: require('../../../assets/icons/cooking.png'), title: 'Cooking'},
    {img: require('../../../assets/icons/books.png'), title: 'Reading'},
    {img: require('../../../assets/icons/diy.png'), title: 'DIY'},
    {img: require('../../../assets/icons/dog.png'), title: 'Animals'},
    {img: require('../../../assets/icons/dice.png'), title: 'Board Games'},
    {img: require('../../../assets/icons/aeroplane.png'), title: 'Travel'},
    {img: require('../../../assets/icons/polo.png'), title: 'Fashion'},
    {img: require('../../../assets/icons/herbal_tea.png'), title: 'Tea'},
    {
      img: require('../../../assets/icons/photography.png'),
      title: 'Photography',
    },
    {
      img: require('../../../assets/icons/shopping_bags.png'),
      title: 'Shopping',
    },
    {img: require('../../../assets/icons/console.png'), title: 'Gaming'},
    {img: require('../../../assets/icons/manuscript.png'), title: 'Writing'},
    {img: require('../../../assets/icons/nature.png'), title: 'Outdoors'},
    {img: require('../../../assets/icons/rumba.png'), title: 'Dancing'},
    {img: require('../../../assets/icons/walking.png'), title: 'Walking'},
    {img: require('../../../assets/icons/ecology.png'), title: 'Environment'},
    {img: require('../../../assets/icons/love.png'), title: 'Volunteering'},
    {img: require('../../../assets/icons/instagram.png'), title: 'Instagram'},
    {
      img: require('../../../assets/icons/architecture.png'),
      title: 'Architecture',
    },
  ];

  const getPassion = () => {
    setload(true);
    axios({
      method: 'get',
      url: `https://technorizen.com/Dating/webservice/get_passion`,
    }).then(response => {
      setload(false);
      setpassion(response.data.result);
    });
  };

  const getCategory = () => {
    setLoading(true);
    const body = new FormData();
    body.append('user_id', Staps.id);
    body.append('category_id', selected.join(','));
    axios({
      url: 'https://technorizen.com/Dating/webservice/signup4',
      method: 'POST',
      data: body,
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
      .then(function (response) {
        console.log('response', response.data);
        if (response.data.status == 1) {
          setLoading(false);
          dispatch({type: STAP, payload: response.data.result});
          navigation.navigate('step4');
        } else {
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getPassion();
  }, []);

  console.log('Staps3', Staps);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <View>
        <HeaderImage_1 height={200} marginBottom={15}>
          <Pagination
            title={'Create account'}
            subTitle={'Passions'}
            position={3}
          />
        </HeaderImage_1>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          onPress={() => setSearch('')}
          placeholder={'Search passion'}
        />
      </View>
      {load ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityLoader />
        </View>
      ) : (
        <FlatList
          data={passion.filter(item => {
            return item.passion_name
              .toLowerCase()
              .includes(search.toLowerCase());
          })}
          contentContainerStyle={{paddingBottom: 100}}
          ListHeaderComponent={
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <Icon
                name="alert-circle"
                size={30}
                color={
                  ThemeMode.selectedTheme
                    ? theme.colors.darkGrey
                    : theme.colors.darkGrey
                }
                style={{transform: [{rotate: '180deg'}]}}
              />
              <TextFormatted
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: ThemeMode.selectedTheme
                    ? theme.colors.darkGrey
                    : theme.colors.darkGrey,
                  flex: 1,
                  marginLeft: 10,
                  marginTop: 10,
                }}>
                Select a minimum of 5 passions and a maximum of 10
              </TextFormatted>
            </View>
          }
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                setSelected(prevState =>
                  prevState.find(v => item.id == v)
                    ? prevState.filter(v => item.id != v)
                    : [...prevState, item.id],
                )
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingHorizontal: 30,
                paddingVertical: 8,
                marginVertical: 2,
              }}>
              <Image
                source={{uri: item.image}}
                style={{
                  height: 32,
                  width: 32,
                  resizeMode: 'contain',
                  opacity: selected.find(v => item.id == v) ? 1 : 0.3,
                }}
              />
              <TextFormatted
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: selected.find(v => item.id == v)
                    ? ThemeMode.selectedTheme
                      ? theme.colors.primaryBlack
                      : theme.colors.primary
                    : '#8490AE',
                  flex: 1,
                  marginLeft: 10,
                }}>
                {item.passion_name}
              </TextFormatted>
              <Image
                source={
                  selected.find(v => item.id == v)
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
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 90,
          width: '100%',
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Button
          opacity={selected.length >= 5 && selected.length <= 10 ? 1 : 0.5}
          buttonName={'Next'}
          Loading={loading}
          marginBottom={15}
          disabled={
            selected.length >= 5 && selected.length <= 10 ? false : true
          }
          marginTop={10}
          onPress={() => getCategory() /* navigation.navigate('step4') */}
        />
      </View>
    </View>
  );
};

export default Step3;

const styles = StyleSheet.create({});
