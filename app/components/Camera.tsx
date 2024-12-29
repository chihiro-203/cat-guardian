// import Webcam from 'react-webcam';
"use client";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

type Props = {};

export default function Camera(props: Props) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mirrored, setMirrored] = useState<boolean>(false);

  return (
    <div>
      <div className="flex h-screen">
        <div className="relative">
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
        </div>
      </div>
    </div>
  );
}
