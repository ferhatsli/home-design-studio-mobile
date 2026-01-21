import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { PhotoSelectLayout } from "@/components/ui/PhotoSelectLayout";
import { useRoom } from "@/context/RoomContext";

export default function FillSpacesPhotoScreen() {
    const router = useRouter();
    const { setActiveFlow, originalImage, setOriginalImage } = useRoom();
    useEffect(() => { setActiveFlow("fillSpaces"); }, []);
    return (
        <PhotoSelectLayout
            title="Boşluk Doldur"
            subtitle="Boşlukları doldurmak istediğiniz odanın fotoğrafını seçin"
            onImageSelected={setOriginalImage}
            onContinue={() => router.push("/fill-spaces/style")}
            selectedImage={originalImage}
            continueLabel="Stil Seç"
        />
    );
}
