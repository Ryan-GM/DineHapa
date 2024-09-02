import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AddReviewForm = ({ restaurantId, onReviewAdded }) => {
  const [user, setUser] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (!user || !rating || !comment) {
      Alert.alert('Please fill out all fields.');
      return;
    }

    const numericRating = parseInt(rating, 10);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      Alert.alert('Rating must be a number between 1 and 5.');
      return;
    }

    try {
      const response = await fetch(`http://192.168.100.2:5000/api/reviews/${restaurantId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, rating: numericRating, comment }),
      });

      const responseText = await response.text(); // Read response as text first
      console.log('Response Text:', responseText);

      const result = JSON.parse(responseText);

      if (result.status === 'success') {
        Alert.alert('Review added successfully!');
        onReviewAdded(); // Callback to refresh the reviews
        setUser('');
        setRating('');
        setComment('');
      } else {
        throw new Error(result.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error adding review:', error);
      Alert.alert('Error adding review. Please try again.');
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating (1-5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Your Review"
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <Button title="Submit Review" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default AddReviewForm;
