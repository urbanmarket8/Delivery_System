import React, { useState, useEffect } from 'react';
import { Text, Alert, View, TouchableOpacity, Button } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { orderCreate } from '../api1/PaymentAPI';

const RazorpayPayment = () => {
  const handlePayment = async () => {
    try {
      const orderResponse = await orderCreate(500); // Amount is passed in the smallest unit (INR)
      if (orderResponse.success) {
        const orderData = orderResponse.data;
        const options = {
          description: 'Test Transaction',
          currency: orderData.currency, // INR
          key: 'rzp_test_Rh5hj15XBv8XmI', // Replace with your Razorpay Key ID
          amount: orderData.amount, // Amount from the order creation (in smallest unit)
          order_id: orderData.id, // Order ID created by Razorpay
          name: 'Your Company Name',
          prefill: {
            email: 'useremail@example.com',
            contact: '9999999999',
            name: 'John Doe',
          },
          theme: { color: '#53a20e' }, // Customization
        };
        RazorpayCheckout.open(options)
          .then((data) => {
            Alert.alert(`Success: Payment ID - ${data.razorpay_payment_id}`);
          })
          .catch((error) => {
            console.log(error, "error");
            
            Alert.alert(`Error: ${error}`);
          });
      } else {
        Alert.alert('Error', orderResponse.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Error initiating payment', error);
      Alert.alert('Error', 'Unable to initiate payment');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pay with Razorpay" onPress={handlePayment} />
    </View>
  );
};

export default RazorpayPayment;