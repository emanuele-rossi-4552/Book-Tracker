import { View, Text, Modal, Pressable, StyleSheet, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import { Colori, BottoneBase, BottoneColore, Testo , Fonts} from "@/theme";

type Props = {
    visible: boolean;
    onClose: () => void;
    onApply: (categoria: string | null, autore: string | null, ordine: "Titolo" | "Autore" | "Categoria" | null) => void;
    categorie: string[];
};

export default function FiltroLibri({ visible, onClose, onApply, categorie}: Props) {
    const [categoria, setCategoria] = useState<string | null>(null);
    const [autore, setAutore] = useState<string | null>(null);
    const [ordine, setOrdine] = useState<"Titolo" | "Autore" | "Categoria" | null>(null);

    const resetFiltri = () => {
        setCategoria(null);
        setAutore(null);
        setOrdine(null);
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={stile.overlay}>
                <View style={stile.container}>
                    <Text style={stile.titolo}>Filtra / Ordina</Text>

                    <Text style={stile.label}>Seleziona Categoria:</Text>
                    <ScrollView style={stile.categorieScroll} nestedScrollEnabled={true}>
                        <View style={stile.categorieGrid}>
                            {categorie.map(c => (
                            <Pressable
                                key={c}
                                onPress={() => setCategoria(prev => (prev === c ? null : c))}
                                style={stile.categoriaItem}
                            >
                                <Text style={[stile.option, categoria === c && stile.optionSelezionata]}>
                                {c}
                                </Text>
                            </Pressable>
                            ))}
                        </View>
                    </ScrollView>

                    <Text style={stile.label}>Filtra per Autore:</Text>
                    <TextInput
                        style={stile.input}
                        placeholder="Nome autore"
                        value={autore ?? ""}
                        onChangeText={t => setAutore(t)}
                    />

                    <Text style={stile.label}>Ordina alfabetico per:</Text>
                    <View style={stile.mettiAffianco}> 
                        {(["Titolo", "Autore", "Categoria"] as const).map(o => (
                        <Pressable key={o} onPress={() =>setOrdine(prev => (prev === o ? null : o))}>
                            <Text style={[stile.option, ordine === o && stile.optionSelezionata]}>{o}</Text>
                        </Pressable>
                        ))}
                    </View>

                    <View style={stile.bottoni}>
                        <Pressable
                            style={[stile.bottone, BottoneColore.giallo]}
                            onPress={onClose}
                        >
                            <Text style={stile.testoBottone}>Indietro</Text>
                        </Pressable>

                        <Pressable
                            style={[stile.bottone, BottoneColore.rosso]}
                            onPress={() => onApply(null, null, null)}
                        >
                            <Text style={stile.testoBottone}>Elimina</Text>
                        </Pressable>

                        <Pressable
                            style={[stile.bottone, BottoneColore.verde]}
                            onPress={() => onApply(categoria, autore, ordine)}
                        >
                            <Text style={stile.testoBottone}>Applica</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </Modal>
    );
}

const stile = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    container: {
        width: "90%",
        backgroundColor: Colori.background,
        borderRadius: 24,
        padding: 16,
    },

    titolo: {
        ...Testo.Titolo,
        fontSize: 40,
        alignSelf: "center",
    },

    label: {
        fontFamily: Fonts.Normale,
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: 18,
        marginTop: 12,
        marginBottom: 8,
        marginLeft: 10,
    },

    option: {
        fontFamily: Fonts.Normale,
        fontSize: 18,
        padding: 4,
        alignSelf: "center",
    },

    optionSelezionata: {
        backgroundColor: Colori.selezione,
        borderRadius: 14,
    },

    input: {
        borderWidth: 1,
        borderColor: Colori.bordo,
        borderRadius: 16,
        padding: 8,
        marginTop: 4,
        width: "90%",
        alignSelf: "center",
    },

    bottoni: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },

    bottone: {
        ...BottoneBase.container,
        flex: 1,
        marginHorizontal: 6,
    },

    testoBottone: {
        ...Testo.BottoneTesto,
        fontSize: 24,
        fontWeight: "600",
    },

    categorieScroll: {
        maxHeight: 140,
        marginTop: 4,
    },

    categorieGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    categoriaItem: {
        width: "48%",
        alignItems: "center",
    },

    mettiAffianco: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 4,
    },
});

