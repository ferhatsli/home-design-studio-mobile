import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";

interface UseImagePickerOptions {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
}

export const useImagePicker = (options: UseImagePickerOptions = {}) => {
    const { maxWidth = 1024, maxHeight = 1024, quality = 0.8 } = options;
    const [isLoading, setIsLoading] = useState(false);

    const requestPermissions = async () => {
        const { status: cameraStatus } =
            await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaStatus } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraStatus !== "granted" || mediaStatus !== "granted") {
            Toast.show({
                type: "error",
                text1: "İzin Gerekli",
                text2: "Kamera ve galeri izinleri gereklidir.",
            });
            return false;
        }
        return true;
    };

    const convertToBase64 = async (uri: string): Promise<string> => {
        try {
            const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            return `data:image/jpeg;base64,${base64}`;
        } catch (error) {
            console.error("Error converting to base64:", error);
            throw error;
        }
    };

    const pickFromGallery = async (): Promise<string | null> => {
        setIsLoading(true);
        try {
            const hasPermission = await requestPermissions();
            if (!hasPermission) return null;

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality,
            });

            if (result.canceled || !result.assets[0]) {
                return null;
            }

            const base64 = await convertToBase64(result.assets[0].uri);
            return base64;
        } catch (error) {
            console.error("Error picking image:", error);
            Toast.show({
                type: "error",
                text1: "Hata",
                text2: "Görsel seçilemedi.",
            });
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const takePhoto = async (): Promise<string | null> => {
        setIsLoading(true);
        try {
            const hasPermission = await requestPermissions();
            if (!hasPermission) return null;

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality,
            });

            if (result.canceled || !result.assets[0]) {
                return null;
            }

            const base64 = await convertToBase64(result.assets[0].uri);
            return base64;
        } catch (error) {
            console.error("Error taking photo:", error);
            Toast.show({
                type: "error",
                text1: "Hata",
                text2: "Fotoğraf çekilemedi.",
            });
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        pickFromGallery,
        takePhoto,
        isLoading,
    };
};
