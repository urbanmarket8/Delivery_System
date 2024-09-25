import React, { useEffect, useRef } from "react";
import { Animated, Easing, Modal, StyleSheet, Text, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const ErrorModal = ({ visible, onClose, message }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
      const timer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start(() => {
          onClose();
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <View className="flex flex-row justify-start items-center ml-2 mt-1">
            <FeatherIcon name="x-circle" size={23} color="#4C5058" />
            <Text className="ml-1 text-[16px] text-[#4C5058]">Error</Text>
          </View>
          <View className="flex flex-row justify-start items-center ml-2 mt-1">
            <Text style={styles.message}>{message}</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  modalContainer: {
    width: 230,
    padding: 3,
    backgroundColor: "#ffccc7",
    borderWidth: 1,
    borderColor: "#df998e",
    borderRadius: 10,
    marginBottom: 20,
    marginRight: 3,
    marginTop: 5,
  },
  message: {
    fontSize: 15,
    // marginTop: 3,
    marginLeft:1,
    marginBottom: 4,
    color: "#4C5058",
  },
});

export default ErrorModal;
