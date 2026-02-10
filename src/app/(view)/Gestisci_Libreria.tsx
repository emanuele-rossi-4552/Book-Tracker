import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import BottoneAzione from "@/componenti/(bottoni)/Bottone_Azione";
import BottoneNavigazione from "@/componenti/(bottoni)/Bottone_Navigazione";
import Card_Libri from "@/componenti/(card)/Card_Libri";
import FiltroLibri from "@/componenti/(popup)/FiltroLibri";

import { LibroCard, getCategorie, getLibriPerCard } from "@/dati/DB";
import { Colori, Testo } from "@/theme/index";
import { useLocalSearchParams } from "expo-router";
import { useAndroidBackHandler } from "@/componenti/(hooks)/useAndroidBackHandler";


export default function Libreria() {
    const [libri, setLibri] = useState<LibroCard[]>([]);
    const [libriFiltrati, setLibriFiltrati] = useState<LibroCard[]>([]);
    const [modalVisibile, setModalVisibile] = useState(false);
    const [categorie, setCategorie] = useState<string[]>([]);

    const { stato } = useLocalSearchParams<{ stato: string }>();
    const statoLibro = Number(stato); // 0 o 1

    const caricaLibri = async () => {
        try {
            const dati = await getLibriPerCard(statoLibro);
            setLibri(dati);
            setLibriFiltrati(dati);
        } catch (error) {
            console.error("Errore caricando libri:", error);
        }
    };

    const applicaFiltri = (c?: string | null, a?: string | null, o?: "Titolo" | "Autore" | "Categoria" | null) => {
        let risultato = [...libri];

        if (c) risultato = risultato.filter(l => l.nomeCategoria === c);
        if (a) {
            const needle = a.toLowerCase();
            risultato = risultato.filter(l => l.autore?.toLowerCase().includes(needle));
        }

        if (o === "Titolo") risultato.sort((a, b) => a.nomeLibro.localeCompare(b.nomeLibro));
        if (o === "Autore") risultato.sort((a, b) => a.autore.localeCompare(b.autore));
        if (o === "Categoria") risultato.sort((a, b) => a.nomeCategoria.localeCompare(b.nomeCategoria));

        setLibriFiltrati(risultato);
        setModalVisibile(false);
    };
    
    useAndroidBackHandler({
        fallbackRoute: "/",
        params: { refresh: false },
    });

    useEffect(() => {
        caricaLibri();

        const caricaCategorie = async () => {
            const c = await getCategorie();
            setCategorie(c.map(cat => cat.nome));
        };

        caricaCategorie();
    }, [statoLibro]);

    useFocusEffect(
        useCallback(() => {
            caricaLibri();
        }, [statoLibro])
    );

    return (
        <View style={stile.contenitore}>
            <View style={stile.contTitolo}>
                <Text style={stile.titolo}>Libreria</Text>
            </View>

            <ScrollView
                style={stile.scroll}
                contentContainerStyle={stile.contenitoreCard}
            >
                {libriFiltrati.map(libro => (
                    <Card_Libri key={libro.id} libro={libro} />
                ))}
            </ScrollView>

            <View style={stile.contenitoreBottoni}>
                <BottoneNavigazione
                    route="/"
                    nome="Home"
                    colore="rosso"
                    dimensione="dimensioneLato"
                />
                <BottoneAzione
                    label="Filtra"
                    onPress={() => setModalVisibile(true)}
                    colore="giallo"
                    dimensione="dimensioneLato"
                />
            </View>

            <FiltroLibri
                visible={modalVisibile}
                onClose={() => setModalVisibile(false)}
                onApply={(c, a, o) => applicaFiltri(c, a, o)}
                categorie={categorie}
            />
        </View>
    );
}

const stile = StyleSheet.create({
    contenitore: {
        flex: 1,
        padding: 16,
        backgroundColor: Colori.background,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    contTitolo: {
        ...Testo.TitoloContenitore,
        alignItems: "center",
    },
    titolo: {
        ...Testo.Titolo,
        fontSize: 60,
    },
    scroll: {
        maxHeight: 525,
        width: "100%",
    },
    contenitoreCard: {
        width: "90%",
        padding: 6,
        gap: 8,
        alignSelf: "center",
        alignItems: "center",
    },
    contenitoreBottoni: {
        flexDirection: "row",
        gap: 12,
        alignSelf: "stretch",
        marginTop: 35,
        paddingHorizontal: 18,
    },
});
