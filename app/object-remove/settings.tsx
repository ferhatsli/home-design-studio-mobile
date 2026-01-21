import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { PillButton } from "@/components/ui/PillButton";
import { CreditBadge } from "@/components/ui/CreditBadge";
import { useRoom } from "@/context/RoomContext";

const { width } = Dimensions.get("window");

export default function ObjectRemoveSettingsScreen() {
    const router = useRouter();
    const { originalImage, credits } = useRoom();

    const handleGenerate = () => {
        router.push({
            pathname: "/loading",
            params: { action: "erase" },
        });
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
                <Text className="text-lg font-semibold text-foreground">
                    Nesne Seçin
                </Text>
                <CreditBadge credits={credits} />
            </View>

            {/* Content */}
            <View className="flex-1 px-4 pt-4">
                {/* Info */}
                <View className="bg-accent/50 rounded-2xl p-4 mb-4">
                    <View className="flex-row items-center">
                        <Ionicons name="information-circle" size={24} color="#E86A12" />
                        <Text className="text-foreground ml-3 flex-1">
                            AI otomatik olarak silmek isteyebileceğiniz nesneleri tespit edecek
                        </Text>
                    </View>
                </View>

                {/* Image Preview */}
                {originalImage && (
                    <View
                        className="rounded-3xl overflow-hidden bg-card shadow-lg"
                        style={{ height: width - 32 }}
                    >
                        <Image
                            source={{ uri: originalImage }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>
                )}

                {/* Instructions */}
                <View className="mt-6">
                    <Text className="text-muted-foreground text-center">
                        Fotoğraftaki istenmeyen nesneler AI tarafından otomatik olarak
                        algılanacak ve silinecektir.
                    </Text>
                </View>
            </View>

            {/* Bottom Action */}
            <View className="px-4 pb-8 pt-4">
                <PillButton
                    onPress={handleGenerate}
                    fullWidth
                    size="lg"
                    icon={<Ionicons name="trash" size={20} color="#FFFFFF" />}
                >
                    Sil (4 Kredi)
                </PillButton>
            </View>
        </SafeAreaView>
    );
}
