import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/Feather";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import { useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
  updateCartToast,
} from "../features/cartSlice";

export default function ProductDetailsScreen({ route }) {
  const { productItem, shopId } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const discountValue = productItem.price * (productItem.discountPercent / 100);
  const newPrice = productItem.price - discountValue;

  const [productInCart, setProductInCart] = useState(null); // Track product in AsyncStorage

  useEffect(() => {
    const getProductFromStorage = async () => {
      try {
        const savedProducts = await AsyncStorage.getItem("cartProducts");
        let productsArray = savedProducts ? JSON.parse(savedProducts) : [];
        const existingProduct = productsArray.find(
          (p) => p._id === productItem._id
        );

        if (existingProduct) {
          setProductInCart(existingProduct); // If product exists, set in state
        }
      } catch (error) {
        console.error("Error getting product from AsyncStorage:", error);
      }
    };

    getProductFromStorage();
  }, [productItem]);

  const addOrUpdateProductInStorage = async (product, action) => {
    try {
      const savedProducts = await AsyncStorage.getItem("cartProducts");
      let productsArray = savedProducts ? JSON.parse(savedProducts) : [];
      const existingProduct = productsArray.find((p) => p._id === product._id);

      if (existingProduct) {
        productsArray = productsArray.map((p) =>
          p._id === product._id
            ? {
              ...p,
              quantity: action === "add" ? p.quantity + 1 : p.quantity - 1,
            }
            : p
        );
      } else {
        productsArray.push({ ...product, quantity: 1 });
      }

      const updatedProduct = productsArray.find((p) => p._id === product._id);
      setProductInCart(updatedProduct);
      await AsyncStorage.setItem("cartProducts", JSON.stringify(productsArray));
    } catch (error) {
      console.error("Error updating product in AsyncStorage:", error);
    }
  };

  const removeProductFromStorage = async (product) => {
    try {
      const savedProducts = await AsyncStorage.getItem("cartProducts");
      let productsArray = savedProducts ? JSON.parse(savedProducts) : [];
      productsArray = productsArray.filter((p) => p._id !== product._id);
      await AsyncStorage.setItem("cartProducts", JSON.stringify(productsArray));
      setProductInCart(null);
    } catch (error) {
      console.error("Error removing product from AsyncStorage:", error);
    }
  };

  const handleAddToCart = (productItem) => {
    dispatch(addProduct({ product: productItem }));
    dispatch(updateCartToast(true));
    addOrUpdateProductInStorage(productItem, "add");
  };

  const handleRemoveFromCart = (product) => {
    if (productInCart.quantity > 1) {
      dispatch(removeProduct({ product }));
      addOrUpdateProductInStorage(product, "remove");
    } else {
      dispatch(removeProduct({ product }));
      removeProductFromStorage(product);
    }
  };

  return (
    <>
      <View className="px-4 pt-3">
        <View className="flex flex-row items-center justify-start space-x-3 mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              name="arrow-left-circle"
              size={25}
              color="#575555"
            />
          </TouchableOpacity>
          <View>
            <Text className="text-[20px] font-semibold text-[#575555]">
              Delivery in Sometimes
            </Text>
            <Text className="text-[#575555]">Your address will show here</Text>
          </View>
        </View>
      </View>
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <View className="items-center mb-4">
          <Image
            source={{
              uri: `http://172.20.100.24:8080/${productItem.image[0]}`,
            }}
            style={{ width: "100%", height: 300 }}
          />
        </View>
        <View style={{ borderBottomColor: "#afabab", borderBottomWidth: 1 }}>
          <Text className="text-xl font-semibold text-[#3d3c3c]">
            {productItem.name}
          </Text>
          <View className="flex-row space-x-1 items-center">
            <FontistoIcon name="stopwatch" size={12} color="#3d3c3c" />
            <View>
              <Text className="text-[13px] font-semibold text-[#3d3c3c]">
                Delivery in 17 minutes
              </Text>
            </View>
          </View>
          <TouchableOpacity className="flex flex-row space-x-0 items-center mb-3 mt-1" onPress={() => {
            navigation.navigate("AllCategoryProduct", {
              category: productItem.category,
              shopId: shopId
            });
          }}>
            <Text className="text-[#539645] text-start">
              View all products by {productItem.category}
            </Text>
            <Entypo name="triangle-right" size={15} color="#539645" />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-center justify-between mb-1 mt-3">
          {productItem.discountPercent > 0 ? (
            <View>
              <Text className="text-base font-bold text-[#3d3c3c]">
                ₹ {newPrice}
              </Text>
              <Text className="text-[#838486] line-through">
                ₹ {productItem.price}
              </Text>
              <Text className="text-[#707172] mt-1">Inclusive of all taxes</Text>
              <View className="absolute top-0 left-12" style={{ zIndex: 1000 }}>
                <Image
                  source={require("../../assets/discount-badge.png")}
                  style={{ width: 55, height: 55, zIndex: 40 }}
                />
                <View
                  className="absolute text-white font-bold text-center"
                  style={{
                    zIndex: 50,
                    top: "13%",
                    left: "30%",
                  }}
                >
                  <Text
                    style={{ fontSize: 10, color: "white", fontWeight: "500" }}
                  >
                    {productItem.discountPercent}%
                  </Text>
                  <Text
                    style={{ fontSize: 10, color: "white", fontWeight: "500" }}
                  >
                    OFF
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Text className="text-base font-bold text-[#3d3c3c]">
                ₹ {productItem.price}
              </Text>
              <Text className="text-[#707172]">Inclusive of all taxes</Text>
            </View>
          )}

          {productInCart && productInCart.quantity > 0 ? (
            <View className="flex-row items-center bg-green-400 rounded-lg">
              <TouchableOpacity
                className="px-2 py-1"
                onPress={() => handleRemoveFromCart(productItem)}
              >
                <Text className="text-white text-xl">-</Text>
              </TouchableOpacity>
              <View className="px-2 py-1">
                <Text className="text-white">{productInCart.quantity}</Text>
              </View>
              <TouchableOpacity
                className="px-2 py-1"
                onPress={() => handleAddToCart(productItem)}
              >
                <Text className="text-white">+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "green",
                padding: 12,
                borderRadius: 5,
              }}
              onPress={() => handleAddToCart(productItem)}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Add to Cart
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View className="pb-3">
          <Text className="text-lg font-semibold text-[#3d3c3c]">
            Product Details
          </Text>
          <View>
            <View>
              <Text className="text-gray-900">Description :</Text>
              <Text className="text-gray-700">{productItem.description}</Text>
            </View>

            <View>
              <Text className="text-gray-900">Type :</Text>
              <Text className="text-gray-700">{productItem.category}</Text>
            </View>

            <View>
              <Text className="text-gray-900">Disclaimer :</Text>
              <Text className="text-gray-700">
                Every effort is made to maintain the accuracy of all
                information. However, actual product packaging and materials may
                contain more and/or different information. It is recommended not
                to solely rely on the information presented.
              </Text>
            </View>
            <View>
              <Text className="text-gray-900">Country of Origin :</Text>
              <Text className="text-gray-700">India </Text>
            </View>
            <View>
              <Text className="text-gray-900">Return Policy :</Text>
              <Text className="text-gray-700">
                The product is non-returnable. For a damaged, rotten or
                incorrect item, you can request a replacement within 48 hours of
                delivery. In case of an incorrect item, you may raise a
                replacement or return request only if the item is sealed/
                unopened/ unused and in original condition.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
