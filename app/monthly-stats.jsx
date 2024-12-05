import {
  View,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";

import { Screen } from "../components/Screen";
import { Link } from "expo-router";
import useUserStore from "../store/stravaStore";
import "../global.css";
import { useEffect, useState } from "react";

export default function Main() {
  const { activities } = useUserStore();
  const [months, setMonths] = useState([]);
  const [stats, setStats] = useState(null);

  // Obtener los últimos tres meses al cargar
  useEffect(() => {
    const lastThreeMonths = getLastThreeMonths();
    setMonths(lastThreeMonths);
  }, [activities]);

  // si hay meses, calculamos las estadísticas
  useEffect(() => {
    if (months.length > 0 && activities) {
      const allStats = getStats();
      setStats(allStats);
    }
  }, [months, activities]);

  function getStats() {
    const stats = {
      totalDistance: 0,
      totalElevationGain: 0,
      totalMovingTime: 0,
    };

    activities.forEach((activity) => {
      const activityDate = new Date(activity.start_date_local);
      const activityMonth = activityDate.getMonth() + 2;
      const activityYear = activityDate.getFullYear();

      // Validar si el mes y el año de la actividad están en `months`
      const isInMonths = months.some(
        (monthObj) =>
          monthObj.month === activityMonth && monthObj.year === activityYear
      );

      if (isInMonths) {
        stats.totalDistance += activity.distance || 0;
        stats.totalElevationGain += activity.total_elevation_gain || 0;
        stats.totalMovingTime += activity.moving_time || 0;
      }
    });

    return stats;
  }

  function getLastThreeMonths() {
    // obtenemos los ultimos 3 meses
    const now = new Date();

    const formatMonth = (date) => ({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    });

    const currentMonth = formatMonth(now);
    const lastMonth = formatMonth(new Date(now.getFullYear(), now.getMonth() - 1));
    const twoMonthsAgo = formatMonth(new Date(now.getFullYear(), now.getMonth() - 2));

    return [currentMonth, lastMonth, twoMonthsAgo];
  }

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("es-ES", { month: "long" });
  }

  return (
    <Screen>
      <Text className="text-white text-center text-xl mt-5 mx-auto w-[90%] mb-8">
        Selecciona un mes para ver las actividades que realizaste en esa fecha
      </Text>
      <View className="h-24 flex-row gap-3 w-full items-start justify-center px-3">
        {/* Mapeamos cada mes en un botón */}
        {months.map((month, index) => (
          <Link key={index}  href={`/activities?month=${month.month}&year=${month.year}`}  asChild>
            <Pressable className="active:opacity-70 justify-center bg-neutral-800/90 border-b-2 rounded border-[#af64ab] w-[110] py-3 px-2">
              <Text className="text-white text-lg text-center capitalize">
                {getMonthName(month.month)}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
      <Text className="text-white text-center text-xl mt-5 mx-auto w-[90%] mb-8">
        Estadísticas de los últimos 3 meses
      </Text>
      {stats ? (
        <Text className="text-white text-start ms-10 text-base mt-2">
          <Text className="text-xl underline decoration-[#af64ab]">Distancia total:</Text> {stats.totalDistance.toFixed(2)} metros{"\n"}
          <Text className="text-xl underline decoration-[#af64ab]">Elevación total:</Text> {stats.totalElevationGain.toFixed(2)} metros{"\n"}
          <Text className="text-xl underline decoration-[#af64ab]">Tiempo total en movimiento:</Text> {Math.round(stats.totalMovingTime / 60)}{" "}
          minutos
        </Text>
      ) : (
        <ActivityIndicator size="large" color="#af64ab" />
      )}
    </Screen>
  );
}
