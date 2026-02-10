import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { inserisciSottoCategoria } from "@/dati/DB";
import { Colori, Fonts, Testo } from "@/theme/index";

import BottoneNavigazione from "@/componenti/(bottoni)/Bottone_Navigazione";
import Popup from "@/componenti/(popup)/Popup";
import BottoneAzione from "@/componenti/(bottoni)/Bottone_Azione";

type Params = {
    id: string;
    nome: string;
};

export default function Inserisci_CategoriaSott() {
    const [nomeSott, setNome] = useState("");
    const { id, nome } = useLocalSearchParams<Params>();
    const router = useRouter();
    
    // Stato per popup
    const [popupVisibile, setPopupVisibile] = useState(false);
    const [popupTitolo, setPopupTitolo] = useState("");
    const [popupMessaggio, setPopupMessaggio] = useState("");
    const [popupConferma, setPopupConferma] = useState<(() => void) | undefined>(undefined);

    const mostraMessaggio = (titolo: string, messaggio: string, onConfirm?: () => void) => {
        setPopupTitolo(titolo);
        setPopupMessaggio(messaggio);
        setPopupConferma(() => () => {
            setPopupVisibile(false);
            if (onConfirm) onConfirm();
        });
        setPopupVisibile(true);
    };

    const salvaCategoriaSott = async () => {
        if (!nomeSott.trim()) {
            mostraMessaggio("Errore", "Inserisci un nome valido");
            return;
        }
        try {
            await inserisciSottoCategoria(nomeSott.trim(),parseInt(id));
            mostraMessaggio(
                "Sottocategoria inserita:",
                ` "${nomeSott}" `,
                () => {     
                    setNome("")
                    router.replace(`/Gestisci_SottoCategorie?id=${id}&nome=${nome}`);
            });
        }
        catch (error: any) {
            if (error.message.includes("UNIQUE")) {
                mostraMessaggio("Sottocategoria gia' esistente:", ` "${nome}" `);
            } else {
                mostraMessaggio("Errore", "Si è verificato un errore");
                console.error(error);
            }
        }
    };

    return (
        <View style={stile.contenitore}>
            <View style={stile.contTitolo}>
                <Text style={stile.titolo}>Nuova Sottocategoria</Text>
            </View>
            <Text style={stile.testoinfo}>Nome sottocategoria:</Text>
            <TextInput
                style={stile.text_input}
                placeholder=""
                value={nomeSott}
                onChangeText={setNome}
            />
            <View style={stile.contenitoreBottoni}>
                <BottoneNavigazione
                    nome="Indietro"
                    colore="rosso"
                    dimensione="dimensioneLato"
                    onPressOverride={() => router.replace(`/Gestisci_SottoCategorie?id=${id}&nome=${nome}`)}
                />
                <BottoneAzione
                    label="Salva"
                    colore="verde"
                    dimensione="dimensioneLato"
                    onPress={salvaCategoriaSott}
                />
            </View>
            <Popup
                visible={popupVisibile}
                titolo={popupTitolo}
                messaggio={popupMessaggio}
                onConfirm={popupConferma}
                testoConfirm="Ok"
            />
        </View>
    );
}


const stile = StyleSheet.create({
    contenitore: {
        flex: 1,
        padding: 16,
        paddingTop: 100,
        alignItems: "center",
        backgroundColor: Colori.background,
    },
    contTitolo: {
        ...Testo.TitoloContenitore,
        marginBottom: 6,
        alignItems: "center" as const,
    },
    titolo: {
        fontFamily: Testo.Titolo.fontFamily,
        fontSize: 45,
        color: Testo.Titolo.color,
    },
    testoinfo:{
        alignSelf: "flex-start",
        marginTop: 65,
        marginLeft: 30,
        fontFamily: Fonts.Normale,
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: 18,
        color: Colori.text2,
    },
    text_input: {
        width: "85%",
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: Colori.bordo,
        borderRadius: 16,
        fontSize: 16,
        fontFamily: Fonts.Normale,
        color: Colori.text2,
    },
    contenitoreBottoni: {
        flexDirection: "row",
        gap: 12,
        alignSelf: "stretch",
        marginTop: 70,
        paddingHorizontal: 16,
    },
});