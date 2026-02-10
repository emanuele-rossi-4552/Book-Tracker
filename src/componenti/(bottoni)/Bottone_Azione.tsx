import { Pressable, StyleSheet, Text } from "react-native";
import { BottoneBase, BottoneColore, Testo} from "@/theme/index";

type Colore = "base" | "rosso" | "verde" | "giallo";
type Dimensione = "dimensione1" | "dimensioneLato";

type Props = {
    label: string;
    onPress: () => void;
    colore?: Colore;
    dimensione?: Dimensione;
};

export default function BottoneAzione({label, onPress, colore = "base", dimensione }: Props) {

    return (
        <Pressable
            onPress={onPress}
            style={[BottoneBase.container, BottoneColore[colore], stile[dimensione]]}
        >
            <Text style={stile.testo}>{label}</Text>
        </Pressable>
    );
}

const stile = StyleSheet.create({
    dimensione1: {
        flexGrow: 1,
        maxHeight: 80,
        paddingHorizontal: 20,
    },

    dimensioneLato: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    testo: Testo.BottoneTesto,
});
