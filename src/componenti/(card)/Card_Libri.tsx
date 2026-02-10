import type { LibroCard } from "@/dati/DB";
import { BottoneColore, Fonts } from "@/theme/index";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    libro: LibroCard;
};

export default function Card_Libri({ libro }: Props) {
    const router = useRouter();

    return (
        <Pressable
            style={stile.card}
            onPress={() =>
                router.push({
                    pathname: "/(view)/View_Libro",
                    params: { id: libro.id.toString() },
                })
            }
        >
            {/* Titolo + Autore */}
            <View style={stile.contenitoreRiga}>
                <Text style={[stile.riga, { flex: 1, flexShrink: 1 }]}>
                    <Text style={stile.etichetta}>Titolo: </Text>
                    <Text style={stile.valore}>{libro.nomeLibro}</Text>
                </Text>
                <Text style={stile.riga}>
                    <Text style={stile.etichetta}>Autore: </Text>
                    <Text style={stile.valore}>{libro.autore}</Text>
                </Text>
            </View>

            {/* Categoria + Voto */}
            <View style={stile.contenitoreRiga}>
                <Text style={[stile.riga, { flex: 1, flexShrink: 1 }]}>
                    <Text style={stile.etichetta}>Categoria: </Text>
                    <Text style={stile.valore}>{libro.nomeCategoria ?? "-"}</Text>
                </Text>
                <Text style={stile.riga}>
                    <Text style={stile.etichetta}>Voto: </Text>
                    <Text style={stile.valore}>{libro.voto !== null ? libro.voto : "-"}</Text>
                </Text>
            </View>

            {/* Sottocategoria */}
            <View style={stile.contenitoreRiga}>
                <Text style={stile.riga}>
                    <Text style={stile.etichetta}>Sottocategoria: </Text>
                    <Text style={stile.valore}>{libro.nomeSottoCategoria ?? "-"}</Text>
                </Text>
            </View>
        </Pressable>
    );
}

const stile = StyleSheet.create({
    card: {
        width: "100%",
        padding: 16,
        marginVertical: 4,
        backgroundColor: BottoneColore.base.backgroundColor,
        borderRadius: 24,
    },
    contenitoreRiga: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    riga: {
        fontSize: 16,
        fontFamily: Fonts.Normale,
    },
    etichetta: {
        fontWeight: "bold",
    },
    valore: {
        fontWeight: "normal",
    },
});
