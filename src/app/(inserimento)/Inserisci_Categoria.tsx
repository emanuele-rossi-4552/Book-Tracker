import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { inserisciCategoria } from "@/dati/DB";
import { Colori, Fonts, Testo } from "@/theme/index";
import BottoneNavigazione from "@/componenti/(bottoni)/Bottone_Navigazione";
import Popup from "@/componenti/(popup)/Popup";
import BottoneAzione from "@/componenti/(bottoni)/Bottone_Azione";

export default function Inserisci_Categoria() {
    const [nome, setNome] = useState("");
    const router = useRouter();

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

    const salvaCategoria = async () => {
        if (!nome.trim()) {
            mostraMessaggio("Errore", "Inserisci un nome valido");
            return;
        }
        try {
            await inserisciCategoria(nome.trim());
            mostraMessaggio(
                "Categoria inserita:",
                ` "${nome}" `,
                () => {
                    setNome("");
                    router.replace("/Gestisci_Categoria");
                }
            );
        }
        catch (error: any) {
            if (error.message.includes("UNIQUE")) {
                mostraMessaggio("Categoria gia' esistente:", ` "${nome}" `);
            } else {
                mostraMessaggio("Errore", "Si è verificato un errore");
                console.error(error);
            }
        }
    };

    return (
        <View style={stile.contenitore}>
            <View style={stile.contTitolo}>
                <Text style={stile.titolo}>Nuova Categoria</Text>
            </View>
            <Text style={stile.testoinfo}>Nome categoria:</Text>
            <TextInput
                style={stile.text_input}
                placeholder=""
                value={nome}
                onChangeText={setNome}
            />

            <View style={stile.contenitoreBottoni}>
                <BottoneNavigazione
                    route="/Gestisci_Categoria"
                    nome="Indietro"
                    colore="rosso"
                    dimensione="dimensioneLato"
                />
                <BottoneAzione
                    label="Salva"
                    colore="verde"
                    dimensione="dimensioneLato"
                    onPress={salvaCategoria}
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
        alignItems: "center" as const,
        marginBottom: 0,
    },
    titolo: {
        fontFamily: Testo.Titolo.fontFamily,
        fontSize: 50,
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