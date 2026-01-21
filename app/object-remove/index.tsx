import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { PhotoSelectLayout } from "@/components/ui/PhotoSelectLayout";
import { useRoom } from "@/context/RoomContext";

export default function ObjectRemovePhotoScreen() {
    const router = useRouter();
    const { setActiveFlow, originalImage, setOriginalImage } = useRoom();

    useEffect(() => {
        setActiveFlow("objectRemove");
    }, []);

    const handleImageSelected = (base64: string) => {
        setOriginalImage(base64);
    };

    const handleContinue = () => {
        router.push("/object-remove/settings");
    };

    return (
        <PhotoSelectLayout
            title="Obje Silme"
            subtitle="Silmek istediğiniz nesnenin olduğu fotoğrafı seçin"
            onImageSelected={handleImageSelected}
            onContinue={handleContinue}
            selectedImage={originalImage}
            continueLabel="Devam"
        />
    );
}
