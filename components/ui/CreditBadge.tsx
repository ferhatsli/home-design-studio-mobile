import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CreditBadgeProps {
    credits: number;
    size?: "sm" | "md";
}

export const CreditBadge: React.FC<CreditBadgeProps> = ({
    credits,
    size = "md",
}) => {
    const sizeStyles = {
        sm: {
            container: "px-2 py-1",
            text: "text-xs",
            icon: 12,
        },
        md: {
            container: "px-3 py-1.5",
            text: "text-sm",
            icon: 14,
        },
    };

    return (
        <View
            className={`flex-row items-center bg-accent rounded-full ${sizeStyles[size].container}`}
        >
            <Ionicons
                name="flash"
                size={sizeStyles[size].icon}
                color="#E86A12"
            />
            <Text
                className={`font-semibold text-primary ml-1 ${sizeStyles[size].text}`}
            >
                {credits}
            </Text>
        </View>
    );
};
