import { Stack } from "expo-router";
import { View, Image } from "react-native";
import icon from "../assets/image.png";


export default function Layout() {
  return (
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#af64ab" },
          headerTitle: "",
          headerTintColor: "black",
          headerRight: () => (
            <View className="items-center justify-center">
              <Image className="rounded-full" source={icon} style={{width: 70, height: 40}} />
            </View>
          ),
        }}
      />
  );
}