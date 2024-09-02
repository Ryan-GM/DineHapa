import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const CheckoutScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [useShippingAddress, setUseShippingAddress] = useState(false);
  const [mpesaNumber, setMpesaNumber] = useState('');
  
  const navigation = useNavigation();

  const renderPaymentOption = (method, title) => (
    <TouchableOpacity
      style={[styles.paymentOption, paymentMethod === method && styles.selectedPaymentOption]}
      onPress={() => setPaymentMethod(method)}
    >
      <Text style={styles.paymentOptionText}>{title}</Text>
    </TouchableOpacity>
  );

  const handlePayNow = () => {
    // You can add any validation or payment processing logic here
    if (paymentMethod === 'mpesa' && mpesaNumber) {
      // If payment method is M-Pesa and a phone number is provided, navigate to Order Confirmation
      navigation.navigate('OrderConfirmation');
    } else if (paymentMethod === 'card' && cardNumber && expirationDate && securityCode && nameOnCard) {
      // If payment method is card and all card details are provided, navigate to Order Confirmation
      navigation.navigate('OrderConfirmation');
    } else {
      alert('Please complete the payment details.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Payment</Text>
        <Text style={styles.subtitle}>All transactions are secure and encrypted</Text>

        {renderPaymentOption('card', 'Credit or Debit Card')}
        {paymentMethod === 'card' && (
          <View style={styles.cardForm}>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfWidth]}
                placeholder="Expiration Date (MM/YY)"
                value={expirationDate}
                onChangeText={setExpirationDate}
              />
              <TextInput
                style={[styles.input, styles.halfWidth]}
                placeholder="Security Code"
                value={securityCode}
                onChangeText={setSecurityCode}
                keyboardType="numeric"
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Name on Card"
              value={nameOnCard}
              onChangeText={setNameOnCard}
            />
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setUseShippingAddress(!useShippingAddress)}
            >
              <Text>Use shipping address as billing address</Text>
            </TouchableOpacity>
          </View>
        )}

        {renderPaymentOption('mpesa', 'M-Pesa')}
        {paymentMethod === 'mpesa' && (
          <View style={styles.mpesaForm}>
            <TextInput
              style={styles.input}
              placeholder="M-Pesa Phone Number"
              keyboardType="phone-pad"
              value={mpesaNumber}
              onChangeText={setMpesaNumber}
            />
          </View>
        )}

        <TouchableOpacity style={styles.payNowButton} onPress={handlePayNow}>
          <Text style={styles.payNowButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  paymentOption: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedPaymentOption: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  paymentOptionText: {
    fontSize: 16,
  },
  cardForm: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mpesaForm: {
    marginBottom: 20,
  },
  payNowButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  payNowButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
