import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, NativeEventEmitter } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderList = () => {
  const navigation = useNavigation()
  return (
    <View className="mt-2">
      <View className="flex justify-between items-center flex-row">
        <Text className="text-xl font-semibold">Orders</Text>
        <TouchableOpacity onPress={() => navigation.navigate("DeliveriesScreen")}>
          <Text className="text-[#539645] text-center">See All</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.container}>
        <View style={styles.orderItem}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
          <View style={styles.orderDetails}>
            <Text style={styles.orderText}>
              <Text style={styles.userName}>Tanbir Ahmed</Text> Placed a new order
            </Text>
            <Text style={styles.orderTime}>20 min ago</Text>
          </View>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.orderImage} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <View style={styles.orderItem}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
          <View style={styles.orderDetails}>
            <Text style={styles.orderText}>
              <Text style={styles.userName}>Tanbir Ahmed</Text> Placed a new order
            </Text>
            <Text style={styles.orderTime}>20 min ago</Text>
          </View>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.orderImage} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <View style={styles.orderItem}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
          <View style={styles.orderDetails}>
            <Text style={styles.orderText}>
              <Text style={styles.userName}>Tanbir Ahmed</Text> Placed a new order
            </Text>
            <Text style={styles.orderTime}>20 min ago</Text>
          </View>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.orderImage} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F3F4F8',
    borderRadius: 15,
    marginTop: 10
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  orderDetails: {
    flex: 1,
    paddingHorizontal: 10,
  },
  orderText: {
    fontSize: 16,
    color: '#333',
  },
  userName: {
    fontWeight: 'bold',
    color: '#000',
  },
  orderTime: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});

export default OrderList;
