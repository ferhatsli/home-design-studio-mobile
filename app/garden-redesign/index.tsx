import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { PhotoSelectLayout } from "@/components/ui/PhotoSelectLayout";
import { useRoom } from "@/context/RoomContext";

export default function GardenPhotoScreen() {
    const router = useRouter();
    const { setActiveFlow, originalImage, setOriginalImage } = useRoom();

    useEffect(() => {
        setActiveFlow("gardenRedesign");
    }, []);

    return (
        <PhotoSelectLayout
            title="Bahçe Tasarımı"
            subtitle="Yeniden tasarlamak istediğiniz bahçenin fotoğrafını seçin"
            onImageSelected={setOriginalImage}
            onContinue={() => router.push("/garden-redesign/style")}
            selectedImage={originalImage}
            continueLabel="Stil Seç"
        />
    );
}
