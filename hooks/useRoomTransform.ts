import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Toast from "react-native-toast-message";

export type TransformAction =
    | "redesign"
    | "erase"
    | "recolor"
    | "exterior"
    | "furniture"
    | "fill"
    | "wall"
    | "floor";

interface TransformParams {
    imageBase64: string;
    roomType: string;
    designStyle: string;
    action: TransformAction;
    color?: string;
    maskData?: string;
    objectName?: string;
}

interface TransformResult {
    success: boolean;
    imageUrl?: string;
    description?: string;
    error?: string;
}

const getTransformationType = (action: TransformAction): string => {
    switch (action) {
        case "redesign":
            return "style_change";
        case "erase":
            return "object_remove";
        case "recolor":
            return "color_change";
        case "exterior":
            return "exterior_redesign";
        case "furniture":
            return "furniture_replace";
        case "fill":
            return "fill_spaces";
        case "wall":
            return "wall_refresh";
        case "floor":
            return "floor_replace";
        default:
            return "style_change";
    }
};

const getStyleName = (
    action: TransformAction,
    designStyle: string,
    color?: string
): string => {
    switch (action) {
        case "redesign":
            return designStyle;
        case "erase":
            return "Obje Silme";
        case "recolor":
            return color ? `Renk: ${color}` : "Renk Değişikliği";
        case "exterior":
            return `Dış Cephe: ${designStyle}`;
        case "furniture":
            return `Mobilya: ${designStyle}`;
        case "fill":
            return `Boşluk Doldur: ${designStyle}`;
        case "wall":
            return `Duvar: ${designStyle}`;
        case "floor":
            return `Zemin: ${designStyle}`;
        default:
            return designStyle;
    }
};

export const useRoomTransform = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<TransformResult | null>(null);

    const saveToHistory = async (
        originalImageBase64: string,
        transformedImageUrl: string,
        action: TransformAction,
        designStyle: string,
        color?: string
    ) => {
        try {
            const { error } = await supabase.from("room_transformations").insert({
                original_image_url: originalImageBase64,
                transformed_image_url: transformedImageUrl,
                transformation_type: getTransformationType(action),
                style_name: getStyleName(action, designStyle, color),
                user_id: null,
            });

            if (error) {
                console.error("Failed to save to history:", error);
            } else {
                console.log("Transformation saved to history");
            }
        } catch (err) {
            console.error("Error saving to history:", err);
        }
    };

    const transformRoom = async (
        params: TransformParams
    ): Promise<TransformResult> => {
        setIsLoading(true);
        setProgress(0);
        setResult(null);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) return prev;
                return prev + Math.random() * 15;
            });
        }, 500);

        try {
            const { data, error } = await supabase.functions.invoke("transform-room", {
                body: params,
            });

            clearInterval(progressInterval);
            setProgress(100);

            if (error) {
                console.error("Transform error:", error);
                const errorMessage = error.message || "Failed to transform room";
                Toast.show({
                    type: "error",
                    text1: "Hata",
                    text2: errorMessage,
                });
                setResult({ success: false, error: errorMessage });
                return { success: false, error: errorMessage };
            }

            if (data.error) {
                Toast.show({
                    type: "error",
                    text1: "Hata",
                    text2: data.error,
                });
                setResult({ success: false, error: data.error });
                return { success: false, error: data.error };
            }

            await saveToHistory(
                params.imageBase64,
                data.imageUrl,
                params.action,
                params.designStyle,
                params.color
            );

            setResult({
                success: true,
                imageUrl: data.imageUrl,
                description: data.description,
            });

            Toast.show({
                type: "success",
                text1: "Başarılı",
                text2: "Dönüşüm tamamlandı!",
            });

            return {
                success: true,
                imageUrl: data.imageUrl,
                description: data.description,
            };
        } catch (error) {
            clearInterval(progressInterval);
            console.error("Transform error:", error);
            const errorMessage =
                error instanceof Error ? error.message : "An unexpected error occurred";
            Toast.show({
                type: "error",
                text1: "Hata",
                text2: errorMessage,
            });
            setResult({ success: false, error: errorMessage });
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setResult(null);
        setProgress(0);
    };

    return {
        transformRoom,
        isLoading,
        progress,
        result,
        reset,
    };
};
