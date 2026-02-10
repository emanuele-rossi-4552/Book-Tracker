import BottoneNavigazione from "@/componenti/(bottoni)/Bottone_Navigazione";
import Popup from "@/componenti/(popup)/Popup";
import { getCategorie, getSottoCategorie, inserisciLibro } from "@/dati/DB";
import { Colori, Fonts, Testo } from "@/theme/index";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import BottoneAzione from "@/componenti/(bottoni)/Bottone_Azione";
import { CustomPicker } from "@/componenti/(popup)/CustomPicker";

export default function Inserisci_Libro() {
    const [nome, setNome] = useState("");
    const [autore, setAutore] = useState("");
    const [descrizione, setDescrizione] = useState("");

    const [categoria, setCategoria] = useState<number | null>(null);
    const [sottocategoria, setSottoCategoria] = useState<number | null>(null);
    const [categorie, setCategorie] = useState<any[]>([]);
    const [sottoCategorie, setSottoCategorie] = useState<any[]>([]);

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

    useEffect(() => {
        const caricaCategorie = async () => {
            try {
                const dati = await getCategorie();
                setCategorie(dati);
            } catch (error) {
                console.error("Errore caricando categorie:", error);
            }
        };
        caricaCategorie();
    }, []);

    useEffect(() => {
        if (categoria === null) {
            setSottoCategorie([]);
            return;
        }

        const caricaSottoCategorie = async () => {
            try {
                const dati = await getSottoCategorie(categoria);
                setSottoCategorie(dati);
            } catch (error) {
                console.error("Errore caricando sottocategorie:", error);
            }
        };
        caricaSottoCategorie();
    }, [categoria]);

    const salvaLibro = async () => {
        if (!nome.trim() || !autore.trim() ) {
            mostraMessaggio("Errore", "Compilare nome libro e autore");
            return;
        }

        try {
            await inserisciLibro(0, nome, descrizione, autore, categoria, sottocategoria);
            setNome("");
            setAutore("");
            setDescrizione("");
            setCategoria(null);
            setSottoCategoria(null);
            mostraMessaggio("", "Nuovo libro inserito");
        } catch (error) {
            console.error("Errore salvando libro:", error);
            mostraMessaggio("Errore", "Inserimento fallito");
        }
    };

    return (
        <View style={stile.contenitore}>
            <Text style={stile.titolo}>Nuovo Libro</Text>

            {/* Nome libro + Autore */}
            <View style={stile.rigaInput}>
                <TextInput
                    style={[stile.text_input, stile.inputCorto]}
                    placeholder="Nome libro"
                    value={nome}
                    onChangeText={setNome}
                />

                <TextInput
                    style={[stile.text_input, stile.inputCorto]}
                    placeholder="Autore"
                    value={autore}
                    onChangeText={setAutore}
                />
            </View>

            {/* Descrizione */}
            <TextInput
                style={[stile.text_input, stile.textArea]}
                placeholder="Descrizione (facoltativa)"
                value={descrizione}
                onChangeText={setDescrizione}
                multiline
                numberOfLines={12}
            />

            {/* Categoria */}
            <Text style={stile.testoCat}>Categoria:</Text>
            <View style={stile.selectContainer}>
                <CustomPicker
                    value={categoria}
                    onChange={(value) => {
                        setCategoria(value);
                        setSottoCategoria(null);
                    }}
                    placeholder="Seleziona Categoria"
                    items={categorie.map(c => ({
                        label: c.nome,
                        value: c.id,
                    }))}
                    allowClear={true}
                />
            </View>

            {/* Sottocategoria */}
            <Text style={stile.testoCat}>Sotto categoria (facoltativa):</Text>
            <View style={stile.selectContainer}>
                <CustomPicker
                    enabled={categoria !== null && sottoCategorie.length > 0} // <-- disabilitato altrimenti
                    value={sottocategoria}
                    onChange={setSottoCategoria}
                    placeholder={
                        categoria === null
                        ? "Seleziona una categoria"
                        : sottoCategorie.length === 0
                        ? "Nessuna sottocategoria disponibile"
                        : "Seleziona sottocategoria"
                    }
                    items={sottoCategorie.map(sc => ({
                        label: sc.nome,
                        value: sc.id,
                    }))}
                    allowClear={true}
                />

            </View>

            {/* Bottoni */}
            <View style={stile.contenitoreBottoni}>
                <BottoneNavigazione
                    route="/"
                    nome="Home"
                    colore="rosso"
                    dimensione="dimensioneLato"
                />
                <BottoneAzione
                    label="Salva"
                    colore="verde"
                    dimensione="dimensioneLato"
                    onPress={salvaLibro}
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
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colori.background,
    },
    text_input: {
        width: "90%",
        marginTop: 20,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: Colori.bordo,
        borderRadius: 16,
        fontSize: 18,
        fontFamily: Fonts.Normale,
        color: Colori.text2,
    },
    rigaInput: {
        flexDirection: "row",
        width: "90%",
        gap: 12,
    },
    inputCorto: {
        flex: 1,
        color: Colori.text2,
        borderColor: Colori.bordo,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
        color: Colori.text2,
        borderColor: Colori.bordo,
    },
    selectContainer: {
        marginTop: 12,
        overflow: "hidden",
        width: "90%",
        height: 50,
        justifyContent: "center",
    },
    testoCat: {
        marginTop: 10,
        alignSelf: "flex-start",
        marginLeft: "10%",
        fontFamily: Fonts.Normale,
        fontStyle: "italic",
        fontSize: 18,
        color: Colori.text,
    },
    titolo: {
        fontFamily: Testo.Titolo.fontFamily,
        fontSize: 50,
        color: Testo.Titolo.color,
        marginBottom: 0,
    },
    contenitoreBottoni: {
        flexDirection: "row",
        gap: 12,
        alignSelf: "stretch",
        marginTop: 24,
        paddingHorizontal: 16,
    },
});
