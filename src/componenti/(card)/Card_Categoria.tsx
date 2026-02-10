import Popup from "@/componenti/(popup)/Popup";
import { eliminaCategoria } from "@/dati/DB";
import { BottoneBase, BottoneColore, Testo } from "@/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
    tipo: number;
    id: number;
    nome: string;
    onDeleted?: () => void;
};

export default function Card_Categoria({
    id,
    nome,
    tipo,
    onDeleted,
}: Props) {
    const router = useRouter();
    const [mostraPopup, setMostraPopup] = useState(false);

    const vaiCategoria = () => {
        if (tipo === 0) {
            router.push({
                pathname: "/Gestisci_SottoCategorie" as any,
                params: { id: id.toString(), nome },
            });
        }
    };

    const elimina = async () => {
        await eliminaCategoria(id, tipo);
        setMostraPopup(false);
        onDeleted?.();
    };

    return (
        <>
            <Pressable
                style={[
                    BottoneBase.container,
                    BottoneColore.base,
                    styles.card,
                ]}
                onPress={vaiCategoria}
                onLongPress={() => setMostraPopup(true)}
                delayLongPress={500}
            >
                <Text style={styles.testo}>{nome}</Text>
            </Pressable>

            <Popup
                visible={mostraPopup}
                titolo="Vuoi eliminare:"
                messaggio={`"${nome}" ?`}
                onConfirm={elimina}
                onCancel={() => setMostraPopup(false)}
                testoCancel="No"
                testoConfirm="Si"
            />
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        minHeight: 70,
    },
    testo: {
        ...Testo.BottoneTesto,
    },
});
