import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useCallback,
    useMemo,
} from "react";

interface MaskPoint {
    x: number;
    y: number;
}

interface FlowState {
    originalImage: string | null;
    transformedImage: string | null;
    maskPoints: MaskPoint[][];
}

interface RoomState {
    roomType: string;
    designStyle: string;
    selectedColor: string;
    credits: number;

    colorChangeFlow: FlowState;
    objectRemoveFlow: FlowState;
    styleChangeFlow: FlowState;
    gardenRedesignFlow: FlowState;
    exteriorRedesignFlow: FlowState;
    furnitureReplaceFlow: FlowState;
    fillSpacesFlow: FlowState;
    wallRefreshFlow: FlowState;
    floorReplaceFlow: FlowState;
}

export type FlowType =
    | "colorChange"
    | "objectRemove"
    | "styleChange"
    | "gardenRedesign"
    | "exteriorRedesign"
    | "furnitureReplace"
    | "fillSpaces"
    | "wallRefresh"
    | "floorReplace";

interface RoomContextType
    extends Omit<
        RoomState,
        | "colorChangeFlow"
        | "objectRemoveFlow"
        | "styleChangeFlow"
        | "gardenRedesignFlow"
        | "exteriorRedesignFlow"
        | "furnitureReplaceFlow"
        | "fillSpacesFlow"
        | "wallRefreshFlow"
        | "floorReplaceFlow"
    > {
    originalImage: string | null;
    transformedImage: string | null;
    maskPoints: MaskPoint[][];

    setOriginalImage: (image: string | null) => void;
    setTransformedImage: (image: string | null) => void;
    setRoomType: (type: string) => void;
    setDesignStyle: (style: string) => void;
    setSelectedColor: (color: string) => void;
    deductCredits: (amount: number) => boolean;
    resetTransform: () => void;
    setMaskPoints: (points: MaskPoint[][]) => void;
    addMaskStroke: (stroke: MaskPoint[]) => void;
    clearMask: () => void;

    setActiveFlow: (flow: FlowType) => void;
    activeFlow: FlowType;
    getFlowState: (flow: FlowType) => FlowState;
    setFlowImage: (flow: FlowType, image: string | null) => void;
    setFlowTransformedImage: (flow: FlowType, image: string | null) => void;
    setFlowMask: (flow: FlowType, points: MaskPoint[][]) => void;
    clearFlow: (flow: FlowType) => void;
}

