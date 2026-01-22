import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import {
    inspirationBefore1,
    inspirationAfter1,
    inspirationBefore2,
    inspirationAfter2,
    inspirationBefore3,
    inspirationAfter3,
    inspirationBefore4,
    inspirationAfter4,
    inspirationBefore5,
    inspirationAfter5,
    inspirationBefore6,
    inspirationAfter6,
    inspirationBefore7,
    inspirationAfter7,
    inspirationBefore8,
    inspirationAfter8,
    inspirationBefore9,
    inspirationAfter9,
    inspirationBefore10,
    inspirationAfter10,
} from "@/assets";

const { width } = Dimensions.get("window");

type TransformationType = "style_change" | "object_remove" | "color_change";

interface Inspiration {
    id: string;
    title: string;
    description: string;
    beforeImage: any;
    afterImage: any;
    transformationType: TransformationType;
    styleName?: string;
    colorName?: string;
    roomType: string;
}

const inspirations: Inspiration[] = [
    {
        id: "insp-1",
        title: "Modern Minimalist Salon",
        description: "Klasik oturma odası scandinavian stile dönüştürüldü",
        beforeImage: inspirationBefore1,
        afterImage: inspirationAfter1,
        transformationType: "style_change",
        styleName: "Scandinavian",
        roomType: "Oturma Odası",
    },
    {
        id: "insp-2",
        title: "Yatak Odası Düzenleme",
        description: "Köşedeki koltuk kaldırılarak ferah bir alan oluşturuldu",
        beforeImage: inspirationBefore2,
        afterImage: inspirationAfter2,
        transformationType: "object_remove",
        roomType: "Yatak Odası",
    },
    {
        id: "insp-3",
        title: "Turuncu Mutfak",
        description: "Beyaz mutfak duvarları canlı turuncu renge boyandı",
        beforeImage: inspirationBefore3,
        afterImage: inspirationAfter3,
        transformationType: "color_change",
        colorName: "Turuncu",
        roomType: "Mutfak",
    },
    {
        id: "insp-4",
        title: "Klasikten Moderne",
        description: "Geleneksel salon industrial loft stiline dönüştürüldü",
        beforeImage: inspirationBefore4,
        afterImage: inspirationAfter4,
        transformationType: "style_change",
        styleName: "Industrial",
        roomType: "Oturma Odası",
    },
    {
        id: "insp-5",
        title: "Temiz Ofis Alanı",
        description: "Büyük saksı bitkisi kaldırılarak çalışma alanı genişletildi",
        beforeImage: inspirationBefore5,
        afterImage: inspirationAfter5,
        transformationType: "object_remove",
        roomType: "Ofis",
    },
    {
        id: "insp-6",
        title: "Yeşil Banyo",
        description: "Beyaz banyo duvarları huzur veren yeşil tona boyandı",
        beforeImage: inspirationBefore6,
        afterImage: inspirationAfter6,
        transformationType: "color_change",
        colorName: "Yeşil",
        roomType: "Banyo",
    },
    {
        id: "insp-7",
        title: "Bohem Yemek Odası",
        description: "Sade yemek odası renkli bohemian stile dönüştürüldü",
        beforeImage: inspirationBefore7,
        afterImage: inspirationAfter7,
        transformationType: "style_change",
        styleName: "Bohemian",
        roomType: "Yemek Odası",
    },
    {
        id: "insp-8",
        title: "Minimalist Salon",
        description: "Köşedeki lambader kaldırılarak sade bir görünüm elde edildi",
        beforeImage: inspirationBefore8,
        afterImage: inspirationAfter8,
        transformationType: "object_remove",
        roomType: "Oturma Odası",
    },
    {
        id: "insp-9",
        title: "Pembe Yatak Odası",
        description: "Beyaz duvarlar yumuşak pembe tona boyandı",
        beforeImage: inspirationBefore9,
        afterImage: inspirationAfter9,
        transformationType: "color_change",
        colorName: "Pembe",
        roomType: "Yatak Odası",
    },
    {
        id: "insp-10",
        title: "Farmhouse Mutfak",
        description: "Modern koyu mutfak rustik farmhouse stiline dönüştürüldü",
        beforeImage: inspirationBefore10,
        afterImage: inspirationAfter10,
        transformationType: "style_change",
        styleName: "Farmhouse",
        roomType: "Mutfak",
    },
];

const getTransformationLabel = (type: TransformationType): string => {
    switch (type) {
        case "style_change":
            return "Stil Değişikliği";
        case "color_change":
            return "Renk Değişikliği";
        case "object_remove":
            return "Nesne Silme";
        default:
            return "Dönüşüm";
    }
};

const getTransformationIcon = (type: TransformationType): keyof typeof Ionicons.glyphMap => {
    switch (type) {
        case "style_change":
            return "brush-outline";
        case "color_change":
            return "color-palette-outline";
        case "object_remove":
            return "trash-outline";
        default:
            return "brush-outline";
    }
};

// Alternating heights for masonry effect
const leftHeights = [160, 208, 144, 192, 176];
const rightHeights = [208, 144, 192, 160, 224];

export default function InspirationScreen() {
    const router = useRouter();

    // Split inspirations into two columns for masonry effect
    const leftColumn = inspirations.filter((_, i) => i % 2 === 0);
    const rightColumn = inspirations.filter((_, i) => i % 2 === 1);

    const renderCard = (
        inspiration: Inspiration,
        index: number,
        isLeft: boolean
    ) => {
        const heights = isLeft ? leftHeights : rightHeights;
        const height = heights[index % heights.length];
        const iconName = getTransformationIcon(inspiration.transformationType);

        return (
            <MotiView
                key={inspiration.id}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", duration: 400, delay: index * 50 }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                        height,
                        borderRadius: 16,
                        overflow: "hidden",
                        marginBottom: 12,
                    }}
                >
                    <Image
                        source={inspiration.afterImage}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                    />

                    {/* Gradient overlay */}
                    <View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "50%",
                            backgroundColor: "transparent",
                        }}
                    />

                    {/* Transformation Type Badge */}
                    <View
                        style={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            backgroundColor: "rgba(0,0,0,0.6)",
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 9999,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                        }}
                    >
                        <Ionicons name={iconName} size={12} color="#FFFFFF" />
                        <Text style={{ color: "#FFFFFF", fontSize: 10 }}>
                            {getTransformationLabel(inspiration.transformationType)}
                        </Text>
                    </View>
                </TouchableOpacity>
            </MotiView>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <ScrollView
                className="flex-1"
                contentContainerClassName="pb-28"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="px-5 pt-8 pb-4">
                    <Text className="text-2xl font-bold text-foreground">İlham Al</Text>
                    <Text className="text-muted-foreground text-sm mt-1">
                        Dönüşüm örneklerini keşfedin
                    </Text>
                </View>

                {/* Masonry Grid */}
                <View className="px-5 flex-row gap-3">
                    {/* Left Column */}
                    <View className="flex-1">
                        {leftColumn.map((inspiration, index) =>
                            renderCard(inspiration, index, true)
                        )}
                    </View>

                    {/* Right Column - offset for masonry effect */}
                    <View className="flex-1" style={{ marginTop: 24 }}>
                        {rightColumn.map((inspiration, index) =>
                            renderCard(inspiration, index, false)
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
