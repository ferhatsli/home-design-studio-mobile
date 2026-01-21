import React from "react";
import { View, ViewProps, Platform } from "react-native";

interface SoftCardProps extends ViewProps {
    children: React.ReactNode;
    variant?: "default" | "elevated" | "outlined";
    padding?: "none" | "sm" | "md" | "lg";
}

export const SoftCard: React.FC<SoftCardProps> = ({
    children,
    variant = "default",
    padding = "md",
    className = "",
    style,
    ...props
}) => {
    const paddingStyles = {
        none: "",
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
    };

    const variantStyles = {
        default: "bg-card",
        elevated: "bg-card",
        outlined: "bg-card border border-border",
    };

    const getShadowStyle = () => {
        if (variant === "outlined") return {};

        if (Platform.OS === "ios") {
            return {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: variant === "elevated" ? 8 : 4 },
                shadowOpacity: variant === "elevated" ? 0.15 : 0.08,
                shadowRadius: variant === "elevated" ? 16 : 8,
            };
        }

        return {
            elevation: variant === "elevated" ? 8 : 4,
        };
    };

    return (
        <View
            className={`rounded-3xl ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
            style={[getShadowStyle(), style]}
            {...props}
        >
            {children}
        </View>
    );
};
