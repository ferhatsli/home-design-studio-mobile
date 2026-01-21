import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { PhotoSelectLayout } from "@/components/ui/PhotoSelectLayout";
import { useRoom } from "@/context/RoomContext";

export default function ExteriorPhotoScreen() {
    const router = useRouter();
    const { setActiveFlow, originalImage, setOriginalImage } = useRoom();
    useEffect(() => { setActiveFlow("exteriorRedesign"); }, []);
    return (
        <PhotoSelectLayout
            title="Dış Cephe"
            subtitle="Yeniden tasarlamak istediğiniz dış cephenin fotoğrafını seçin"
            onImageSelected={setOriginalImage}
            onContinue={() => router.push("/exterior-redesign/style")}
            selectedImage={originalImage}
            continueLabel="Stil Seç"
        />
    );
}
