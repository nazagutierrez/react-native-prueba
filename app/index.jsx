import { View, Pressable, Text } from "react-native";

import { Screen } from "../components/Screen";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import useUserStore from "../store/stravaStore";
import "../global.css";

export default function Main() {
  const { setIsFake ,user, clearAuthData, setUser, setActivities, activities } = useUserStore();
  const ip = process.env.EXPO_PUBLIC_IP_AND_PORT;


  const handleLogout = () => {
    // borramos data para simular un cierre de sesión
    // solo funciona en navegador
    setIsFake(false)
    clearAuthData(); // Limpiar datos al cerrar sesión
    router.replace("/");
  };

  const handleFakeLogin = () => {
    // seteamos datos falsos
    setIsFake(true)
    setUser({username: "juancito1", profile: "https://static.thenounproject.com/png/5100711-200.png", firstname: "Juan"});
    setActivities([
      {
        id: 1,
        name: "Running day",
        type: "Run",
        sport_type: "Running",
        start_date_local: "2024-10-01T00:03:00Z",
        moving_time: 100,
        total_elevation_gain: 100,
        distance: 120,
        description: "A beautiful day",
      },
      {
        id: 2,
        name: "Run in the morning",
        type: "Run",
        sport_type: "Running",
        start_date_local: "2024-12-01T00:05:00Z",
        moving_time: 100,
        total_elevation_gain: 100,
        distance: 80,
        description: "Interesting running morning",
      },
      {
        id: 3,
        name: "Amazing day",
        type: "Run",
        sport_type: "Running",
        start_date_local: "2024-11-01T00:08:00Z",
        moving_time: 50,
        total_elevation_gain: 100,
        distance: 100,
        description: "Sunny morning in the hills",
      },
      {
        id: 4,
        name: "Epic run",
        type: "Run",
        sport_type: "Running",
        start_date_local: "2024-10-01T00:01:00Z",
        moving_time: 100,
        total_elevation_gain: 100,
        distance: 30,
        description: "Enjoying the sunshine",
      }
    ]);
  };

  return (
    <Screen>
      <StatusBar style="auto" />
      {user && (
        <View className="flex-1 items-center gap-5">
          <Pressable className="absolute right-2 top-0" onPress={handleLogout}>
            <Text className="text-white active:opacity-70 bg-neutral-800/90 border-b-2 rounded border-[#af64ab] px-2 py-2 mx-auto text-center">
              Cerrar sesión
            </Text>
          </Pressable>
          <Text className="text-white text-center text-xl mb-5 mt-32">Aqui puedes ver tus actividades recientes y estadísticas mensuales</Text>
          <View className="flex-row items-center justify-center gap-10 mt-5">
            <Link href="/activities" asChild>
              <Pressable className="active:opacity-70 h-20 justify-center bg-neutral-800/90 border-b-2 rounded border-[#af64ab] w-[150] py-2 px-2">
                <Text className="text-white text-lg text-center">Ver actividades recientes</Text>
              </Pressable>
            </Link>
            <Link href="/monthly-stats" asChild>
              <Pressable className="active:opacity-70 h-20 justify-center bg-neutral-800/90 border-b-2 rounded border-[#af64ab] w-[150] py-2 px-2">
                <Text className="text-white text-lg text-center">Ver estadísticas mensuales</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      )}
      {!user && (
        <>
          <View className="justify-center items-center flex-col pt-5 pb-8">
            <Text className="text-white text-2xl">Welocome to Vert.run!</Text>
            <Text className="text-white text-base pt-3">
              Click to login with your Strava account
            </Text>
            <Text className="text-white text-base">
              and see all of your activities
            </Text>
          </View>
          {/* botón para loguearse */}
          <View className="flex-row items-center justify-center gap-10 mt-5">
            <Link
              href={`http://www.strava.com/oauth/authorize?client_id=141564&response_type=code&redirect_uri=http://${ip}/auth&approval_prompt=force&scope=activity:read_all`}
              asChild
            >
              <Pressable className="active:opacity-70 bg-neutral-800/90 border-b-2 rounded border-[#af64ab] w-1/3 py-3">
                <Text className="text-white text-lg text-center">Login</Text>
              </Pressable>
            </Link>
              <Pressable onPress={() => handleFakeLogin()} className="active:opacity-70 bg-neutral-800/90 border-b-2 rounded border-[#af64ab] w-1/3 py-3">
                <Text className="text-white text-lg text-center">Login fake</Text>
              </Pressable>
          </View>
        </>
      )}
    </Screen>
  );
}
