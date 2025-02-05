import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Volume2 } from "lucide-react";
import { meow } from '../../../utils/audio';

interface VolumeProps {
    volume: number;
    setVolume: (value: number) => void;
}

const Volume: React.FC<VolumeProps> =({volume, setVolume}) => {
  return (
    <div className="flex">
      <div className="flex flex-col gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <Volume2 />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Slider max={1} min={0} step={0.2} defaultValue={[volume]} onValueCommit={(val) => {
                setVolume(val[0]);
                meow(val[0])
            }} />
          </PopoverContent>
        </Popover>
      </div>

      <Separator orientation="vertical" className="mx-4" />

      {/* wiki */}
    </div>
  );
};
export default Volume;