const initialFlowState: FlowState = {
    originalImage: null,
    transformedImage: null,
    maskPoints: [],
};

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider = ({ children }: { children: ReactNode }) => {
    const [roomType, setRoomType] = useState("Oturma Odası");
    const [designStyle, setDesignStyle] = useState("Modern");
    const [selectedColor, setSelectedColor] = useState("#E86A12");
    const [credits, setCredits] = useState(100);
    const [activeFlow, setActiveFlowState] = useState<FlowType>("styleChange");

    const [colorChangeFlow, setColorChangeFlow] = useState<FlowState>({
        ...initialFlowState,
    });
    const [objectRemoveFlow, setObjectRemoveFlow] = useState<FlowState>({
        ...initialFlowState,
    });
    const [styleChangeFlow, setStyleChangeFlow] = useState<FlowState>({
        ...initialFlowState,
    });
    const [gardenRedesignFlow, setGardenRedesignFlow] = useState<FlowState>({
        ...initialFlowState,
    });
    const [exteriorRedesignFlow, setExteriorRedesignFlow] = useState<FlowState>({
        ...initialFlowState,
    });
    const [furnitureReplaceFlow, setFurnitureReplaceFlow] = useState<FlowState>({
        ...initialFlowState,
    });
    const [fillSpacesFlow, setFillSpacesFlow] = useState<FlowState>({
        ...initialFlowState,
    });
    const [wallRefreshFlow, setWallRefreshFlow] = useState<FlowState>({
        ...initialFlowState,
    });
    const [floorReplaceFlow, setFloorReplaceFlow] = useState<FlowState>({
        ...initialFlowState,
    });

    const getFlowState = useCallback(
        (flow: FlowType): FlowState => {
            switch (flow) {
                case "colorChange":
                    return colorChangeFlow;
                case "objectRemove":
                    return objectRemoveFlow;
                case "styleChange":
                    return styleChangeFlow;
                case "gardenRedesign":
                    return gardenRedesignFlow;
                case "exteriorRedesign":
                    return exteriorRedesignFlow;
                case "furnitureReplace":
                    return furnitureReplaceFlow;
                case "fillSpaces":
                    return fillSpacesFlow;
                case "wallRefresh":
                    return wallRefreshFlow;
                case "floorReplace":
                    return floorReplaceFlow;
            }
        },
        [
            colorChangeFlow,
            objectRemoveFlow,
            styleChangeFlow,
            gardenRedesignFlow,
            exteriorRedesignFlow,
            furnitureReplaceFlow,
            fillSpacesFlow,
            wallRefreshFlow,
            floorReplaceFlow,
        ]
    );

    const getFlowSetter = (flow: FlowType) => {
        const setters = {
            colorChange: setColorChangeFlow,
            objectRemove: setObjectRemoveFlow,
            styleChange: setStyleChangeFlow,
            gardenRedesign: setGardenRedesignFlow,
            exteriorRedesign: setExteriorRedesignFlow,
            furnitureReplace: setFurnitureReplaceFlow,
            fillSpaces: setFillSpacesFlow,
            wallRefresh: setWallRefreshFlow,
            floorReplace: setFloorReplaceFlow,
        };
        return setters[flow];
    };

    const setFlowImage = useCallback((flow: FlowType, image: string | null) => {
        getFlowSetter(flow)((prev) => ({ ...prev, originalImage: image }));
    }, []);

    const setFlowTransformedImage = useCallback(
        (flow: FlowType, image: string | null) => {
            getFlowSetter(flow)((prev) => ({ ...prev, transformedImage: image }));
        },
        []
    );

    const setFlowMask = useCallback(
        (flow: FlowType, points: MaskPoint[][]) => {
            getFlowSetter(flow)((prev) => ({ ...prev, maskPoints: points }));
        },
        []
    );

    const clearFlow = useCallback((flow: FlowType) => {
        getFlowSetter(flow)({ ...initialFlowState });
    }, []);

    const setActiveFlow = useCallback((flow: FlowType) => {
        setActiveFlowState(flow);
    }, []);

    const currentFlow = getFlowState(activeFlow);

    const setOriginalImage = useCallback(
        (image: string | null) => {
            setFlowImage(activeFlow, image);
        },
        [activeFlow, setFlowImage]
    );

    const setTransformedImage = useCallback(
        (image: string | null) => {
            setFlowTransformedImage(activeFlow, image);
        },
        [activeFlow, setFlowTransformedImage]
    );

    const setMaskPoints = useCallback(
        (points: MaskPoint[][]) => {
            setFlowMask(activeFlow, points);
        },
        [activeFlow, setFlowMask]
    );

    const addMaskStroke = useCallback(
        (stroke: MaskPoint[]) => {
            getFlowSetter(activeFlow)((prev) => ({
                ...prev,
                maskPoints: [...prev.maskPoints, stroke],
            }));
        },
        [activeFlow]
    );

    const clearMask = useCallback(() => {
        setFlowMask(activeFlow, []);
    }, [activeFlow, setFlowMask]);

    const deductCredits = useCallback(
        (amount: number): boolean => {
            if (credits >= amount) {
                setCredits((prev) => prev - amount);
                return true;
            }
            return false;
        },
        [credits]
    );

    const resetTransform = useCallback(() => {
        setFlowTransformedImage(activeFlow, null);
    }, [activeFlow, setFlowTransformedImage]);

    const value = useMemo(
        () => ({
            originalImage: currentFlow.originalImage,
            transformedImage: currentFlow.transformedImage,
            maskPoints: currentFlow.maskPoints,

            roomType,
            designStyle,
            selectedColor,
            credits,

            setOriginalImage,
            setTransformedImage,
            setRoomType,
            setDesignStyle,
            setSelectedColor,
            deductCredits,
            resetTransform,
            setMaskPoints,
            addMaskStroke,
            clearMask,

            activeFlow,
            setActiveFlow,
            getFlowState,
            setFlowImage,
            setFlowTransformedImage,
            setFlowMask,
            clearFlow,
        }),
        [
            currentFlow.originalImage,
            currentFlow.transformedImage,
            currentFlow.maskPoints,
            roomType,
            designStyle,
            selectedColor,
            credits,
            setOriginalImage,
            setTransformedImage,
            deductCredits,
            resetTransform,
            setMaskPoints,
            addMaskStroke,
            clearMask,
            activeFlow,
            setActiveFlow,
            getFlowState,
            setFlowImage,
            setFlowTransformedImage,
            setFlowMask,
            clearFlow,
        ]
    );

    return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export const useRoom = () => {
    const context = useContext(RoomContext);
    if (context === undefined) {
        throw new Error("useRoom must be used within a RoomProvider");
    }
    return context;
};
