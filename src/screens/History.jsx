import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const DataHistoryPage = () => {
  const navigation = useNavigation()
  const handleDelete = (id) => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setData((prevData) => prevData.filter());
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View style={styles.container}>
      <View className="flex flex-row items-center justify-between py-3 px-3 bg-white mt-10 mb-3">
        <View className="flex flex-row items-center space-x-3">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#4C5058" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-[#4C5058]">Deliveries</Text>
        </View>
      </View>
      <ScrollView style={styles.listContainer}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Order #101</Text>
              <Text style={styles.cardDate}>23/09/2024</Text>
            </View>
            <Text style={styles.cardDescription}>Order delivered</Text>
            <Text style={styles.cardStatus}>Delivered</Text>
          </View>
          <TouchableOpacity onPress={() => handleDelete()} style={styles.deleteButton}>
            <FeatherIcon name="trash-2" size={20} color="#ff5252" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'column',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDate: {
    fontSize: 14,
    color: '#888',
  },
  cardDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },
  cardStatus: {
    fontSize: 14,
    color: '#ff8c42',
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: 45,
    right: 30,
    marginLeft: 10,
    padding: 5,
  },
});

export default DataHistoryPage;