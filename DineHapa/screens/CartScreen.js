import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Prime Beef - Pizza Beautiful', quantity: 2, price: 20.99 },
    { id: '2', name: 'Double BBQ bacon cheese burger', quantity: 2, price: 15.99 },
  ]);
  const [promoCode, setPromoCode] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  return (
    <SafeAreaView>
      <Text>Cart Screen</Text>
    </SafeAreaView>
  );
};

export default CartScreen;
