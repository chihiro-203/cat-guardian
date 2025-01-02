"use client";

import { Separator } from "@/components/ui/separator";
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
        {/* Webcam */}
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
        {/* Tracking Details */}
        <div className="flex flex-row flex-1">
          <div className="border-primary/5 border-2 max-w-xs flex flex-col gap-2 justify-between shadow-md rounded-md p-4">
            {/* Section 1 */}
            <div className="flex flex-col gap-2">
              <Separator />
            </div>
            {/* Section 2 */}
            <div className="flex flex-col gap-2">
              <Separator />
              <Separator />
            </div>
            {/* Section 3 */}
            <div className="flex flex-col gap-2">
              {/* <Separator /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
