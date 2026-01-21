import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { PhotoSelectLayout } from "@/components/ui/PhotoSelectLayout";
import { useRoom } from "@/context/RoomContext";

export default function FurniturePhotoScreen() {
    const router = useRouter();
    const { setActiveFlow, originalImage, setOriginalImage } = useRoom();
    useEffect(() => { setActiveFlow("furnitureReplace"); }, []);
    return (
        <PhotoSelectLayout
            title="Mobilya Değiştir"
            subtitle="Mobilyalarını değiştirmek istediğiniz odanın fotoğrafını seçin"
            onImageSelected={setOriginalImage}
            onContinue={() => router.push("/furniture-replace/style")}
            selectedImage={originalImage}
            continueLabel="Stil Seç"
        />
    );
}
