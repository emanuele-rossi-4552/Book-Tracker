import { useFonts } from "expo-font";
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { inizializzaDB } from "../dati/DB";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        BeautyLova: require("../assets/Font/BeautyLova.otf"),
    });

    useEffect(() => {
        inizializzaDB();

        // barra Android a scomparsa
        NavigationBar.setVisibilityAsync('hidden');
    }, []);

    if (!fontsLoaded) return null;

    return (
        <>
            <StatusBar hidden />
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </>
    );
}
