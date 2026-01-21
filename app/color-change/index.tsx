import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { PhotoSelectLayout } from "@/components/ui/PhotoSelectLayout";
import { useRoom } from "@/context/RoomContext";

export default function ColorChangePhotoScreen() {
    const router = useRouter();
    const { setActiveFlow, originalImage, setOriginalImage } = useRoom();

    useEffect(() => {
        setActiveFlow("colorChange");
    }, []);

    const handleImageSelected = (base64: string) => {
        setOriginalImage(base64);
    };

    const handleContinue = () => {
        router.push("/color-change/color");
    };

    return (
        <PhotoSelectLayout
            title="Renk Değişikliği"
            subtitle="Renk değiştirmek istediğiniz odanın fotoğrafını seçin"
            onImageSelected={handleImageSelected}
            onContinue={handleContinue}
            selectedImage={originalImage}
            continueLabel="Renk Seç"
        />
    );
}
