import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Video } from "lucide-react";
import { RefObject } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";

interface RecordingProps {
  webcamRef: RefObject<Webcam | null>;
  mediaRecorderRef: RefObject<MediaRecorder | null>;
  isRecording: boolean;
  startRecording: (doBeep: boolean) => void;
}

const Recording: React.FC<RecordingProps> = ({
  webcamRef,
  mediaRecorderRef,
  isRecording,
  startRecording,
}) => {
  const stopTimeout: any = null;

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

  return (
    <div className="flex">
      <div className="flex flex-col gap-2 justify-center">
        <Button
          variant={isRecording ? "destructive" : "outline"}
          size={"icon"}
          onClick={userPromptRecording}
        >
          <Video />
        </Button>
      </div>

      <Separator orientation="vertical" className="mx-4" />

      {/* wiki */}
      <div className="text-sm text-muted-foreground">
        <ul className="space-y-4">
          <li>
            <strong>Manual Video Recording 📽️</strong>
            <p>Manually record video clips as needed.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Recording;
