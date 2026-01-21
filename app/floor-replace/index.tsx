import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { PhotoSelectLayout } from "@/components/ui/PhotoSelectLayout";
import { useRoom } from "@/context/RoomContext";

export default function FloorReplacePhotoScreen() {
    const router = useRouter();
    const { setActiveFlow, originalImage, setOriginalImage } = useRoom();
    useEffect(() => { setActiveFlow("floorReplace"); }, []);
    return (
        <PhotoSelectLayout
            title="Zemin Değiştir"
            subtitle="Zeminini değiştirmek istediğiniz odanın fotoğrafını seçin"
            onImageSelected={setOriginalImage}
            onContinue={() => router.push("/floor-replace/style")}
            selectedImage={originalImage}
            continueLabel="Zemin Seç"
        />
    );
}
