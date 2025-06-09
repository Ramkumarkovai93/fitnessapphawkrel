import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Validation Error", "All fields are required");
      return;
    }
    console.log("signupis", name, email, password, confirmPassword);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://hawk.infenex.com/api/users/register",
        {
          email,
          password,
        }
      );

      console.log("Signup Success:", response.data);

      Alert.alert("Account Created", "You can now log in", [
        {
          text: "OK",
          onPress: () => navigation.navigate("LoginScreen"),
        },
      ]);
    } catch (error) {
      console.log("Signup Error:", error?.response?.data || error.message);
      Alert.alert(
        "Signup Failed",
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl  text-black text-4xl font-bold mb-10 text-center">
        Create Account
      </Text>

      <View className="w-full mb-4">
        <Text className="text-sm text-black mb-1">Full Name</Text>
        <TextInput
          className="border border-gray-300 rounded px-4 py-2 text-black"
          placeholder="John Doe"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View className="w-full mb-4">
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

      <View className="w-full mb-4">
        <Text className="text-sm text-black mb-1">Password</Text>
        <TextInput
          className="border border-gray-300 rounded px-4 py-2 text-black"
          placeholder="********"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View className="w-full mb-6">
        <Text className="text-sm text-black mb-1">Confirm Password</Text>
        <TextInput
          className="border border-gray-300 rounded px-4 py-2 text-black"
          placeholder="********"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity
        onPress={handleSignup}
        className="bg-black rounded-xl py-3 w-full mb-4"
      >
        <Text className="text-white text-center font-medium">Sign Up</Text>
      </TouchableOpacity>

      <Text className="text-sm text-center text-gray-800">
        Already have an account?{" "}
        <Text
          className="text-black underline font-medium"
          onPress={() => navigation.navigate("LoginScreen")}
        >
          Sign In
        </Text>
      </Text>
    </View>
  );
};

export default SignupScreen;
