import { View, Text, Pressable, StyleSheet } from "react-native";
import { Fonts, Colori} from "@/theme/index";

type Props = {
    data: string;
    testo: string;
    selezionabile?: boolean;
    selezionato?: boolean;
    onPress?: () => void;
};

export default function Card_Commento({
    data,
    testo,
    selezionabile = false,
    selezionato = false,
    onPress,
}: Props) {

    const cardStyle = [
        stile.card,
        selezionabile && selezionato ? stile.cardSelezionato : null
    ];

    if (selezionabile) {
        return (
            <Pressable style={cardStyle} onPress={onPress}>
                <Text style={stile.data}>{data}</Text>
                <Text style={stile.testo}>{testo}</Text>
            </Pressable>
        );
    }

    return (
        <View style={stile.card}>
            <Text style={stile.data}>{data}</Text>
            <Text style={stile.testo}>{testo}</Text>
        </View>
    );
}

const stile = StyleSheet.create({
    card: {
        borderRadius: 16,
        paddingVertical: 2,
        paddingHorizontal: 6,
        marginLeft: 10,
        marginRight: 10,
        alignSelf: "stretch",
    },
    cardSelezionato: {
        borderWidth: 2,
        borderColor: Colori.bottoni.rosso,
    },
    data: {
        fontFamily: Fonts.Normale,
        fontSize: 16,
        color: Colori.text,
        marginBottom: 8,
    },
    testo: {
        fontFamily: Fonts.Normale,
        fontSize: 18,
        marginLeft: 10,
        color: Colori.text,
        flexWrap: "wrap",
    },
});

