"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CameraIcon,
  FlipHorizontal,
  PersonStanding,
  Video,
} from "lucide-react";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

type Props = {};

export default function Camera(props: Props) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mirrored, setMirrored] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [autoRecording, setAutoRecording] = useState<boolean>(false);

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
            {/* Section 1 - Theme Toggle & Mirror Button*/}
            <div className="flex flex-col gap-2">
              <ModeToggle />
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => {
                  setMirrored((mirror) => !mirror);
                }}
              >
                <FlipHorizontal />
              </Button>
              <Separator className="my-2" />
            </div>

            {/* Section 2 - Screenshot & Recording*/}
            <div className="flex flex-col gap-2">
              <Separator className="my-2" />

              <Button
                variant={"outline"}
                size={"icon"}
                onClick={userPromptScreenshot}
              >
                <CameraIcon />
              </Button>

              <Button
                variant={isRecording ? "destructive" : "outline"}
                size={"icon"}
                onClick={userPromptRecording}
              >
                <Video />
              </Button>

              <Separator className="my-2" />

              <Button
                variant={autoRecording ? "destructive" : "outline"}
                size={"icon"}
                onClick={toggleAutoRecording}
              >
                {autoRecording ? "Show Animation" : <PersonStanding />}
              </Button>
            </div>

            {/* Section 3 */}
            <div className="flex flex-col gap-2">{/* <Separator /> */}</div>
          </div>
        </div>
      </div>
    </div>
  );

  function userPromptScreenshot() {
    // take picture
    // save picture
  }

  function userPromptRecording() {
    // check if recording
    // - then stop recording
    // - ask for downloading record
    // if not recording
    // - start recording
  }

  function toggleAutoRecording() {
    if (autoRecording) {
      setAutoRecording(false);

      // Show toast to users to notify the change.
    } else {
      setAutoRecording(true);

      // Show toast to users to notify the change.
    }
  }

  // Converting to Text
  function userPromptListening() {
    // check if listening
    // - stop listening
    // - copy and delete icon appear
    // if not listening
    // - delete what've been heard before
    // - start listening
  }

  function toggleAutoListening() {}
}
