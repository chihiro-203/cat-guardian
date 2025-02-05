import { Button } from "@/components/ui/button";
import { meow } from "@/utils/audio";
import { Video } from "lucide-react";
import { RefObject } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";

interface RecordingProps {
  webcamRef: RefObject<Webcam | null>;
  mediaRecorderRef: RefObject<MediaRecorder | null>;
  isRecording: boolean;
  volume: number;
}

const Recording: React.FC<RecordingProps> = ({
  webcamRef,
  mediaRecorderRef,
  isRecording,
  volume,
}) => {
  let stopTimeout: any = null;

  function userPromptRecording() {
    if (!webcamRef.current) {
      toast("Camera is not found. Please refresh.");
    }

    if (mediaRecorderRef.current?.state == "recording") {
      mediaRecorderRef.current.requestData();
      clearTimeout(stopTimeout);
      mediaRecorderRef.current.stop();
      toast("Recording saved to downloads.");
    } else {
      startRecording(false);
    }
  }

  function startRecording(doBeep: boolean) {
    if (webcamRef.current && mediaRecorderRef.current?.state !== "recording") {
      mediaRecorderRef.current?.start();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      doBeep && meow(volume);

      stopTimeout = setTimeout(() => {
        if (mediaRecorderRef.current?.state === "recording") {
          mediaRecorderRef.current.requestData();
          mediaRecorderRef.current.stop();
        }
      }, 30000);
    }
  }

  return (
    <div className="flex">
      <div className="flex flex-col gap-2">
        <Button
          variant={isRecording ? "destructive" : "outline"}
          size={"icon"}
          onClick={userPromptRecording}
        >
          <Video />
        </Button>
      </div>
    </div>
  );
};
export default Recording;
