import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CarouselScreen from './screens/CarouselScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';

import main from './screens/AdminDashboard/main';

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
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="Admin Dashboard" 
          component={main} 
          options={{ headerShown: false }} 
        />

        
      </Stack.Navigator>

    </NavigationContainer>
    
  );
};

export default App;
