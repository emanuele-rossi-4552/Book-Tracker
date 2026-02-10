import { creaCommento, eliminaCommenti, getCommentiPerLibro } from "@/dati/DB";
import { Colori, Testo } from "@/theme/index";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {  ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Inserisci_Commento from "@/app/(inserimento)/Inserisci_Commento";
import BottoneAzione from "@/componenti/(bottoni)/Bottone_Azione";
import Card_Commento from "@/componenti/(card)/Card_Commento";
import Popup from "@/componenti/(popup)/Popup";

export default function GestisciCommenti() {
    const router = useRouter();
    const { idLibro } = useLocalSearchParams<{ idLibro: string }>();

    const [commenti, setCommenti] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [showEliminaPopup, setShowEliminaPopup] = useState(false);
    const [showCreaPopup, setShowCreaPopup] = useState(false);
    const [nuovoTesto, setNuovoTesto] = useState("");

  // carica i commenti dal DB
    const caricaCommenti = async () => {
        if (!idLibro) return;
        const dati = await getCommentiPerLibro(Number(idLibro));
        setCommenti(dati.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()));
    };

    useEffect(() => {
        caricaCommenti();
    }, [idLibro]);

    const toggleSelezione = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const confermaElimina = async () => {
        if (selectedIds.length === 0) return;
        await eliminaCommenti(selectedIds); // da implementare in DB
        setSelectedIds([]);
        setShowEliminaPopup(false);
        caricaCommenti();
    };

    const confermaCrea = async () => {
        if (!nuovoTesto.trim()) return;
        await creaCommento(nuovoTesto.trim(), Number(idLibro));
        setNuovoTesto("");
        setShowCreaPopup(false);
        caricaCommenti();
    };


return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colori.background }}>
        <View style={stile.contenitore}>
            <Text style={stile.titolo}>Commenti:</Text>

            <ScrollView style={stile.scroll}>
            {commenti.map(c => (
                <Card_Commento
                    data={c.data}
                    key={c.id}
                    testo={c.testo}
                    selezionabile={true}
                    selezionato={selectedIds.includes(c.id)}
                    onPress={() => toggleSelezione(c.id)}
                />
            ))}
            </ScrollView>

            <View style={stile.bottoniContainer}>
                <View style={stile.rigaBottoni}>
                    <BottoneAzione
                        label="Elimina"
                        onPress={() => selectedIds.length > 0 ? setShowEliminaPopup(true) : null}
                        colore="rosso"
                        dimensione="dimensioneLato"
                    />
                    <BottoneAzione
                        label="Indietro"
                        onPress={() => router.back()}
                        colore="giallo"
                        dimensione="dimensioneLato"
                    />
                    <BottoneAzione
                        label="Crea"
                        onPress={() => setShowCreaPopup(true)}
                        colore="verde"
                        dimensione="dimensioneLato"
                    />
                </View>
            </View>

            {/* Popup elimina */}
            {showEliminaPopup && (
                <Popup
                    visible={showEliminaPopup}
                    titolo="Eliminare Commenti"
                    messaggio={`Eliminare ${selectedIds.length} commento(i)?`}
                    onConfirm={confermaElimina}
                    onCancel={() => setShowEliminaPopup(false)}
                />
            )}

            {/* Popup crea */}
                {showCreaPopup && (
                <Inserisci_Commento
                    visible={showCreaPopup}
                    onConfirm={async (testo) => {
                        await creaCommento(testo, Number(idLibro));
                        setShowCreaPopup(false);
                        caricaCommenti();
                    }}
                    onCancel={() => setShowCreaPopup(false)}
                />
            )}
        </View>
    </SafeAreaView>
  );
}

const stile = StyleSheet.create({
    contenitore: {
        flex: 1,
        paddingTop: 36,
        padding: 20,
        backgroundColor: Colori.background,
    },
    titolo: {
        ...Testo.Titolo,
        fontSize: 44,
        marginBottom: 4,
        alignSelf: "center",
    },
    scroll: {
        maxHeight: 570,
        marginBottom: 10,
    },
    bottoniContainer: {
        marginTop: 10,
    },
    rigaBottoni: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
});
