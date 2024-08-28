import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, Modal, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// Mock data
const allRestaurants = [
  { id: '1', name: 'Subway', rating: 4.5, distance: 0.2, shipping: 'Free shipping', category: 'Sandwich', price: '$$', cuisine: 'American' },
  { id: '2', name: 'Taco Bell', rating: 4.5, distance: 1.5, shipping: 'Free shipping', category: 'Fast', price: '$', cuisine: 'Mexican' },
  { id: '3', name: 'Burger King', rating: 4.8, distance: 2.6, shipping: 'Free shipping', category: 'Burger', price: '$', cuisine: 'American' },
  { id: '4', name: 'KFC', rating: 4.0, distance: 3.0, shipping: 'Free shipping', category: 'Fastfood', price: '$$', cuisine: 'American' },
  { id: '5', name: 'Pizza Hut', rating: 4.2, distance: 1.8, shipping: '$2 delivery', category: 'Pizza', price: '$$', cuisine: 'Italian' },
  { id: '6', name: 'Panda Express', rating: 4.1, distance: 2.2, shipping: 'Free shipping', category: 'Chinese', price: '$$', cuisine: 'Chinese' },
];

const categories = ['All', 'Sandwich', 'Pizza', 'Burgers', 'Chinese', 'Mexican', 'Italian'];
const cuisines = ['All', 'American', 'Mexican', 'Italian', 'Chinese'];
const priceRanges = ['All', '$', '$$', '$$$', '$$$$'];

const RestaurantCard = ({ name, rating, distance, shipping, category, price, cuisine, navigation }) => (
  <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('RestaurantDetailScreen')}>
    <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.restaurantImage} />
    <View style={styles.cardContent}>
      <Text style={styles.restaurantName}>{name}</Text>
      <Text>{category} • {cuisine} • {price}</Text>
      <Text>{rating} ⭐️ • {distance} km • {shipping}</Text>
    </View>
  </TouchableOpacity>
);

const DropdownPicker = ({ options, selectedValue, onValueChange, title }) => (
  <TouchableOpacity style={styles.dropdownButton} onPress={() => onValueChange(title)}>
    <Text>{title}: {selectedValue}</Text>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [restaurants, setRestaurants] = useState(allRestaurants);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', options: [], currentValue: '', onSelect: null });

  const navigation = useNavigation(); // Access the navigation prop

  useEffect(() => {
    filterRestaurants();
  }, [searchQuery, selectedCategory, selectedCuisine, selectedPrice]);

  const filterRestaurants = () => {
    let filteredRestaurants = allRestaurants;

    if (searchQuery) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.category === selectedCategory);
    }

    if (selectedCuisine !== 'All') {
      filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.cuisine === selectedCuisine);
    }

    if (selectedPrice !== 'All') {
      filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.price === selectedPrice);
    }

    setRestaurants(filteredRestaurants);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const openModal = (title, options, currentValue, onSelect) => {
    setModalContent({ title, options, currentValue, onSelect });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>DineHapa</Text> */}
        {/* <Text>Santa Nella, CA 95322</Text> */}
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for restaurants, cuisines..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <View style={styles.dropdownContainer}>
          <DropdownPicker
            options={cuisines}
            selectedValue={selectedCuisine}
            onValueChange={() => openModal('Cuisine', cuisines, selectedCuisine, setSelectedCuisine)}
            title="Cuisine"
          />
          <DropdownPicker
            options={priceRanges}
            selectedValue={selectedPrice}
            onValueChange={() => openModal('Price', priceRanges, selectedPrice, setSelectedPrice)}
            title="Price"
          />
        </View>
      </View>

      <ScrollView>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.categoryItem, 
                selectedCategory === category && styles.selectedCategory
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={selectedCategory === category ? styles.selectedCategoryText : styles.categoryText}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Featured Restaurants</Text>
        <FlatList
          data={restaurants.slice(0, 3)}
          renderItem={({ item }) => <RestaurantCard {...item} navigation={navigation} />} // Pass navigation prop
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} navigation={navigation} /> // Pass navigation prop
        ))}

        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Explore More</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{modalContent.title}</Text>
          {modalContent.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.modalOption,
                modalContent.currentValue === option && styles.selectedModalOption
              ]}
              onPress={() => {
                modalContent.onSelect(option);
                closeModal();
              }}
            >
              <Text style={modalContent.currentValue === option ? styles.selectedModalOptionText : styles.modalOptionText}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownButton: {
    flex: 1,
    marginRight: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f8f8f8',
  },
  selectedCategory: {
    backgroundColor: '#ff6347',
  },
  categoryText: {
    fontSize: 16,
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  cardContent: {
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ctaButton: {
    margin: 15,
    paddingVertical: 15,
    backgroundColor: '#ff6347',
    borderRadius: 25,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  selectedModalOption: {
    backgroundColor: '#ff6347',
  },
  modalOptionText: {
    fontSize: 16,
  },
  selectedModalOptionText: {
    color: '#fff',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff6347',
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default HomeScreen;
