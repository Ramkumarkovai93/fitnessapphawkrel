import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  // const handleLogin = () => {
  //   console.log("Credential_is", email, password);
  //   navigation.navigate("Home");
  //   // if (email === "test@gmail.com" && password === "123456") {
  //   //   navigation.navigate("ForgotPasswordScreen");
  //   // } else {
  //   //   Alert.alert("Invalid credentials", "Please check email and password");
  //   // }
  // };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Email and Password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    axios
      .post("https://hawk.infenex.com/api/users/login", {
        email,
        password,
      })
      .then((response) => {
        const { id, token } = response.data;

        AsyncStorage.setItem("userId", id.toString())
          .then(() => AsyncStorage.setItem("userToken", token))
          .then(() => {
            console.log("Login success and data stored");
            navigation.navigate("Home");
          })
          .catch((err) => {
            console.log("AsyncStorage Error:", err);
            Alert.alert("Storage Error", "Failed to save login data");
          });
      })
      .catch((error) => {
        console.log("Login Error:", error?.response?.data || error.message);
        Alert.alert(
          "Login Failed",
          error?.response?.data?.message || "Something went wrong"
        );
      });
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="  text-black text-4xl font-bold text-center mb-20">
        Sign In
      </Text>

      <View className="mb-4">
        <Text className="text-sm text-black mb-1">Email</Text>
        <TextInput
          className="border border-gray-300 rounded px-4 py-2 text-black"
          placeholder="you@example.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View className="mb-2">
        <Text className="text-sm text-black mb-1">Password</Text>
        <TextInput
          className="border border-gray-300 rounded px-4 py-2 text-black"
          placeholder="********"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        className="mb-4 self-end"
        onPress={() => {
          navigation.navigate("ForgotPasswordScreen");
        }}
      >
        <Text className="text-sm text-black underline">Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-black rounded-xl  py-3 mb-4"
      >
        <Text className="text-white text-center font-medium">Log In</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
          <Text className="text-black text-sm font-semibold underline">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
