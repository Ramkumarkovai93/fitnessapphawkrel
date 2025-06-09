import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProfileImage from "../assets/images/ProfileImage.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProfileScreen = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    AsyncStorage.multiRemove(["userId", "userToken"])
      .then(() => {
        console.log("Logged out: AsyncStorage cleared");
        navigation.navigate("LoginScreen"); // or "LoginScreen" if that's your route name
      })
      .catch((err) => {
        console.log("Error during logout:", err);
      });
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Image
        // source={{
        //   uri: "https://i.pravatar.cc/150?img=12",
        // }}
        source={ProfileImage}
        className="w-32 h-32 rounded-full mb-6 border-4 border-gray-300"
      />

      <Text className="text-3xl font-bold text-black mb-8">My Profile</Text>

      <View className="w-full bg-gray-100 p-4 rounded-xl mb-4">
        <Text className="text-lg text-black">Arun</Text>
      </View>

      <View className="w-full bg-gray-100 p-4 rounded-xl">
        <Text className="text-lg text-black">Arun@gmail.com</Text>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-black w-full rounded-xl  py-3  mt-9"
      >
        <Text className="text-white text-center font-medium">Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
