import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    AsyncStorage.multiGet(["userId", "userToken"]).then((res) => {
      const id = res[0][1];
      const token = res[1][1];

      if (id && token) {
        navigation.replace("Home");
      } else {
        setShowButton(true);
        // navigation.replace("LoginScreen");
      }
    });
  }, []);

  return (
    <View className="flex-1 justify-center items-center px-6 bg-white">
      <Text className=" text-3xl font-bold mb-2 text-center text-black mb-10">
        Welcome to Hawkrel
      </Text>
      <Text className="text-base text-gray-600 text-center mb-10">
        Your data, your identity, your economy
      </Text>

      {showButton ? (
        <TouchableOpacity
          className="bg-black rounded-xl  py-3 mb-4 w-[80%] "
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text className="text-white text-center font-medium text-base ">
            Sign In
          </Text>
        </TouchableOpacity>
      ) : null}

      {showButton ? (
        <TouchableOpacity
          className="bg-gray-200 rounded-xl w-[80%] py-3"
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text className="text-black text-center font-medium text-base">
            Sign Up
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default WelcomeScreen;
