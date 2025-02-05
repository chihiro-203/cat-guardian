import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { base64toBlob } from "@/utils/convert";
import { formatDate } from "@/utils/date";
import { CameraIcon } from "lucide-react";
import { RefObject } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";

interface ScreenshotProps {
  webcamRef: RefObject<Webcam | null>;
}

const Screenshot: React.FC<ScreenshotProps> = ({ webcamRef }) => {
  function userPromptScreenshot() {
    // take picture
    if (!webcamRef.current) {
      toast("Camera not found. Please refresh.");
    } else {
      const imgSrc = webcamRef.current.getScreenshot();
      const blob = base64toBlob(imgSrc);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formatDate(new Date())}.png`;
      a.click();
    }
    // save picture
  }

  return (
    <div className="flex">
      <div className="flex flex-col gap-2 justify-center">
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={userPromptScreenshot}
        >
          <CameraIcon />
        </Button>
      </div>

      <Separator orientation="vertical" className="mx-4" />

      {/* wiki */}
      <div className="text-sm text-muted-foreground">
        <ul className="space-y-4">
          <li>
            <strong>Take Pictures 📸</strong>
            <p>Capture snapshots at any moment from the video feed.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Screenshot;
