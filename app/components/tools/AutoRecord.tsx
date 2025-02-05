import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Cat } from "lucide-react";
import { CirclesWithBar } from "react-loader-spinner";
import { toast } from "sonner";

interface AutoRecordProps {
  autoRecording: boolean;
  setAutoRecording: (value: boolean) => void;
}

const AutoRecord: React.FC<AutoRecordProps> = ({
  autoRecording,
  setAutoRecording,
}) => {
  function toggleAutoRecording() {
    if (autoRecording) {
      setAutoRecording(false);
      toast("AutoRecording Disabled!");
    } else {
      setAutoRecording(true);
      toast("AutoRecording Enabled!");
    }
  }
  return (
    <div className="flex">
      <div className="flex flex-col gap-2 justify-center">
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

      <Separator orientation="vertical" className="mx-4" />

      {/* wiki */}
      <div className="text-sm text-muted-foreground">
        <ul className="space-y-4">
          <li>
            <strong>Enable/Disable Auto Record 🚫</strong>
            <p>Enable/Disable automatic video recording.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default AutoRecord;
