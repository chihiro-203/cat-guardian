"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Rings } from "react-loader-spinner";
import { Separator } from "@/components/ui/separator";
import * as cocossd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import { DetectedObject, ObjectDetection } from "@tensorflow-models/coco-ssd";
import { drawOnCanvas, resizeCanvas } from "@/utils/draw";
import { formatDate } from "@/utils/date";
import { meow } from "@/utils/audio";
import WebcamView from "./WebcamView";
import Volume from "./tools/Volume";
import Mirrored from "./tools/Mirrored";
import Theme from "./tools/Theme";
import Screenshot from "./tools/Screenshot";
import Recording from "./tools/Recording";
import AutoRecord from "./tools/AutoRecord";
import Note from "./tools/Note";

let interval: any = null;

export default function Camera() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mirrored, setMirrored] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [autoRecording, setAutoRecording] = useState<boolean>(false);
  const [volume, setVolume] = useState(0.8);
  const [model, setModel] = useState<ObjectDetection>();
  const [loading, setLoading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // initialize the media recorder
  useEffect(() => {
    if (webcamRef && webcamRef.current) {
      const stream = (webcamRef.current.video as any).captureStream();
      if (stream) {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            const recordedBlob = new Blob([e.data], { type: "video" });
            const videoURL = URL.createObjectURL(recordedBlob);

            const a = document.createElement("a");
            a.href = videoURL;
            a.download = `${formatDate(new Date())}.webm`;
            a.click();
          }
        };

        mediaRecorderRef.current.onstart = () => {
          setIsRecording(true);
        };

        mediaRecorderRef.current.onstop = () => {
          setIsRecording(false);
        };
      }
    }
  }, [webcamRef]);

  useEffect(() => {
    setLoading(true);
    initModel();
  }, []);

  // MODEL
  async function initModel() {
    const loadedModel: ObjectDetection = await cocossd.load({
      base: "mobilenet_v2",
    });
    setModel(loadedModel);
  }

  useEffect(() => {
    if (model) {
      setLoading(false);
    }
  }, [model]);

  async function runPrediction() {
    if (
      model &&
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const predictions: DetectedObject[] = await model.detect(
        webcamRef.current.video
      );

      // console.log(predictions)
      resizeCanvas(canvasRef, webcamRef);
      drawOnCanvas(mirrored, predictions, canvasRef.current?.getContext("2d"));

      let isPerson: boolean = false;
      if (predictions.length > 0) {
        predictions.forEach((prediction) => {
          isPerson = prediction.class === "person";
        });

        if (isPerson && autoRecording) {
          startRecording(true);
        }
      }
    }
  }

  useEffect(() => {
    interval = setInterval(() => {
      runPrediction();
    }, 100);

    return () => clearInterval(interval);
  }, [webcamRef.current, model, mirrored, autoRecording]);

  return (
    <div>
      <div className="flex h-screen">
        {/* Webcam */}
        <div className="relative">
          <WebcamView
            mirrored={mirrored}
            webcamRef={webcamRef}
            canvasRef={canvasRef}
          />
        </div>

        {/* Tracking Tools */}
        <div className="flex flex-row flex-1">
          <div className="border-primary/5 w-full border-2 flex flex-col gap-2 justify-between shadow-md rounded-md p-4">
            

          <Note />
          <Separator className="my-2" />

            <Theme />
            <Mirrored mirrored={mirrored} setMirrored={setMirrored} />

            <Separator className="my-2" />

            <Screenshot webcamRef={webcamRef} />

            <Recording
              webcamRef={webcamRef}
              mediaRecorderRef={mediaRecorderRef}
              isRecording={isRecording}
              startRecording={startRecording}
            />

            <AutoRecord
              autoRecording={autoRecording}
              setAutoRecording={setAutoRecording}
            />

            <Separator className="my-2" />

            <Volume volume={volume} setVolume={setVolume} />

            {/* <Separator className="my-2" /> */}

            {/* <Note /> */}
          </div>
        </div>

        {loading && (
          <div className="z-50 absolute w-full h-full flex items-center justify-center bg-primary-foreground">
            Getting things ready ... <Rings height={50} color="red" />
          </div>
        )}
      </div>
    </div>
  );

  function startRecording(doBeep: boolean) {
    if (webcamRef.current && mediaRecorderRef.current?.state !== "recording") {
      mediaRecorderRef.current?.start();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      doBeep && meow(volume);
    }
  }
}
