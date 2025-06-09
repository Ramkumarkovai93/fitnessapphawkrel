import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Fitness from "../assets/images/FitnessLogo.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const navigation = useNavigation();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("userId")
      .then((id) => {
        console.log("User ID from AsyncStorage:", id);
        return AsyncStorage.getItem("userToken");
      })
      .then((token) => {
        console.log("Token from AsyncStorage:", token);
      })
      .catch((err) => {
        console.log("Error retrieving from AsyncStorage:", err);
      });
  }, []);

  useEffect(() => {
    fetchSurvey();
  }, []);
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission denied");
          return;
        }
      }

      console.log("Getting location...");

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
        },
        (error) => {
          console.log("Location error:", error.code, error.message);

          if (error.code === 3) {
            console.log(
              "⚠️ GPS Timeout - Try moving outdoors or turning on location manually."
            );
          } else if (error.code === 1) {
            console.log("🚫 Permission Denied");
          } else if (error.code === 2) {
            console.log("❌ Location Unavailable");
          }
        },
        {
          enableHighAccuracy: false, // set to false to avoid timeout in low-GPS areas
          timeout: 30000,
          maximumAge: 10000,
        }
      );
    } catch (err) {
      console.log("Unhandled error getting location:", err);
    }
  };

  const fetchSurvey = async () => {
    try {
      const response = await axios.get(
        "https://hawk.infenex.com/api/surveys/1"
      );
      console.log("Survey Data:", response.data);
      setSurvey(response.data);
    } catch (error) {
      // console.error(
      //   "Failed to fetch survey:",
      //   error?.response?.data || error.message
      // );
    }
  };

  const tasks = [
    { text: "Answer 3 questions about your skills", action: "Start" },
    { text: "Enable Gmail for extra reward", action: "Enable" },
    {
      text: "Invite a contributor (3 pts) / Qualified contributor to network (10 pts)",
      action: "Invite",
    },
  ];

  return (
    <View className="flex-1 bg-white px-4 py-6">
      <View className="flex-row items-center bg-gray-100 p-3 rounded-xl mb-6 h-[8%]">
        <Image
          source={Fitness}
          className="w-8 h-8 rounded-full mb-6 border-4 border-gray-300 mr-4 mt-5 align-center"
        />
        <Text className="text-2xl font-bold text-center text-black mb-2">
          Home
        </Text>
      </View>

      <ScrollView>
        <Text className="text-2xl font-bold mb-4  text-black">
          Welcome Back!
        </Text>

        <Text className="font-semibold text-black mb-3">
          Your Identity Score
        </Text>
        <ProgressBar
          progress={0.7}
          color="#2563eb"
          style={{ height: 10, borderRadius: 6 }}
        />
        <Text className="text-sm text-gray-600 mt-1">
          70% completion of profile —{" "}
          <Text className="font-semibold">Builder Tier • Level 2</Text>
        </Text>

        <Text className="font-semibold text-black text-lg mt-8 mb-2">
          Earnings Tracker
        </Text>
        <View className="bg-gray-100 p-4 rounded-xl">
          <Text className="text-lg text-black font-bold mb-2">120 Points</Text>
          <PieChart
            data={[
              {
                name: "Steps",
                population: 45,
                color: "#10b981",
                legendFontColor: "#000",
                legendFontSize: 12,
              },
              {
                name: "Survey",
                population: 30,
                color: "#3b82f6",
                legendFontColor: "#000",
                legendFontSize: 12,
              },
              {
                name: "Gmail",
                population: 25,
                color: "#facc15",
                legendFontColor: "#000",
                legendFontSize: 12,
              },
            ]}
            width={screenWidth - 60}
            height={160}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="10"
            absolute
          />
          {/* <View
          style={{
            width: 30,
            backgroundColor: "#10b981",
          }}
        /> */}
        </View>

        <View>
          <Text className="text-base font-semibold text-black mb-3">
            New Tasks / Missions
          </Text>

          {tasks.map((item, index) => (
            <View
              key={index}
              className="bg-blue-50 my-1 border border-blue-100 rounded-xl px-4 py-3 mb-3 flex-row justify-between items-center"
            >
              <Text className="text-sm text-gray-800 flex-1 pr-2">
                {item.text}
              </Text>
              <TouchableOpacity
                className="bg-blue-600 px-4 py-1.5 rounded-md"
                onPress={() => {
                  navigation.navigate("SettingsScreen");
                }}
              >
                <Text className="text-white text-sm font-semibold">
                  {item.action}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
