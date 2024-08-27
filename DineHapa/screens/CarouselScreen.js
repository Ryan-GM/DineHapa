import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

const entries = [
  {
    title: 'Diverse & sparkling food.',
    text: 'We use the best local ingredients to create fresh and delicious food and drinks.',
    image: require('../assets/food.png'), 
  },
  {
    title: 'Free shipping on all orders',
    text: 'Free shipping on the primary order whilst the usage of CaPay fee method.',
    image: require('../assets/shipping.jpg'), 
  },
  {
    title: '+24K Restaurants',
    text: 'Easily find your favorite food and have it delivered in record time.',
    image: require('../assets/restaurants.png'), 
  }
];

const CarouselScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={entries}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width - 60}
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: '100%',
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  button: {
    backgroundColor: '#f5a623',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default CarouselScreen;
