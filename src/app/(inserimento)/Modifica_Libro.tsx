import { Colori, Fonts } from "@/theme/index";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { CustomPicker } from "@/componenti/(popup)/CustomPicker";

import {
    aggiornaLibro,
    eliminaLibro,
    getCategorie,
    getLibroModId,
    getSottoCategorie
} from "@/dati/DB";

import BottoneAzione from "@/componenti/(bottoni)/Bottone_Azione";
import Popup from "@/componenti/(popup)/Popup";

export default function Modifica_Libro() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const [loading, setLoading] = useState(true);

    const [nome, setNome] = useState("");
    const [autore, setAutore] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [voto, setVoto] = useState<number | null>(null);
    const [stato, setStato] = useState<0 | 1>(0);

    const [categoria, setCategoria] = useState<number | null>(null);
    const [sottoCategoria, setSottoCategoria] = useState<number | null>(null);

    const [categorie, setCategorie] = useState<any[]>([]);
    const [sottoCategorie, setSottoCategorie] = useState<any[]>([]);

    const [popupElimina, setPopupElimina] = useState(false);

    useEffect(() => {
        const libroId = Number(id);
        if (isNaN(libroId)) return;

        const carica = async () => {
            const libro = await getLibroModId(libroId);
            if (!libro) {
                Alert.alert("Errore", "Libro non trovato");
                router.back();
                return;
            }

            setNome(libro.titolo);
            setAutore(libro.autore);
            setDescrizione(libro.descrizione ?? "");
            setVoto(libro.voto);
            setStato(libro.stato);

            setCategoria(libro.idCategoria);
            setSottoCategoria(libro.idSottoCategoria);

            const c = await getCategorie();
            setCategorie(c);

            if (libro.idCategoria !== null) {
                const sc = await getSottoCategorie(libro.idCategoria);
                setSottoCategorie(sc);
            }

            setLoading(false);
        };

        carica();
    }, [id]);

    useEffect(() => {
        if (!categoria) {
            setSottoCategorie([]);
            setSottoCategoria(null);
            return;
        }
        const carica = async () => {
            const sc = await getSottoCategorie(categoria);
            setSottoCategorie(sc);
        };
        carica();
    }, [categoria]);

    const salva = async () => {
        if (!nome.trim() || !autore.trim()) {
            Alert.alert("Errore", "Titolo e autore obbligatori");
            return;
        }

        await aggiornaLibro(
            Number(id),
            stato,
            nome.trim(),
            descrizione.trim(),
            autore.trim(),
            categoria,
            sottoCategoria,
            voto
        );

        router.back();
    };

    const confermaElimina = async () => {
        await eliminaLibro(Number(id));
        setPopupElimina(false);
        router.replace({
            pathname: "/Gestisci_Libreria",
            params: { stato: stato.toString() },
        });
    };

    if (loading) return <Text style={stile.caricamento}>Caricamento...</Text>;

    return (
        <ScrollView style={stile.contenitore}>
            <Text style={stile.titoloPagina}>Modifica Libro</Text>

            {/* Titolo e Autore */}
            <View style={stile.rigaDueColonne}>
                <View style={stile.colonna}>
                    <Text style={stile.label}>Titolo</Text>
                    <TextInput
                        style={stile.input}
                        value={nome}
                        onChangeText={setNome}
                        placeholder="Titolo"
                    />
                </View>
                <View style={stile.colonna}>
                    <Text style={stile.label}>Autore</Text>
                    <TextInput
                        style={stile.input}
                        value={autore}
                        onChangeText={setAutore}
                        placeholder="Autore"
                    />
                </View>
            </View>

            {/* Descrizione */}
            <Text style={stile.label}>Descrizione</Text>
            <TextInput
                style={[stile.input, stile.textArea]}
                value={descrizione}
                onChangeText={setDescrizione}
                placeholder="Descrizione"
                multiline
            />

            {/* Stato e Voto affiancati */}
            <View style={stile.rigaDueColonne}>
                {/* Stato */}
                <View style={stile.colonna}>
                    <CustomPicker
                        value={stato}
                        onChange={setStato}
                        placeholder="Da leggere" // opzionale, solo se vuoi un testo predefinito, altrimenti prende il label della value
                        items={[
                            { label: "Da leggere", value: 0 },
                            { label: "Letto", value: 1 },
                        ]}
                        enabled={true}
                    />
                </View>

                {/* Voto */}
                <View style={[stile.colonna, { flexDirection: "row", alignItems: "center" }]}>
                    <Text style={[stile.label, { marginRight: 8 }]}>Voto:</Text>
                    <TextInput
                        style={[stile.input, { flex: 1 }]}
                        value={voto?.toString() ?? ""}
                        keyboardType="numeric"
                        onChangeText={v => setVoto(v ? Number(v) : null)}
                    />
                </View>
            </View>

            {/* Categoria e Sottocategoria */}
            <View style={stile.rigaDueColonne}>
                <View style={stile.colonna}>
                    <Text style={stile.label}>Categoria</Text>
                    <CustomPicker
                        value={categoria}
                        onChange={(v) => {
                            setCategoria(v);
                            setSottoCategoria(null); // reset sottocategoria
                        }}
                        placeholder="-"
                        items={categorie.map(c => ({ label: c.nome, value: c.id }))}
                        allowClear={true}
                    />
                </View>

                <View style={stile.colonna}>
                    <Text style={stile.label}>Sottocategoria</Text>
                    <CustomPicker
                        value={sottoCategoria}
                        onChange={setSottoCategoria}
                        placeholder="-"
                        enabled={categoria !== null && sottoCategorie.length > 0}
                        items={sottoCategorie.map(sc => ({ label: sc.nome, value: sc.id }))}
                        allowClear={true}
                    />
                </View>
            </View>

            {/* Bottoni */}
            <View style={stile.bottoniContainer}>
                <View style={stile.rigaBottoni}>
                    <BottoneAzione
                        label="Elimina"
                        colore="rosso"
                        onPress={() => setPopupElimina(true)}
                        dimensione="dimensioneLato"
                    />
                    <BottoneAzione
                        label="Indietro"
                        colore="giallo"
                        onPress={() => router.back()}
                        dimensione="dimensioneLato"
                    />
                    <BottoneAzione
                        label="Salva"
                        colore="verde"
                        onPress={salva}
                        dimensione="dimensioneLato"
                    />
                </View>
            </View>

            {popupElimina && (
                <Popup
                    visible
                    titolo="Elimina libro"
                    messaggio="Eliminare definitivamente il libro?"
                    onConfirm={confermaElimina}
                    onCancel={() => setPopupElimina(false)}
                />
            )}
        </ScrollView>
    );
}

const stile = StyleSheet.create({
    contenitore: {
        flex: 1,
        padding: 22,
        paddingTop:120,
        backgroundColor: Colori.background,
    },
    titoloPagina: {
        fontSize: 44,
        fontFamily: Fonts.Corsivo,
        marginBottom: 10,
        textAlign: "center",
    },
    rigaDueColonne: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    colonna: {
        flex: 1,
        marginHorizontal: 4,
    },
    label: {
        fontFamily: Fonts.Normale,
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: 18,
        color: Colori.text,    
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 5,
        fontSize: 18,
        marginBottom: 18,
        fontFamily: Fonts.Normale,
        color: Colori.text2,
        borderColor: Colori.bordo,
    },
    textArea: {
        marginBottom: 22,
        minHeight: 100,
        textAlignVertical: "top",
        color: Colori.text2,
    },
    picker: {
        borderWidth: 1,
        borderRadius: 8,
        fontFamily: Fonts.Corsivo,
        borderColor: Colori.bordo,
        marginBottom: 10,
    },
    caricamento: {
        fontSize: 18,
        fontFamily: Fonts.Corsivo,
        textAlign: "center",
        marginTop: 50,
    },
    bottoniContainer: {
        marginTop: 30,
    },
    rigaBottoni: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
});
