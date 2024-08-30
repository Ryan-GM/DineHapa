import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';

const LocationScreen = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
    })();
}, []);

const handleUseCurrentLocation = async () => {
    try {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({});

      if (currentLocation && currentLocation.coords) {
        // Reverse geocode to get address from coordinates
        const [reverseGeocodedAddress] = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        if (reverseGeocodedAddress) {
          const formattedAddress = `${reverseGeocodedAddress.city}, ${reverseGeocodedAddress.region}, ${reverseGeocodedAddress.country}`;
          setAddress(formattedAddress);
          setLocation(formattedAddress);
          // Navigate to the next screen
          navigation.navigate('HomeScreen', { address: formattedAddress });
          Alert.alert('Location accessed!', `Address: ${formattedAddress}`);
        } else {
          Alert.alert('Error', 'Failed to get the address');
        }
      } else {
        Alert.alert('Error', 'Failed to retrieve location coordinates');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to get current location');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/location.png')} 
        style={styles.image} 
      />
      <Text style={styles.title}>Find Nearby Restaurants</Text>
      <Text style={styles.subtitle}>
        Enter your location or allow access to your location to find restaurants near you.
      </Text>
      
      <TouchableOpacity style={styles.locationButton} onPress={handleUseCurrentLocation}>
        <Icon name="map-pin" size={20} color="#888" />
        <Text style={styles.buttonText}>Use current location</Text>
      </TouchableOpacity>
      {location && (
        <Text>Current Location: { address }</Text>
      )}

      <GooglePlacesAutocomplete
        placeholder="Enter a new address"
        onPress={(data, details = null) => {
            setLocation(data.description);
            setAddress(data.description);
            navigation.navigate('HomeScreen', { address: data.description }); // Navigate to HomeScreen with selected address
          }}
        query={{
          key: 'YOUR_GOOGLE_API_KEY',
          language: 'en',
        }}
        textInputProps={{
          value: location,
          onChangeText: (text) => setLocation(text),
        }}
        styles={{
          textInputContainer: {
            ...styles.inputContainer,
            backgroundColor: location ? '#f9f9f9' : '#f5f5f5',
          },
          textInput: {
            height: 48,
            color: '#333',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 40,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

export default LocationScreen;
