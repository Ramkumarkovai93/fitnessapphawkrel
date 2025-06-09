import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleReset = () => {
    //
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-4xl font-bold mb-2 text-center text-black mb-10">
        Forgot Password
      </Text>

      <Text className="text-center text-gray-600 text-base mb-8">
        Enter your email and we’ll send you a{"\n"}link to reset your password.
      </Text>

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

      <TouchableOpacity
        onPress={handleReset}
        className="bg-black rounded-xl py-3 w-full mb-4 mt-4"
      >
        <Text className="text-white text-center font-medium">
          Send Reset Link
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text className="text-sm text-center text-black underline mt-4">
          Back to Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
