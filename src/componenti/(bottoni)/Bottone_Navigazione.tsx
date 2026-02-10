import { Text, Pressable , StyleSheet} from "react-native";
import { useRouter } from "expo-router";
import { BottoneBase, BottoneColore, Testo } from "@/theme/index";

type Colore = "base" | "rosso" | "verde" | "giallo";
type Dimensione = "dimensione1" | "dimensioneLato";

type Bottone_NavigazioneProps = {
    route?: string;
    nome: string;
    colore?: Colore;
    dimensione?: Dimensione;
    onPressOverride?: () => void;
};

export default function Bottone_Navigazione({route, nome, colore , dimensione, onPressOverride}: Bottone_NavigazioneProps) {
    
    const router = useRouter();

    return (
            <Pressable
                style={[BottoneBase.container, BottoneColore[colore], stile[dimensione]]}
                onPress={onPressOverride ? onPressOverride : () => route && router.push(route as any)}
            >
                <Text style={stile.testo}>{nome}</Text>
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
