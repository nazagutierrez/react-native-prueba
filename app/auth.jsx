import { useEffect } from "react";
import { Authorize, getActivities, getUser, refreshToken } from "../api/strava";
import { router, useLocalSearchParams, useRootNavigationState } from "expo-router";
import useUserStore from "../store/stravaStore";
import "../global.css";

export default function Auth() {
  const { code, error } = useLocalSearchParams();
  const { authData, setAuthData, user, setUser, activities, setActivities } = useUserStore();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    // efecto para esperar a que la pantalla cargue y no de error
    if (!rootNavigationState?.key || !error) return;
    router.push("/");
  }, [error, rootNavigationState?.key]);

  useEffect(() => {    
    async function fetchActivities() {
      try {
        let currentAuthData = authData;
        // si no hay authData, se autoriza
        if (!authData) {
          const authResponse = await Authorize(code);
          currentAuthData = authResponse;
          setAuthData(authResponse);
        }

        // verifica si el token está expirado
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentAuthData.expires_at < currentTime) {
          const refreshedAuth = await refreshToken(currentAuthData.refresh_token);
          currentAuthData = refreshedAuth;
          setAuthData(refreshedAuth);
        }

        // Obtener datos del usuario
        const userData = await getUser(currentAuthData.access_token);
        
        // Obtener actividades con el access_token actual
        const userActivities = await getActivities(currentAuthData.access_token);
        
        if (userActivities) {
          setActivities(userActivities);
        }

        setUser({
          username: userData?.username,
          profile: userData?.profile,
          firstname: userData?.firstname,
        });
        router.replace('/')
      } catch (error) {
        console.error("Error durante la obtención de actividades:", error);
      }
    }

    if (code) {
      fetchActivities();
    }
  }, [code, authData, setAuthData, activities, setActivities, user, setUser, error]);

  return (
    <></>
  );
}
