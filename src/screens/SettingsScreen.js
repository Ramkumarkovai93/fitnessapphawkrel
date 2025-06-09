import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [activityEnabled, setActivityEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const navigation = useNavigation();

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <View className="flex-row items-center bg-gray-100 p-4 rounded-xl mb-6">
        <View className="bg-white p-2 rounded-full mr-4">
          <Text className="text-lg font-bold text-blue-600">⚙️</Text>
        </View>
        <Text className="text-2xl font-bold text-center text-black">
          Settings
        </Text>
      </View>

      <Text className="text-lg text-black font-semibold mb-3">
        Data Stream Controls
      </Text>

      <View className="bg-gray-100 rounded-xl px-4 py-2 mb-2 flex-row justify-between items-center">
        <Text className="text-black">Email (Gmail metadata) ✉️</Text>
        <Switch
          value={emailEnabled}
          onValueChange={setEmailEnabled}
          trackColor={{ false: "#d1d5db", true: "#28A745" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#d1d5db"
        />
      </View>

      <View className="bg-gray-100 rounded-xl px-4 py-2 mb-2 flex-row justify-between items-center">
        <Text className="text-black">Activity (Steps, Movement) 🏃‍♂️</Text>
        <Switch
          value={activityEnabled}
          onValueChange={setActivityEnabled}
          trackColor={{ false: "#d1d5db", true: "#28A745" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#d1d5db"
        />
      </View>

      <View className="bg-gray-100 rounded-xl px-4 py-2 mb-6 flex-row justify-between items-center">
        <Text className="text-black">Location (approx.) 📍</Text>

        <Switch
          value={locationEnabled}
          onValueChange={setLocationEnabled}
          trackColor={{ false: "#d1d5db", true: "#28A745" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#d1d5db"
        />
      </View>

      <Text className="font-semibold text-lg mt-8 mb-3  text-black ">
        Active Streams
      </Text>
      <View className="bg-blue-100 rounded-xl px-4 py-2 mb-2 flex-row justify-between items-center">
        <Text className="text-base  text-black">Gmail ✉️</Text>
        <Switch
          value={isEnabled}
          onValueChange={setIsEnabled}
          trackColor={{ false: "#d1d5db", true: "#2563eb" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#d1d5db"
        />
      </View>
      <View className="bg-blue-100 rounded-xl px-4 py-2 mb-2 flex-row justify-between items-center">
        <Text className="text-base  text-black">Steps 🏃‍♂️</Text>
        <Switch
          value={isEnabled}
          onValueChange={setIsEnabled}
          trackColor={{ false: "#d1d5db", true: "#2563eb" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#d1d5db"
        />
      </View>
      <View className="bg-blue-100 rounded-xl px-4 py-2 mb-4 flex-row justify-between items-center ">
        <Text className="text-base text-black">Location 📍</Text>
        <Switch
          value={isEnabled}
          onValueChange={setIsEnabled}
          trackColor={{ false: "#d1d5db", true: "#2563eb" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#d1d5db"
        />
      </View>

      <Text className="text-lg font-semibold text-black mb-2">
        Identity Export
      </Text>
      <Text className="text-sm text-gray-600 mb-3">
        Export your identity data (future feature with Hawkrel agent or Aqifi)
      </Text>
      <TouchableOpacity className="bg-gray-200 px-4  w-[40%]  py-2 rounded-lg mb-6">
        <Text className="text-base text-center text-black">
          Export Identity
        </Text>
      </TouchableOpacity>

      <Text className="text-lg font-semibold text-black mb-2">
        Contact Support
      </Text>
      <TouchableOpacity className="bg-blue-600 px-4 py-2  w-[40%] rounded-lg mb-6">
        <Text className="text-white text-center text-base">Contact Us</Text>
      </TouchableOpacity>

      <Text className="text-lg font-semibold text-black mb-2">Legal</Text>
      <Text className="text-blue-600 mb-1">• Privacy Policy</Text>
      <Text className="text-blue-600">• Terms of Service</Text>

      <View style={{ height: 70 }} />
    </ScrollView>
  );
};

export default SettingsScreen;
