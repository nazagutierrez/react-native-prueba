# Proyecto Vert.run

Este proyecto es una app para visualizar actividades de Strava y estadísticas mensuales. La autenticación funciona en el navegador, pero en la app móvil redirige al navegador debido a que tuve problemas de tiempo investigando los Deep Linking en Expo. Además, el botón de "Cerrar sesión" no funciona correctamente en la app móvil, pero, en el navegador móvil, con el boton de datos falsos o los reales debería funcionar

## Configuración

Antes de ejecutar, configura el archivo `.env` con tu dirección IP y puerto:

IP_AND_PORT=http://192.168.0.29:8081

## Credenciales públicas

El proyecto usa una cuenta falsa de Strava, por eso estan las credenciales publicas

## Repositorio y APK

- **Repositorio GitHub**: [Enlace al repositorio](https://github.com/nazagutierrez/react-native-prueba)
- **APK Android**: [Descargar APK](https://expo.dev/accounts/nazadevv/projects/react-native-prueba/builds/4434ceb6-29f9-484a-8c8c-1f1df0d5b482)

## Pasos para usarlo

1. Clona el repositorio
2. Instala las dependencias
3. Introducimos las variables necesarias en el .env
Si queres utilizar la app en el navegador del movil deberas correr el servidor en local (npx expo start / npm start), y desde el celular entrar a la app. 
Si solo la queres usar con datos falsos se puede sin problemas, solo que no puedes cerrar sesión


Tecnologías
React Native y Expo
Zustand para gestión de estado
Strava API para obtener actividades
