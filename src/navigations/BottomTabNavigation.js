import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddCartScreen from '../screens/AddCartScreen';
import ImagePath from '../constants/ImagePath';
import colors from '../constants/colors';
const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({focused}) => (
              <Image
                source={ImagePath.homeIcon}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? colors.blackColor : colors.gray2,
                  resizeMode: 'contain',
                }}
              />
            ),
            tabBarActiveTintColor: colors.blackColor,
            tabBarInactiveTintColor: colors.gray2,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={AddCartScreen}
          options={{
            title: 'Cart',
            tabBarIcon: ({focused}) => (
              <Image
                source={ImagePath.addCartIcon}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? colors.blackColor : colors.gray2,
                }}
              />
            ),
            tabBarActiveTintColor: colors.blackColor,
            tabBarInactiveTintColor: colors.gray2,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({});
