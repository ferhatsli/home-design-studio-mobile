import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { PhotoSelectLayout } from "@/components/ui/PhotoSelectLayout";
import { useRoom } from "@/context/RoomContext";

export default function WallRefreshPhotoScreen() {
    const router = useRouter();
    const { setActiveFlow, originalImage, setOriginalImage } = useRoom();
    useEffect(() => { setActiveFlow("wallRefresh"); }, []);
    return (
        <PhotoSelectLayout
            title="Duvar Yenile"
            subtitle="Duvarlarını yenilemek istediğiniz odanın fotoğrafını seçin"
            onImageSelected={setOriginalImage}
            onContinue={() => router.push("/wall-refresh/style")}
            selectedImage={originalImage}
            continueLabel="Stil Seç"
        />
    );
}
