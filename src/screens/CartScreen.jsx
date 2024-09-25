import AsyncStorage from "@react-native-async-storage/async-storage"; // For handling user token storage
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  removeProduct,
  updateCartToast,
} from "../features/cartSlice";

export default function CartScreen() {
  const { products, totalQuantity, totalPrice, discountedPrice, CartToast } =
    useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addOrUpdateProductInStorage = async (product) => {
    try {
      const savedProducts = await AsyncStorage.getItem("cartProducts");
      let productsArray = savedProducts ? JSON.parse(savedProducts) : [];
      const existingProduct = productsArray.find((p) => p._id === product._id);

      if (existingProduct) {
        productsArray = productsArray.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        productsArray.push({ ...product, quantity: 1 });
      }
      await AsyncStorage.setItem("cartProducts", JSON.stringify(productsArray));
    } catch (error) {
      console.error("Error updating product in AsyncStorage:", error);
    }
  };

  const decrementProductInStorage = async (product) => {
    try {
      const savedProducts = await AsyncStorage.getItem("cartProducts");
      let productsArray = savedProducts ? JSON.parse(savedProducts) : [];

      const existingProduct = productsArray.find((p) => p._id === product._id);

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          productsArray = productsArray.map((p) =>
            p._id === product._id ? { ...p, quantity: p.quantity - 1 } : p
          );
        } else {
          productsArray = productsArray.filter((p) => p._id !== product._id);
        }
        await AsyncStorage.setItem(
          "cartProducts",
          JSON.stringify(productsArray)
        );
      }
    } catch (error) {
      console.error("Error removing product from AsyncStorage:", error);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addProduct({ product }));
    addOrUpdateProductInStorage(product);
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeProduct({ product }));
    decrementProductInStorage(product); // Decrement or remove product from AsyncStorage
  };

  const buyproduct = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken"); // Assuming token is stored in AsyncStorage
      if (!token) {
        dispatch(updateCartToast(true));
        navigation.navigate("Login");
      } else {
        console.log("User is logged in, proceeding with purchase...");
      }
    } catch (error) {
      console.error("Error checking authentication status:", error);
    }
  };

  if (products.length === 0) {
    return (
      <View className="mt-10 flex-1">
        <View className="flex flex-row items-center justify-between py-3 px-3 bg-white">
          <View className="flex flex-row items-center space-x-3">
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Icon name="arrow-left" size={25} color="#000" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold">My Cart</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
        <View
          className="flex-1 justify-center items-center mt-3"
          style={{ backgroundColor: "white" }}
        >
          <Image
            source={require("../../assets/market.png")}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
          />
          <Text className="text-lg font-semibold mt-4">
            You don't have any items in your cart
          </Text>
          <Text className="text-base text-gray-500 mt-1">
            Your favourite items are just a click away
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="bg-green-500 mt-4 py-2 px-6 rounded-md"
          >
            <Text className="text-white text-center font-bold">
              Start Shopping
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="mt-10 flex-1">
      <View className="flex flex-row items-center justify-between py-3 px-3 bg-white">
        <View className="flex flex-row items-center space-x-3">
          <TouchableOpacity
            onPress={() => {
              dispatch(updateCartToast(true));
              navigation.navigate("Home");
            }}
          >
            <Icon name="arrow-left" size={25} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">My Cart</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(updateCartToast(true));
            navigation.navigate("Home");
          }}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        className="px-4 py-3 bg-white mt-2 space-y-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row space-x-2 items-center">
          <FontistoIcon name="stopwatch" size={30} color="#000" />
          <View>
            <Text className="text-lg font-semibold">
              Delivery in 17 minutes
            </Text>
            <Text>Shipment of {totalQuantity} item(s)</Text>
          </View>
        </View>
        {products.map((product) => (
          <View key={product._id}>
            <View className="flex-row justify-between items-center bg-[#F8F8F8] p-3 rounded-lg">
              <View className="border border-gray-200 rounded-xl p-1">
                <Image
                  source={{
                    uri: `http://172.20.100.24:8080/${product.image[0]}`,
                  }}
                  alt={product.name}
                  className="w-20 h-20"
                />
              </View>
              <View className="flex-1 mx-3">
                <Text className="w-48 h-auto text-[15px] text-[#333333] font-semibold">
                  {`${product.name.substring(0, 25)} ${
                    product.name.length > 25 ? "..." : ""
                  }`}
                </Text>
                <Text className="text-sm">
                  {`${product.description.substring(0, 25)} ${
                    product.description.length > 25 ? "..." : ""
                  }`}
                </Text>
                {product.discountPercent > 0 ? (
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={{ fontWeight: "500" }}>
                      ₹{discountedPrice}
                    </Text>
                    <Text
                      style={{
                        textDecorationLine: "line-through",
                        color: "#7D8288",
                      }}
                    >
                      ₹{product.price}
                    </Text>
                  </View>
                ) : (
                  <Text style={{ fontWeight: "500" }}>₹{product.price}</Text>
                )}
              </View>

              <View className="flex-row items-center bg-green-400 rounded-lg">
                <TouchableOpacity
                  className="px-2 py-1"
                  onPress={() => handleRemoveFromCart(product)}
                >
                  <Text className="text-white text-xl">-</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-2 py-1">
                  <Text className="text-white">{product.quantity}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="px-2 py-1"
                  onPress={() => handleAddToCart(product)}
                >
                  <Text className="text-white">+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="bg-[#F8F8F8] p-4 rounded-lg space-y-1">
              <Text className="font-semibold">Bill details</Text>
              <View className="flex-row justify-between">
                <Text>Items total</Text>
                {product.discountPercent > 0 ? (
                  <View className="flex flex-row">
                    <Text
                      className="mr-1"
                      style={{
                        textDecorationLine: "line-through",
                        color: "#7D8288",
                      }}
                    >
                      ₹{product.price}
                    </Text>
                    <Text style={{ fontWeight: "500" }}>₹{totalPrice}</Text>
                  </View>
                ) : (
                  <Text style={{ fontWeight: "500" }}>₹{product.price}</Text>
                )}
              </View>
              <View className="flex-row justify-between">
                <Text>Delivery charge</Text>
                {totalPrice > 100 ? (
                  <View className="flex flex-row">
                    <Text className="mr-1 line-through text-[#7D8288]">
                      ₹25
                    </Text>
                    <Text className="text-blue-700">FREE</Text>
                  </View>
                ) : (
                  <Text>₹25</Text>
                )}
              </View>
              <View className="flex-row justify-between">
                <Text>Handling charge</Text>
                <Text>₹2</Text>
              </View>
              {totalPrice > 100 ? (
                <View className="flex-row justify-between font-bold">
                  <Text>Grand total</Text>
                  <Text>₹{totalPrice + 2}</Text>
                </View>
              ) : (
                <View className="flex-row justify-between font-bold">
                  <Text>Grand total</Text>
                  <Text>₹{totalPrice + 25 + 2}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
        <View className="bg-[#F8F8F8] p-4 rounded-lg">
          <Text className="font-semibold">Cancellation Policy</Text>
          <Text className="text-sm text-gray-500">
            Orders cannot be cancelled once packed for delivery. In case of
            unexpected delays, a refund will be provided, if applicable.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          className="bg-green-500 py-3 rounded-lg"
          onPress={buyproduct}
        >
          <View className="flex justify-between items-center flex-row px-3">
            {totalPrice > 100 ? (
              <View>
                <Text className="text-[#F8F8F8] text-center font-bold">
                  ₹{totalPrice + 2}
                </Text>
                <Text className="text-[#F8F8F8] text-center font-bold text-[15px]">
                  Total
                </Text>
              </View>
            ) : (
              <View>
                <Text className="text-[#F8F8F8] text-center font-bold">
                  ₹{totalPrice + 25 + 2}
                </Text>
                <Text className="text-[#F8F8F8] text-center font-bold text-[15px]">
                  Total
                </Text>
              </View>
            )}
            <Text className="text-white text-center font-bold text-[16px]">
              Login to Proceed
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "white",
    zIndex: 50,
  },
};
