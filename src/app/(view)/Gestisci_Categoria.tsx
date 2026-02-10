import BottoneNavigazione from "@/componenti/(bottoni)/Bottone_Navigazione";
import Card_Categoria from "@/componenti/(card)/Card_Categoria";
import { Categoria, getCategorie } from "@/dati/DB";
import { Colori, Testo } from "@/theme/index";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAndroidBackHandler } from "@/componenti/(hooks)/useAndroidBackHandler";

export default function Gestisci_Categoria() {
    const [categorie, setCategorie] = useState<Categoria[]>([]);

    const caricaCategorie = async () => {
        try {
            const dati = await getCategorie();
            setCategorie(dati);
        } catch (error) {
            console.error("Errore caricando categorie:", error);
        }
    };

    useAndroidBackHandler({
        fallbackRoute: "/",
        params: { refresh: false },
    });

    useEffect(() => {
        caricaCategorie();
    }, []);

    return (
        <View style={stile.container}>
            <View style={stile.contTitolo}>
                <Text style={stile.titolo}>Categorie</Text>
            </View>

            <ScrollView 
                style={stile.scroll} 
                contentContainerStyle={stile.contenitoreCard}
            >
                {categorie.map((cat) => (
                    <Card_Categoria 
                        key={cat.id} 
                        id={cat.id} 
                        nome={cat.nome}  
                        tipo={0} 
                        onDeleted={caricaCategorie}
                    />
                ))}
            </ScrollView>

            <View style={stile.contenitoreBottoni}>
                <BottoneNavigazione 
                    route="/Inserisci_Categoria" 
                    nome="Inserisci Categoria" 
                    colore="giallo" 
                    dimensione="dimensione1"
                />
                <BottoneNavigazione 
                    route="/" 
                    nome="Home" 
                    colore="rosso" 
                    dimensione="dimensione1"
                />
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
