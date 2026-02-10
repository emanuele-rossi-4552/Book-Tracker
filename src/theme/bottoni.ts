import { ViewStyle } from "react-native";
import { Colori } from "./colori";

export const BottoneBase: { container: ViewStyle } = {
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 24,
    },
};

export const BottoneColore: Record< "base" | "rosso" | "verde" | "giallo", ViewStyle > = {
    base: { backgroundColor: Colori.bottoni.base },
    rosso: { backgroundColor: Colori.bottoni.rosso },
    verde: { backgroundColor: Colori.bottoni.verde },
    giallo: { backgroundColor: Colori.bottoni.giallo },
};
