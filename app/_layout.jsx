import { Stack } from "expo-router";
import { Pressable, Text, View, Image } from "react-native";
import useUserStore from "../store/stravaStore";
import icon from "../assets/image.png";


export default function Layout() {
  const user = useUserStore((state) => state.user);

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