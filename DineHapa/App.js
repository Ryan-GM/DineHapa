import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CarouselScreen from './screens/CarouselScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import RestaurantDetailScreen from './screens/RestaurantDetailScreen';
import MenuScreen from './screens/MenuScreen';import LocationScreen from './screens/LocationScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';

import UserProfileScreen from './screens/UserProfile';
import ChangePassword from './screens/ChangePassword';
import AccountInfo from './screens/AccountInfo';
import OrderConfirmation from './screens/OrderConfirmation';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CarouselScreen">
        <Stack.Screen 
          name="CarouselScreen" 
          component={CarouselScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SignInScreen" 
          component={SignInScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SignUpScreen" 
          component={SignUpScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="LocationScreen" 
          component={LocationScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="RestaurantDetailScreen" 
          component={RestaurantDetailScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="MenuScreen" 
          component={MenuScreen} 
          options={{ headerShown: false }}
          />
        <Stack.Screen 
          name="UserProfileScreen" 
          component={UserProfileScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ChangePassword" 
          component={ChangePassword} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AccountInfo" 
          component={AccountInfo} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="OrderConfirmation" 
          component={OrderConfirmation} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="CartScreen" 
          component={CartScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="CheckoutScreen" 
          component={CheckoutScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>

    </NavigationContainer>
    
  );
};

export default App;
