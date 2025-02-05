import { ModeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";

const Theme = () => {
  return (
    <div className="flex">
      <div className="flex flex-col gap-2">
        <ModeToggle />
      </div>

      <Separator orientation="vertical" className="mx-4" />
    </div>
  );
};
export default Theme;
