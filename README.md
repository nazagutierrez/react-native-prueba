# Proyecto Vert.run

Este proyecto es una app para visualizar actividades de Strava y estadísticas mensuales. La autenticación funciona en el navegador, pero en la app móvil redirige al navegador debido a que tuve problemas de tiempo investigando los Deep Linking en Expo. Además, el botón de "Cerrar sesión" no funciona correctamente en la app móvil, pero, en el navegador móvil, con el boton de datos falsos o los reales debería funcionar

## Configuración

Antes de ejecutar, configura el archivo `.env` con tu dirección IP y puerto:

IP_AND_PORT=http://192.168.0.29:8081

## Credenciales públicas

El proyecto usa una cuenta falsa de Strava, por eso estan las credenciales publicas

## Repositorio y APK

- **Repositorio GitHub**: [Enlace al repositorio](https://github.com/nazagutierrez/react-native-prueba)
- **APK Android**: [Descargar APK](https://link-a-tu-apk.com)

## Instalación

1. Clona el repositorio y navega al directorio del proyecto:
   ```bash
   git clone https://github.com/nazagutierrez/react-native-prueba
   cd tu-repositorio
Instala las dependencias:

npm install
Inicia la app:


npm start
Tecnologías
React Native y Expo
Zustand para gestión de estado
Strava API para obtener actividades
