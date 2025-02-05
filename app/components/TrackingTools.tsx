interface TrackingToolsProps {
    mirrored: boolean;
    setMirrored: (value: boolean) => void;
    takeScreenshot: () => void;
    isRecording: boolean;
}