import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';


export default function NotificationsScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View className="flex-row space-x-3 items-center p-2 bg-white rounded-md mt-10">
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Icon name="arrow-left" size={20} color="#4C5058" />
                </TouchableOpacity>
                <Text className="text-[23px] font-medium text-[#4C5058]">
                    Notification
                </Text>
            </View>
            <View style={styles.headerContainer}>
                <Text className="text-[15px] font-medium text-[#4C5058]">Currently <Text style={styles.headerText}>8 notifications</Text> are displayed.</Text>
            </View>
            <View style={styles.listContainer}>
                <View style={styles.notificationItem} >
                    <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
                    <View style={styles.notificationDetails}>
                        <Text style={styles.notificationText}>
                            <Text style={styles.boldText}>Tanbir Ahmed</Text> Placed a new order
                        </Text>
                        <Text style={styles.timeText}>20 min ago</Text>
                    </View>
                </View>
            </View>
            <View style={styles.listContainer}>
                <View style={styles.notificationItem} >
                    <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
                    <View style={styles.notificationDetails}>
                        <Text style={styles.notificationText}>
                            <Text style={styles.boldText}>Tanbir Ahmed</Text> Placed a new order
                        </Text>
                        <Text style={styles.timeText}>20 min ago</Text>
                    </View>
                </View>
            </View>
            <View style={styles.listContainer}>
                <View style={styles.notificationItem} >
                    <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
                    <View style={styles.notificationDetails}>
                        <Text style={styles.notificationText}>
                            <Text style={styles.boldText}>Tanbir Ahmed</Text> Placed a new order
                        </Text>
                        <Text style={styles.timeText}>20 min ago</Text>
                    </View>
                </View>
            </View>
            <View style={styles.listContainer}>
                <View style={styles.notificationItem} >
                    <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
                    <View style={styles.notificationDetails}>
                        <Text style={styles.notificationText}>
                            <Text style={styles.boldText}>Tanbir Ahmed</Text> Placed a new order
                        </Text>
                        <Text style={styles.timeText}>20 min ago</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 40
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4C5058'
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#FFA500',
        paddingBottom: 5,
    },
    inactiveTab: {
        paddingBottom: 5,
    },
    activeTabText: {
        color: '#FFA500',
        fontWeight: 'bold',
        fontSize: 16,
    },
    inactiveTabText: {
        color: '#a0a0a0',
        fontSize: 16,
    },
    listContainer: {
        paddingHorizontal: 20,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    notificationDetails: {
        flex: 1,
    },
    notificationText: {
        fontSize: 16,
        color: '#555',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#4C5058',
    },
    timeText: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
    },
    bottomTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    headerContainer: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF8C42', // Use the orange color from the image
    },
    underline: {
        width: 100, // Adjust width for underline
        height: 3, // Thickness of the underline
        backgroundColor: '#FF8C42', // Orange underline
        marginTop: 5, // Space between the text and the underline
    },
});
