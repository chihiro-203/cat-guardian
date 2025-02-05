import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FlipHorizontal } from "lucide-react";

interface MirroredProps {
  mirrored: boolean;
  setMirrored: (value: boolean) => void;
}

const Mirrored: React.FC<MirroredProps> = ({ mirrored, setMirrored }) => {
  return (
    <div className="flex">
      <div className="flex flex-col gap-2">
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => {
            setMirrored(!mirrored);
          }}
        >
          <FlipHorizontal />
        </Button>
      </div>

      <Separator orientation="vertical" className="mx-4" />
    </div>
  );
};
export default Mirrored;
