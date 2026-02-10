import { Modal, View, Text, StyleSheet, Pressable, ImageBackground } from "react-native";
import { Colori, Fonts, BottoneBase, Testo } from "@/theme/index";

type Props = {
    visible: boolean;
    titolo?: string;
    messaggio: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    testoConfirm?: string;
    testoCancel?: string;
};

export default function Popup({
    visible,
    titolo,
    messaggio,
    onConfirm,
    onCancel,
    testoConfirm = "Si",
    testoCancel = "No",
}: Props) {

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={stile.overlay}>
                <ImageBackground
                    source={require("@/assets/Img/popup_bg.png")}
                    style={stile.popup}
                    imageStyle={[stile.sfondo, { transform: [{ translateX: 11 }, { translateY: -84 }] }]}
                >
                    <View style={stile.contenuto}>
                        {titolo && <Text style={stile.titolo}>{titolo}</Text>}
                        <Text style={stile.testo}>{messaggio}</Text>
                    </View>

                    <View style={stile.bottoni}>
                        {onCancel && (
                            <Pressable style={[BottoneBase.container, stile.bottone]} onPress={onCancel}>
                                <Text style={[Testo.BottoneTesto, { color: "#000000" }]}>{testoCancel}</Text>
                            </Pressable>
                        )}

                        {onConfirm && (
                            <Pressable style={[BottoneBase.container, stile.bottone]} onPress={onConfirm}>
                                <Text style={[Testo.BottoneTesto, { color: "#000000" }]}>{testoConfirm}</Text>
                            </Pressable>
                        )}
                    </View>
                </ImageBackground>
            </View>
        </Modal>
    );
}

const stile = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    popup: {
        width: "100%",
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    sfondo: {
        resizeMode: "contain",
        width: "100%",
        height: 320,
        marginBottom: 10,
    },
    contenuto: {
        alignItems: "center",
        marginBottom: 5,
    },
    titolo: {
        fontFamily: Fonts.Corsivo,
        fontSize: 26,
        color: Colori.text,
        textAlign: "center",
        marginBottom: 3,
    },
    testo: {
        fontFamily: Fonts.Corsivo,
        fontSize: 22,
        color: Colori.text,
        textAlign: "center",
        marginBottom: 0,
    },
    bottoni: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },
    bottone: {
        paddingVertical: 0,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "transparent",
    },
});
