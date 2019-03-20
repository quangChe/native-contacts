import React from 'react';
import {
  createStackNavigator, 
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import {MaterialIcons} from '@expo/vector-icons';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import User from './screens/User';
import Options from './screens/Options';

import colors from './utils/colors';

// const getTabBarIcon = icon => ({tintColor}) => (
//   <MaterialIcons name={icon} size={26} style={{color: tintColor}}/>
// )

const getDrawerIcon = icon => ({tintColor}) => (
  <MaterialIcons name={icon} size={22} style={{color: tintColor}}/>
)

const ContactsScreens =  createStackNavigator(
  {
    Contacts: {
      screen: Contacts,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Contacts',
    navigationOptions: {
      // tabBarIcon: getTabBarIcon('list'),
      drawerIcon: getDrawerIcon('list'),
    },
  }
);

const FavoritesScreens = createStackNavigator(
  {
    Favorites: {
      screen: Favorites,
    },
    Profile: {
      screen: Profile,
    }
  },
  {
    initialRouteName: 'Favorites',
    navigationOptions: {
      // tabBarIcon: getTabBarIcon('star'),
      drawerIcon: getDrawerIcon('star'),
    },
  }
)

const UserScreens = createStackNavigator(
  {
    User: {
      screen: User,
    },
    Options: {
      screen: Options,
    }
  },
  {
    mode: 'modal',
    initialRouteName: 'User',
    navigationOptions: {
      // tabBarIcon: getTabBarIcon('person'),
      drawerIcon: getDrawerIcon('person'),
    },
  },
)

const AppNavigator = createDrawerNavigator(
  {
    Contacts: {
      screen: ContactsScreens,
    },
    Favorites: {
      screen: FavoritesScreens,
    },
    User: {
      screen: UserScreens,
    },
  },
  {
    initialRouteName: 'Contacts',
    // tabBarOptions: {
    //   style: {
    //     backgroundColor: colors.greyLight, 
    //     borderTopWidth: 0,
    //   },
    //   showLabel: false,
    //   showIcon: true,
    //   activeTintColor: colors.blue,
    //   inactiveTintColor: colors.greyDark,
    //   renderIndicator: () => null,
    // }
  }
)

export default createAppContainer(AppNavigator);