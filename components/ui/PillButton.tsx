import React from "react";
import {
    TouchableOpacity,
    View,
    ActivityIndicator,
    TouchableOpacityProps,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { ThemedText } from "./ThemedText";

interface PillButtonProps extends TouchableOpacityProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    loading?: boolean;
    fullWidth?: boolean;
}

export const PillButton: React.FC<PillButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "right",
    loading = false,
    fullWidth = false,
    disabled,
    onPress,
    className,
    ...props
}) => {
    const handlePress = async (e: any) => {
        if (!disabled && !loading) {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onPress?.(e);
        }
    };

    const sizeStyles = {
        sm: "py-2 px-4",
        md: "py-3 px-6",
        lg: "py-4 px-8",
    };

    const textSizeStyles = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
    };

    const renderContent = () => (
        <View className="flex-row items-center justify-center gap-2">
            {loading ? (
                <ActivityIndicator
                    color={variant === "outline" ? "#E86A12" : "#FFFFFF"}
                    size="small"
                />
            ) : (
                <>
                    {icon && iconPosition === "left" && icon}
                    <ThemedText
                        weight="semibold"
                        className={`${textSizeStyles[size]} ${variant === "outline" ? "text-primary" : "text-white"
                            }`}
                    >
                        {children}
                    </ThemedText>
                    {icon && iconPosition === "right" && icon}
                </>
            )}
        </View>
    );

    if (variant === "primary") {
        return (
            <TouchableOpacity
                onPress={handlePress}
                disabled={disabled || loading}
                activeOpacity={0.8}
                className={fullWidth ? "w-full" : ""}
                {...props}
            >
                <LinearGradient
                    colors={
                        disabled ? ["#D1D5DB", "#9CA3AF"] : ["#E86A12", "#F59E0B"]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className={`rounded-full ${sizeStyles[size]} shadow-lg`}
                >
                    {renderContent()}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    if (variant === "secondary") {
        return (
            <TouchableOpacity
                onPress={handlePress}
                disabled={disabled || loading}
                activeOpacity={0.8}
                className={`bg-secondary rounded-full ${sizeStyles[size]} ${fullWidth ? "w-full" : ""
                    } ${disabled ? "opacity-50" : ""}`}
                {...props}
            >
                {renderContent()}
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={disabled || loading}
            activeOpacity={0.8}
            className={`border-2 border-primary rounded-full ${sizeStyles[size]} ${fullWidth ? "w-full" : ""
                } ${disabled ? "opacity-50" : ""}`}
            {...props}
        >
            {renderContent()}
        </TouchableOpacity>
    );
};
