import BottoneAzione from "@/componenti/(bottoni)/Bottone_Azione";
import { Colori, Fonts } from "@/theme/index";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
    visible: boolean;
    onConfirm: (testo: string) => void;
    onCancel: () => void;
};

export default function Inserisci_Commento({ visible, onConfirm, onCancel }: Props) {
    const [testo, setTesto] = useState("");

    if (!visible) return null;

    return (
        <View style={stile.overlay}>
            <View style={stile.popup}>
                <Text style={stile.titolo}>Nuovo Commento</Text>
                <TextInput
                    style={stile.input}
                    multiline
                    placeholder="Scrivi il commento..."
                    value={testo}
                    onChangeText={setTesto}
                />

                <View style={stile.rigaBottoni}>
                    <BottoneAzione
                        label="Annulla"
                        colore="giallo"
                        dimensione="dimensioneLato"
                        onPress={() => {
                            setTesto("");
                            onCancel();
                        }}
                    />
                    <BottoneAzione
                        label="Salva"
                        colore="verde"
                        dimensione="dimensioneLato"
                        onPress={() => {
                            if (testo.trim()) {
                                onConfirm(testo.trim());
                                setTesto("");
                            }
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

const stile = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    popup: {
        width: "90%",
        padding: 20,
        backgroundColor: Colori.background,
        borderRadius: 16,
    },
    titolo: {
        fontSize: 32,
        fontFamily: Fonts.Corsivo,
        marginBottom: 12,
    },
    input: {
        minHeight: 280,
        maxHeight: 280,
        fontSize: 18,
        borderWidth: 1,
        borderColor: Colori.bordo,
        color: Colori.text2,
        borderRadius: 16,
        padding: 8,
        fontFamily: Fonts.Normale,
        marginBottom: 16,
        textAlignVertical: "top",
    },
    rigaBottoni: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
});
