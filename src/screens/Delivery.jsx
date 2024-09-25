import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontistoIcon from "react-native-vector-icons/Fontisto";

export default function DeliveriesScreen() {
    const navigation = useNavigation();

    return (
        <View className="mt-10 flex-1">
            <View className="flex flex-row items-center justify-between py-3 px-3 bg-white">
                <View className="flex flex-row items-center space-x-3">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color="#4C5058" />
                    </TouchableOpacity>
                    <Text className="text-lg font-semibold text-[#4C5058]">Deliveries</Text>
                </View>
            </View>
            <ScrollView
                className="px-4 py-3 bg-white mt-2 space-y-4"
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View className="flex-row space-x-2 items-center">
                    <FontistoIcon name="stopwatch" size={30} color="#4C5058" />
                    <View>
                        <Text className="text-lg font-semibold text-[#4C5058]">All Deliveries</Text>
                        <Text>A total of <Text className="text-[15px] font-medium">8</Text> delivery tasks are displayed.</Text>
                    </View>
                </View>
                <ScrollView>
                    <TouchableOpacity style={styles.container}>
                        <View style={styles.orderItem}>
                            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
                            <View style={styles.orderDetails}>
                                <View style={styles.orderText}>
                                    <Text style={styles.userName}>Tanbir Ahmed</Text>
                                    <Text>Placed a new order</Text>
                                </View>
                                <Text style={styles.orderTime}>20 min ago</Text>
                            </View>
                            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.orderImage} />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </ScrollView>
        </View>
    );
}

// const styles = {
//     footer: {
//         position: "absolute",
//         bottom: 0,
//         left: 0,
//         right: 0,
//         padding: 16,
//         backgroundColor: "white",
//         zIndex: 50,
//     },
// };
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
        display: 'flex',
        flexDirection: 'column'
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
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: "white",
        zIndex: 50,
    },
});
