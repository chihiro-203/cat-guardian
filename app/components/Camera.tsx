"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { meow } from "@/utils/audio";
import { CameraIcon, FlipHorizontal, Cat, Video, Volume2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { CirclesWithBar, Rings } from "react-loader-spinner";
import Highlights from "./Highlights";
import * as cocossd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import { DetectedObject, ObjectDetection } from "@tensorflow-models/coco-ssd";
import { drawOnCanvas } from "@/utils/draw";

type Props = {};

let interval: any = null

export default function Camera(props: Props) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mirrored, setMirrored] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [autoRecording, setAutoRecording] = useState<boolean>(false);
  const [volume, setVolume] = useState(0.8);
  const [model, setModel] = useState<ObjectDetection>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    initModel();
  }, []);

  // load model
  // set it as a state variable
  async function initModel() {
    const loadedModel: ObjectDetection = await cocossd.load({
      base: "mobilenet_v2",
    });
    setModel(loadedModel);
  }

  useEffect(() => {
    if (model) {
      setLoading(false)
    }
  }, [model])

  async function runPrediction() {
    if (model && webcamRef.current && webcamRef.current.video && webcamRef.current.video.readyState === 4) {
      const predictions: DetectedObject[] = await model.detect(webcamRef.current.video)
      // console.log(predictions)
      resizeCanvas(canvasRef, webcamRef);
      drawOnCanvas(mirrored, predictions, canvasRef.current?.getContext('2d'))
    }
  }

  useEffect(() => {
    interval = setInterval(() => {
      runPrediction();
    }, 100)

    return () => clearInterval(interval)
  } ,[webcamRef.current, model, mirrored])
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

        {/* Tracking Tools */}
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
                {autoRecording ? (
                  <CirclesWithBar
                    height={45}
                    // width={45}
                    color="white"
                  />
                ) : (
                  <Cat />
                )}
              </Button>
            </div>

            {/* Section 3 - Volume */}
            <div className="flex flex-col gap-2">
              <Separator className="my-2" />

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} size={"icon"}>
                    <Volume2 />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Slider
                    max={1}
                    min={0}
                    step={0.2}
                    defaultValue={[volume]}
                    onValueCommit={(val) => {
                      setVolume(val[0]);
                      meow(val[0]);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Tracking Details - Highlight Section */}
          <div className="h-full flex-1 py-4 px-2 overflow-y-scroll">
            <Highlights />
          </div>
        </div>

        {loading && <div className="z-50 absolute w-full h-full flex items-center justify-center bg-primary-foreground">
          Getting things ready ... <Rings height={50} color="red" />
          </div>}
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
      toast("AutoRecording Disabled!");
    } else {
      setAutoRecording(true);
      toast("AutoRecording Enabled!");
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
function resizeCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>, webcamRef: React.RefObject<Webcam | null>) {
  const canvas = canvasRef.current;
  const video = webcamRef.current?.video;

  if (canvas && video) {
    const {videoWidth, videoHeight} = video;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
  }
}

