import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { CreditBadge } from "./CreditBadge";
import { PillButton } from "./PillButton";
import { useRoom } from "@/context/RoomContext";
import { useImagePicker } from "@/hooks/useImagePicker";

const { width } = Dimensions.get("window");

interface PhotoSelectLayoutProps {
    title: string;
    subtitle: string;
    onImageSelected: (base64: string) => void;
    onContinue: () => void;
    selectedImage: string | null;
    continueLabel?: string;
}

export const PhotoSelectLayout: React.FC<PhotoSelectLayoutProps> = ({
    title,
    subtitle,
    onImageSelected,
    onContinue,
    selectedImage,
    continueLabel = "Devam",
}) => {
    const router = useRouter();
    const { credits } = useRoom();
    const { pickFromGallery, takePhoto, isLoading } = useImagePicker();

    const handlePickFromGallery = async () => {
        const base64 = await pickFromGallery();
        if (base64) {
            onImageSelected(base64);
        }
    };

    const handleTakePhoto = async () => {
        const base64 = await takePhoto();
        if (base64) {
            onImageSelected(base64);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-card rounded-full items-center justify-center shadow-sm"
                >
                    <Ionicons name="arrow-back" size={20} color="#1A1A1A" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-foreground">{title}</Text>
                <CreditBadge credits={credits} />
            </View>

            {/* Content */}
            <View className="flex-1 px-4 pt-4">
                <Text className="text-center text-muted-foreground mb-6">
                    {subtitle}
                </Text>

                {/* Image Preview or Placeholder */}
                <View
                    className="bg-card rounded-3xl overflow-hidden mb-6"
                    style={{
                        height: width - 32,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 12,
                        elevation: 4,
                    }}
                >
                    {selectedImage ? (
                        <Image
                            source={{ uri: selectedImage }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    ) : (
                        <View className="flex-1 items-center justify-center bg-muted">
                            <Ionicons name="image-outline" size={64} color="#737373" />
                            <Text className="text-muted-foreground mt-4">
                                Fotoğraf seçin veya çekin
                            </Text>
                        </View>
                    )}
                </View>

                {/* Action Buttons */}
                <View className="flex-row gap-3 mb-6">
                    <TouchableOpacity
                        onPress={handlePickFromGallery}
                        disabled={isLoading}
                        className="flex-1 bg-card rounded-2xl py-4 items-center shadow-sm"
                    >
                        <Ionicons name="images-outline" size={28} color="#E86A12" />
                        <Text className="text-foreground font-medium mt-2">Galeri</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleTakePhoto}
                        disabled={isLoading}
                        className="flex-1 bg-card rounded-2xl py-4 items-center shadow-sm"
                    >
                        <Ionicons name="camera-outline" size={28} color="#E86A12" />
                        <Text className="text-foreground font-medium mt-2">Kamera</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom Action */}
            <View className="px-4 pb-4">
                <PillButton
                    onPress={onContinue}
                    disabled={!selectedImage}
                    fullWidth
                    size="lg"
                    icon={<Ionicons name="arrow-forward" size={20} color="#FFFFFF" />}
                >
                    {continueLabel}
                </PillButton>
            </View>
        </SafeAreaView>
    );
};
