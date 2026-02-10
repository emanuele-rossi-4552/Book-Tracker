import { Commento, getCommentiPerLibro, getLibroById } from "@/dati/DB";
import { Colori, Fonts } from "@/theme/index";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import BottoneAzione from "@/componenti/(bottoni)/Bottone_Azione";
import BottoneNavigazione from "@/componenti/(bottoni)/Bottone_Navigazione";
import Card_Commento from "@/componenti/(card)/Card_Commento";
import React from "react";

export default function View_Libro() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [libro, setLibro] = useState<any>(null);
    const [commenti, setCommenti] = useState<Commento[]>([]);

    useEffect(() => {
        const id = Number(params.id);
        if (!isNaN(id)){
            fetchLibro(id);
            caricaCommenti(id);
        } 
    }, [params.id]);

    useFocusEffect(
        useCallback(() => {
            if (libro?.id) {
                fetchLibro(libro.id);
                caricaCommenti(libro.id);
            }
        }, [libro?.id])
    )

    const fetchLibro = async (id: number) => {
        const data = await getLibroById(id);
        if (!data) {
            Alert.alert("Errore", "Libro non trovato");
            return;
        }
        setLibro(data);
    };

    
    const caricaCommenti = async (idLibro: number) => {
        try {
            const dati = await getCommentiPerLibro(idLibro);
            setCommenti(dati);
        } catch (error) {
            console.error("Errore caricando commenti:", error);
        }
    };

    if (!libro) return <Text>Caricamento...</Text>;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colori.background }}>
            <View style={stile.contenitore}>

                {/* Titolo e voto */}
                <View style={stile.header}>
                    <Text style={stile.titolo} numberOfLines={2} ellipsizeMode="tail">
                        {libro.titolo}
                    </Text>
                    <Text style={stile.voto}>{libro.voto}/10</Text>
                </View>


                {/* Autore, Categoria, Sottocategoria */}
                <Text style={[stile.info, { alignSelf: "center" }]}>
                    <Text style={stile.etichetta}>Autore: </Text>
                    <Text style={stile.valore}>{libro.autore}</Text>
                </Text>
                <Text style={[stile.info, { marginLeft: 20 }]}>
                    <Text style={stile.etichetta}>Categoria: </Text>
                    <Text style={stile.valore}>{libro.categoria ?? "-"}</Text>
                </Text>
                <Text style={[stile.info, { marginLeft: 20 }]}>
                    <Text style={stile.etichetta}>Sottocategoria: </Text>
                    <Text style={stile.valore}>{libro.sottocategoria || "-"}</Text>
                </Text>

                {/* Descrizione */}
                <Text style={stile.info}>
                    <Text style={stile.etichetta}>Descrizione: </Text>
                </Text>
                <ScrollView style={stile.descrizioneContainer}>
                    <Text style={stile.descrizione}>{libro.descrizione}</Text>
                </ScrollView>

                {/* Commenti */}
                <Text style={stile.info}>
                    <Text style={stile.etichetta}>Commenti: </Text>
                </Text>
                <ScrollView style={stile.commentiContainer}>
                    {commenti.map((c) => (
                        <Card_Commento key={c.id} data={c.data} testo={c.testo} />
                    ))}
                </ScrollView>


                {/* Bottoni */}
                <View style={stile.bottoniContainer}>
                    <View style={stile.rigaBottoni}>
                        <BottoneNavigazione
                            route={`/Gestisci_Commenti?idLibro=${libro.id}`}
                            nome="Gestisci commenti"
                            colore="verde"
                            dimensione="dimensione1"
                        />
                    </View>
                    <View style={stile.rigaBottoni}>
                        <BottoneAzione
                            label="Indietro"
                            onPress={() => router.back()}
                            colore="giallo"
                            dimensione="dimensioneLato"
                        />
                        <BottoneNavigazione
                            route={`/Modifica_Libro?id=${libro.id}`}
                            nome="Modifica"
                            colore="giallo"
                            dimensione="dimensioneLato"
                        />
                        
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const stile = StyleSheet.create({
    contenitore: {
        flex: 1,
        padding: 18,
        paddingHorizontal: 32,
        paddingBottom: 10,
        backgroundColor: Colori.background,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 20,
    },
    titolo: {
        fontFamily: Fonts.Normale,
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
        flexShrink: 1,
        flexWrap: "wrap",
        maxWidth: "80%",
    },
    voto: {
        fontFamily: Fonts.Normale,
        fontSize: 18,
        marginLeft: 10,
        marginRight: 30,
    },
    info: {
        marginVertical: 10,
    },
    descrizione: {
        fontSize: 16,
        fontFamily: Fonts.Normale,
    },
    descrizioneContainer: {
        maxHeight: 110, 
        marginRight: 20,
        marginLeft: 40,
    },
    commentiContainer: {
        maxHeight: 175,
    },

    bottoniContainer: {
        marginTop: 5,
    },
    rigaBottoni: {
        flexDirection: "row",
        gap: 12,
        justifyContent: "space-between",
        marginBottom: 12,
    },
    etichetta: {
        fontFamily: Fonts.Normale,
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: 18,
        marginTop: 12,
        marginLeft: 10,
    },
    valore: {
        fontFamily: Fonts.Normale,
        fontSize: 18,
        marginTop: 12,
        marginLeft: 10,
    },
});
