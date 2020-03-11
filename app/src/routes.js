import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from './pages/SignIn';
import CheckIn from './pages/CheckIn';

import HelpOrder from './pages/Orders/HelpOrder';
import NewHelpOrder from './pages/Orders/NewHelpOrder';
import Answer from './pages/Orders/Answer';

import Header from '~/components/Header';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            CheckIn,
            Orders: {
              screen: createStackNavigator(
                {
                  HelpOrder,
                  Answer,
                  NewHelpOrder,
                },
                {
                  defaultNavigationOptions: {
                    tabBarIcon: ({ tintColor }) => (
                      <Icon name="edit-location" size={30} color={tintColor} />
                    ),
                    tabBarLabel: 'Check-ins',
                    header: () => <Header />,
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4e62',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#fff',
                height: 60,
                paddingTop: 10,
                paddingBottom: 10,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
