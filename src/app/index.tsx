import BottoneNavigazione from "@/componenti/(bottoni)/Bottone_Navigazione";
import { contaLibriLetti } from "@/dati/DB";
import { Colori, Testo } from "@/theme/index";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import BottoneAzione from "@/componenti/(bottoni)/Bottone_Azione";

export default function Index() {
    const [totLibriLetti, setTotLibriLetti] = useState(0);

    const caricaTotale = async () => {
        try {
            const totale = await contaLibriLetti();
            setTotLibriLetti(totale);
        } catch (e) {
            console.error("Errore conteggio libri letti:", e);
        }
    };

    useEffect(() => {
        caricaTotale();
    }, []);

    return ( 
        <View style={stile.contenitore}>
            <View style={stile.contatore}>
                <Text style={stile.titoloContatore}>
                    Libri letti: {totLibriLetti}
                </Text>
            </View>

            <View style={stile.bottoni}>
                <BottoneNavigazione route="/Gestisci_Libreria?stato=1" nome="Libri Letti" colore="base" dimensione="dimensione1"/>
                <BottoneNavigazione route="/Gestisci_Libreria?stato=0" nome="Libri da Leggere" colore="base" dimensione="dimensione1"/>
                <BottoneNavigazione route="/Inserisci_Libro" nome="Nuovo libro" colore="giallo" dimensione="dimensione1"/>
                <BottoneNavigazione route="/Gestisci_Categoria" nome="Gestisci categorie" colore="giallo" dimensione="dimensione1"/>
                <BottoneAzione label="Esci" colore="rosso" dimensione="dimensione1" onPress={() => BackHandler.exitApp()} />
            </View>
        </View>
    );
}

const stile = StyleSheet.create({
    contenitore: {
        flex: 1,
        padding: 20,
        gap: 22,
        backgroundColor: Colori.background,
    },
    contatore: {
        ...Testo.TitoloContenitore,
        alignItems: "center" as const,
        marginBottom: 8,
    },
    titoloContatore: {
        fontFamily: Testo.Titolo.fontFamily,
        fontSize: 60,
        color: Testo.Titolo.color,
    },
    bottoni: {
        gap: 20,
    },
});
