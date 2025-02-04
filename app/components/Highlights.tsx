import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CameraIcon, FlipHorizontal, MoonIcon, SunIcon } from "lucide-react";

export default function Highlights() {
  return (
    <div className="text-sm text-muted-foreground">
      <ul className="space-y-4">
        <li>
          <strong>Dark Mode/Sys Theme 🌓</strong>
          <p>Toggle between dark mode and system theme.</p>
          <Button className="h-6 w-6 my-2" variant={"outline"} size={"icon"}>
            <SunIcon size={14} />
          </Button>{" "}
          /{" "}
          <Button className="h-6 w-6 my-2" variant={"outline"} size={"icon"}>
            <MoonIcon size={14} />
          </Button>
        </li>
        <li>
          <strong>Horizontal Flip ↔️</strong>
          <p>Adjust horizontal orientation.</p>
          <Button className="h-6 w-6 my-2" variant={"outline"} size={"icon"}>
            <FlipHorizontal size={14} />
          </Button>
        </li>

        <Separator />

        <li>
          <strong>Take Pictures 📸</strong>
          <p>Capture snapshots at any moment from the video feed.</p>
          <Button
            className="w-6 h-6 my-2"
            variant={"outline"}
            size={"icon"}
            // onClick={userPromptScreenshot}
          >
            <CameraIcon />
          </Button>
        </li>
        <li>
          <strong>Manual Video Recording 📽️</strong>
          <p>Manually record video clips as needed.</p>
        </li>

        <Separator />
        <li>
          <strong>Enable/Disable Auto Record 🚫</strong>
          <p>
            Option to enable/disable automatic video recording whenever
            required.
          </p>
        </li>

        <li>
          <strong>Volume Slider 🔊</strong>
          <p>Adjust the volume level of the notifications.</p>
        </li>
        <li>
          <strong>Camera Feed Highlighting 🎨</strong>
          <p>
            Highlights persons in{" "}
            <span className="text-[#FF0F0F] font-semibold">red</span> and other
            objects in{" "}
            <span className="text-[#00B612] font-semibold">green</span>.
          </p>
        </li>

        <Separator />
        <li className="space-y-4">
          <strong>Share your thoughts 💬</strong>
          <br />
          <br />
          <br />
        </li>
      </ul>
    </div>
  );
}
