import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import MaterialIcon from "react-native-vector-icons/Feather";

import SearchBar from "./SearchBar";
export default function Header() {
  const navigation = useNavigation();
  return (
    <View className="w-[100%]">
      <View className="w-full flex flex-row justify-between items-center">
        <View style={styles.container}>
          <Image
            // source={{ uri: "https://i.postimg.cc/SRB6R1nh/motorcycle.png" }}
            source={require('../../../assets/motorcycle.png')} 
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.text}>Belly Baskect</Text>
        </View>
        <View className="flex flex-row justify-center items-center">
          <TouchableOpacity onPress={()=>navigation.navigate("NotificationsScreen")}>
            <View style={styles.iconContainer}>
              <MaterialIcon name="bell" size={22} color="#575555" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <SearchBar />
    </View>
  );
}


const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    backgroundColor: '#faf9f9',
    borderRadius: 50, // makes the background circular
    padding: 10,
    marginRight:5
  },
  badge: {
    position: 'absolute',
    right: -4, // adjust position to fit correctly
    top: -2,
    backgroundColor: '#FF0000',
    borderRadius: 8, // rounded shape for the badge
    width: 15,
    height: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5, 
  },
  icon: {
    width: 50,
    height: 50,
  },
  text: {
    marginLeft: 10,
    fontSize: 20,
    color: "#575555",
    fontWeight: "bold",
  },
});
