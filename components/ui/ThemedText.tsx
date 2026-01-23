import React from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";

interface ThemedTextProps extends TextProps {
    weight?: "regular" | "medium" | "semibold" | "bold";
}

const fontFamilyMap = {
    regular: "Inter",
    medium: "Inter-Medium",
    semibold: "Inter-SemiBold",
    bold: "Inter-Bold",
};

export const ThemedText: React.FC<ThemedTextProps> = ({
    children,
    style,
    weight = "regular",
    ...props
}) => {
    return (
        <RNText
            style={[{ fontFamily: fontFamilyMap[weight] }, style]}
            {...props}
        >
            {children}
        </RNText>
    );
};

// Re-export as Text for easy replacement
export { ThemedText as Text };
