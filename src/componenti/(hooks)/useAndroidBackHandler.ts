import { useEffect } from "react";
import { BackHandler } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";

type BackConfig = {
    fallbackRoute: string;
    params?: Record<string, any>;
};

export function useAndroidBackHandler({
    fallbackRoute,
    params,
    }: BackConfig) {
    const navigation = useNavigation();

    useEffect(() => {
    const onBackPress = () => {
        if (navigation.canGoBack()) {
        navigation.goBack();
        } else {
        navigation.dispatch(
            CommonActions.reset({
            index: 0,
            routes: [{ name: fallbackRoute, params }],
            })
        );
        }
        return true;
    };

    const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
    );

    return () => subscription.remove();
    }, [fallbackRoute, JSON.stringify(params)]);
}

/*

USARE COSì NELLE PAGINE:

import { useAndroidBackHandler } from "@/componenti/(hooks)/useAndroidBackHandler";

    useAndroidBackHandler({
        fallbackRoute: "Home",       // la schermata dove vuoi tornare
        params: { refresh: true },   // opzionale, eventuali parametri
    });
  
*/