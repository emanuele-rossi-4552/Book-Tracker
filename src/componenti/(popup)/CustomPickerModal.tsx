import { Modal, View, Text, Pressable, FlatList, StyleSheet} from "react-native";
import { Colori, Fonts } from "@/theme/index";

type PickerItem = {
    label: string;
    value: any;
};

type Props = {
    visible: boolean;
    items: PickerItem[];
    onSelect: (value: any) => void;
    onClose: () => void;
    allowClear?: boolean;
};

export function CustomPickerModal({
    visible,
    items,
    onSelect,
    onClose,
    allowClear = false,
}: Props) {

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <Pressable style={styles.overlay} onPress={onClose}>
                <View style={styles.modal}>
                    <FlatList
                        style={styles.list}
                        data={allowClear ? [{ label: "-", value: null }, ...items] : items} // <-- aggiunto "-"
                        keyExtractor={(item) => String(item.value)}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.item}
                                onPress={() => {
                                    onSelect(item.value);
                                    onClose();
                                }}
                            >
                                <Text style={styles.itemText}>{item.label}</Text>
                            </Pressable>
                        )}
                    />
                </View>
            </Pressable>
        </Modal>
    );
}

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    padding: 24,
  },

  modal: {
    backgroundColor: Colori.background,
    borderRadius: 18,
    maxHeight: "70%",
    overflow: "hidden",
  },

    list: {
        maxHeight: 410,
    },

  item: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#0000001c",
  },

  itemText: {
    fontSize: 18,
    fontFamily: Fonts.Normale,
    color: Colori.text,
  },
});
