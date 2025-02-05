import React, { RefObject } from "react";
import Webcam from "react-webcam";

interface WebcamViewProps {
  mirrored: boolean;
  webcamRef: RefObject<Webcam | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

const WebcamView: React.FC<WebcamViewProps> = ({
  mirrored,
  webcamRef,
  canvasRef,
}) => {
  return (
    <div className="relative h-screen w-full">
      <Webcam
        ref={webcamRef}
        mirrored={mirrored}
        className="h-full w-full object-contain"
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 h-full w-full object-contain"
      ></canvas>
    </div>
  );
};

export default WebcamView;
