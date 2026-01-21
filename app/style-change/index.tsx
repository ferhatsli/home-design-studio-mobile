import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { PhotoSelectLayout } from "@/components/ui/PhotoSelectLayout";
import { useRoom } from "@/context/RoomContext";

export default function StyleChangePhotoScreen() {
    const router = useRouter();
    const { setActiveFlow, originalImage, setOriginalImage } = useRoom();

    useEffect(() => {
        setActiveFlow("styleChange");
    }, []);

    const handleImageSelected = (base64: string) => {
        setOriginalImage(base64);
    };

    const handleContinue = () => {
        router.push("/style-change/style");
    };

    return (
        <PhotoSelectLayout
            title="Stil Değişikliği"
            subtitle="Dönüştürmek istediğiniz odanın fotoğrafını seçin"
            onImageSelected={handleImageSelected}
            onContinue={handleContinue}
            selectedImage={originalImage}
            continueLabel="Stil Seç"
        />
    );
}
