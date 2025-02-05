import { ModeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";

const Theme = () => {
  return (
    <div className="flex">
      <div className="flex flex-col gap-2 justify-center">
        <ModeToggle />
      </div>

      <Separator orientation="vertical" className="mx-4" />

      {/* wiki */}
      <div className="text-sm text-muted-foreground">
        <ul className="space-y-4">
          <li>
            <strong>Dark Mode/Sys Theme 🌓</strong>
            <p>Toggle between dark mode and system theme.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Theme;
