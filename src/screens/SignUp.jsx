import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import FeatherIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/FontAwesome";
import { register } from "../api1/UserAPI";
import ErrorModal from "../modals/error";
import SuccessModal from "../modals/success";
import WarningModal from "../modals/warningmodal";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shopname, setShopname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);

  const handleSignUp = async () => {
    if (loading) return;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !shopname ||
      !password ||
      !confirmPassword
    ) {
      setModalMessage("All fields are required."); // Set error message
      setWarningModalVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match."); // Set error message
      setWarningModalVisible(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setModalMessage("Please enter a valid email address."); // Set error message
      setWarningModalVisible(true);
      return;
    }

    setLoading(true); // Set loading to true when the sign-up starts

    const signUpData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
      shopname,
      password,
    };

    try {
      const result = await register(signUpData);

      if (result.message) {
        setModalMessage(result.message);
        setModalVisible(true);
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
      } else {
        setModalMessage(result.message); // Set error message
        setErrorModalVisible(true);
      }
    } catch (error) {
      setModalMessage("An unexpected error occurred."); // Set error message
      setErrorModalVisible(true);
    } finally {
      setLoading(false); // Set loading to false after the process is done
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View className="flex w-full h-[100%] justify-center items-center" nestedScrollEnabled={true}>
      <View className="flex-row items-center mb-10 absolute top-14 left-5">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#4C5058" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-700 ml-3">Sign Up</Text>
      </View>
      <View
        className="mt-36 p-3 space-y-3 flex-1"
        nestedScrollEnabled={true} // Add this line
      >
        <View className="px-5 space-y-4">
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-3 text-base"
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            editable={!loading} // Disable input when loading
          />
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-3 text-base"
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            editable={!loading} // Disable input when loading
          />
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-3 text-base"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading} // Disable input when loading
          />
          <View className="border border-gray-300 rounded-lg">
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="US" // Default country code
              layout="first"
              onChangeText={(text) => setPhoneNumber(text)}
              disabled={loading} // Disable phone input when loading
              flatListProps={{
                nestedScrollEnabled: true, // Ensure nested scrolling
              }}
            />
          </View>
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-3 text-base"
            placeholder="Shop Name"
            value={shopname}
            onChangeText={setShopname}
            editable={!loading} // Disable input when loading
          />

          <View className="relative">
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-3 text-base"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              className="absolute right-3 top-[17px]"
              disabled={loading}
            >
              <FeatherIcon
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#4C5058"
              />
            </TouchableOpacity>
          </View>

          <View className="relative">
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-3 text-base"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={toggleShowConfirmPassword}
              className="absolute right-3 top-[17px]"
              disabled={loading}
            >
              <FeatherIcon
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={20}
                color="#4C5058"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-5 mt-10">
          <TouchableOpacity
            className="bg-gray-800 py-3 rounded-lg justify-center items-center"
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white font-bold text-lg">Sign Up</Text>
            )}
          </TouchableOpacity>
          <View className="mt-2 flex flex-row justify-center items-center w-full">
            <Text className="text-gray-600">Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              disabled={loading}
            >
              <Text className="text-blue-500 ml-2 text-[15px]">Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>


      <SuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={modalMessage}
      />
      <ErrorModal
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
        message={modalMessage}
      />
      <WarningModal
        visible={warningModalVisible}
        onClose={() => setWarningModalVisible(false)}
        message={modalMessage}
      />
    </View>
  );
}

