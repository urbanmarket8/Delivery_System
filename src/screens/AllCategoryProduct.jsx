import { View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import LargeProductCard from "../components/Product/LargeProductCard";
import { getProductsByCategory } from "../api1/ProductsAPI";

export default function AllCategoryProduct({ route }) {
  const { category, shopId } = route.params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProductsByCategory(category, shopId);
        setProducts(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const navigation = useNavigation();
  return (
    <View className="px-2 mt-10 space-y-2">
      <View className="flex flex-row justify-between py-3 px-3 bg-white">
        <View className="flex flex-row items-center space-x-3">
          <Text onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#4C5058" />
          </Text>
          <Text className="font-medium text-[20px] text-[#4C5058]">{category}</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row flex-wrap gap-x-5 gap-y-3">
          {products &&
            products.map((product) => {
              return (
                <View key={product._id}>
                  <LargeProductCard product={product} />
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}
