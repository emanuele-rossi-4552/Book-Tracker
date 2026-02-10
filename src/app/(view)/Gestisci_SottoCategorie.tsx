import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { getSottoCategorie } from "@/dati/DB";

import BottoneNavigazione from "@/componenti/(bottoni)/Bottone_Navigazione";
import Card_Categoria from "@/componenti/(card)/Card_Categoria";
import { Colori, Testo } from "@/theme/index";
import { useAndroidBackHandler } from "@/componenti/(hooks)/useAndroidBackHandler";

type Params = {
    id: string;
    nome: string;
}

export default function Gestisci_SottoCategorie() {    

    const { id, nome } = useLocalSearchParams<Params>();
    const [sottocategorie, setSottocategorie] = useState([]);

    const caricaSottocategorie = async () => {
        try {
            if (!id) return;
            const dati = await getSottoCategorie(parseInt(id));
            setSottocategorie(dati);
        } catch (error) {
            console.error("Errore caricando sottocategorie:", error);
        }
    };

    useAndroidBackHandler({
        fallbackRoute: "/Gestisci_Categoria",
        params: { refresh: false },
    });

    useEffect(() => {
        caricaSottocategorie();
    }, [id]);

    return (
        <View style={stile.container}>
            <View style={stile.contTitolo}>
                <Text style={stile.titolo}>{nome}</Text>
            </View>

            <ScrollView 
                style={stile.scroll} 
                contentContainerStyle={stile.contenitoreCard}
            >{sottocategorie.map((sub) => (
                    <Card_Categoria 
                        key={sub.id}
                        id={sub.id}
                        nome={sub.nome}
                        tipo={1} 
                        onDeleted={caricaSottocategorie}
                    />
                ))}
            </ScrollView>

            <View style={stile.contenitoreBottoni}>
                <BottoneNavigazione 
                    route={`/Inserisci_CategoriaSott?id=${id}&nome=${nome}`}
                    nome="Inserisci Sottocategoria" colore="giallo"
                    dimensione="dimensione1"/>
                <BottoneNavigazione 
                    route="/Gestisci_Categoria" 
                    nome="Indietro" colore="rosso" 
                    dimensione="dimensione1"/>
            </View>
        </View>
    );
  }

const stile = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colori.background,
    },
    contTitolo: {
        ...Testo.TitoloContenitore,
        maxHeight: 100,
        alignItems: "center" as const,
    },
    titolo: {
        fontFamily: Testo.Titolo.fontFamily,
        fontSize: 60,
        color: Testo.Titolo.color,
    },
    contenitoreCard: {
        padding: 14,
        gap: 16,
    },
    scroll: {
        maxHeight: 450,
        width: "100%",

    },
    contenitoreBottoni: {
        padding: 16,
        gap: 18,
    },
});
