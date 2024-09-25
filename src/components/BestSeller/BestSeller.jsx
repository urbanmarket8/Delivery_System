import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function BestSeller() {
  return (
    <View>
      <View style={styles.adContainer}>
        <Image
          source={{ uri: "https://i.postimg.cc/90q4DzpK/ad-small-1-3x.png" }}
          style={styles.adImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adContainer: {
    marginTop: 10,
  },
  adImage: {
    width: "100%",
    height: 175,
    borderRadius: 10,
  },
});
