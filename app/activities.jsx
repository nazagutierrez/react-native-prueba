import {
    FlatList,
    View,
    Pressable,
    Text,
    Image
  } from "react-native";
  
  import { Screen } from "../components/Screen";
  import { useLocalSearchParams } from "expo-router";
  import useUserStore from "../store/stravaStore";
  import "../global.css"
import { useEffect, useState } from "react";
  
  export default function Main() {
    const [filteredActivities, setFilteredActivities] = useState(null)
    const { activities ,user } = useUserStore();
    const { month, year } = useLocalSearchParams()

    useEffect(() => {
      if (!month || !year || !activities) {
        // no filtra cuando no hay parametro de mes y año
        setFilteredActivities(activities)
      }

      if (month && year && activities) {
        // filtra por por parametro de mes y año
        setFilteredActivities(
          activities.filter((activity) => {
            const activityDate = new Date(activity.start_date_local);
            const activityMonth = activityDate.getMonth() + 2;
            const activityYear = activityDate.getFullYear();

            return activityMonth === parseInt(month) && activityYear === parseInt(year);
          })
        );
      }
    }, [month, year, activities]); 
    
  
    const handeDate = (date) => {
      // formateo simple de la fecha
      const dateObj = new Date(date);
      return `${dateObj.getDate()}/${dateObj.getMonth() + 2}/${dateObj.getFullYear()}`
      
    }
  
    return (
      <Screen>
          <View className="flex-1 flex-col w-full items-center justify-center px-3">
            <View className="flex-row justify-between w-full ">
              <Text className="text-white text-xl w-1/3 py-2 self-start">Hola <Text className="underline underline-offset-4 decoration-[#af64ab]">{user.firstname}</Text></Text>
              <Image source={{ uri: user.profile }} className="w-[50] shadow-xl bg-white/60  rounded-full h-[50]" />
            </View>
            <Text className="text-white text-base py-2 self-start">Aqui estan tus actividades mensuales</Text>
            <FlatList
            style={{ width: '100%' }}
              data={filteredActivities}
              keyExtractor={(activitie) => activitie.id.toString()}
              renderItem={({ item: activitie }) => (
                <Pressable className="border border-black border-b-[#af64ab]/50 mb-5 bg-[#201d20] rounded-xl p-4">
                  <View className="flex-row">
                    <View className="flex-shrink items-start justify-center w-full">
                      <Text className="mb-1 text-white text-2xl self-center pb-2 underline underline-offset-4 decoration-[#af64ab]">{activitie?.name}</Text>
                      <Text className="mb-1 text-white text-lg">Tipo: {activitie?.type}</Text>
                      <Text className="mb-1 text-white text-lg">Tipo de deporte: {activitie?.sport_type}</Text>
                      <Text className="mb-1 text-white text-lg">Fecha de inicio: {handeDate(activitie?.start_date_local)}</Text>
                      <Text className="mb-1 text-white text-lg">Tiempo: {activitie?.moving_time}</Text>
                      <Text className="mb-1 text-white text-lg">Elevation Gain: {activitie?.total_elevation_gain}</Text>
                      <Text className="mt-2 text-white text-lg flex-shrink">
                        {activitie?.description || "Sin descripción"}
                      </Text>
                      <Text className="mt-2 text-white text-lg flex-shrink">
                        Distancia recorrida: {activitie?.distance || "No especificado"} metros
                      </Text>
                    </View>
                  </View>
                </Pressable>
              )}
            />
          </View>
      </Screen>
    );
  }
  