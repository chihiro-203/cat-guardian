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
      <div className="flex flex-col gap-2 justify-center">
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

      {/* wiki */}
      <div className="text-sm text-muted-foreground">
        <ul className="space-y-4">
          <li>
            <strong>Horizontal Flip ↔️</strong>
            <p>Adjust horizontal orientation.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Mirrored;
