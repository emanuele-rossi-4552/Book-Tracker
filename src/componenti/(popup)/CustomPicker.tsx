import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { CustomPickerModal } from "./CustomPickerModal";
import { Colori, Fonts } from "@/theme/index";

type PickerItem = {
    label: string;
    value: any;
};

type Props = {
    value: any;
    onChange: (value: any) => void;
    items: PickerItem[];
    placeholder?: string;
    enabled?: boolean;
    allowClear?: boolean;
};

export function CustomPicker({
    value,
    onChange,
    items,
    placeholder = "Seleziona",
    enabled = true,
    allowClear = false,
}: Props) {
    const [open, setOpen] = useState(false);

    const selectedLabel =
    items.find(i => i.value === value)?.label ?? placeholder;

    return (
        <View style={styles.container}>
            <Pressable
                style={[
                    styles.button,
                    !enabled && styles.disabled,
                ]}
                onPress={() => enabled && setOpen(true)}
                >
                <Text
                    style={[
                    styles.text,
                    !enabled && styles.textDisabled,
                    ]}
                >
                    {selectedLabel}
                </Text>
            </Pressable>

            <CustomPickerModal
                visible={open}
                items={items}
                onSelect={onChange}
                onClose={() => setOpen(false)}
                allowClear={allowClear}
            />
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    button: {
        width: "100%",
        justifyContent: "center",
        paddingHorizontal: 12,
        paddingVertical: 5,
        backgroundColor: Colori.background,
        borderWidth: 1,
        borderRadius: 16,
        borderColor: Colori.bordo,
        alignItems: "flex-start",
    },
    text: {
        fontSize: 18,
        fontFamily: Fonts.Normale,
        color: Colori.text2,
    },
    disabled: {
        borderColor: Colori.bordoDisabilitato,
        backgroundColor: Colori.backgroundDisabilitato,
    },

    textDisabled: {
    color: Colori.testoDisabilitato,
    },
});