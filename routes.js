import {createStackNavigator, createAppContainer} from 'react-navigation';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';

const AppNavigator =  createStackNavigator(
  {
    Contacts: {
      screen: Contacts,
    },
    Profile: {
      screen: Profile,
    },
    Favorites: {
      screen: Favorites,
    },
  },
  {
    initialRouteName: 'Favorites'
  }
);

export default createAppContainer(AppNavigator);