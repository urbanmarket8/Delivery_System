import React from "react";
import { ScrollView } from "react-native";
import BestSeller from "../components/BestSeller/BestSeller";
import Feature from "../components/Feature/Feature";
import Header from "../components/Header/Header";
import MenuScreen from "../components/Menu/menu";
import TrackingParcel from "../components/Location/location";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="py-2 px-3 bg-white mt-10 pb-2"
    >
      <Header />
      <BestSeller />
      <MenuScreen />
      <Feature />
      <TrackingParcel />
    </ScrollView>
  );
}
