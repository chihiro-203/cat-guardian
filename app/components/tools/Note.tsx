import { Button } from "@/components/ui/button";

const Note = ({}) => {
  return (
    <div className="flex">
      <div className="flex flex-col gap-2 justify-center">
        <Button variant={"secondary"} className="rounded-full  h-10 w-10 cursor-default">
          ?
        </Button>
      </div>

      <div className="mx-4"></div>

      {/* wiki */}
      <div className="text-sm text-muted-foreground">
        <ul className="space-y-4">
          <li>
            <strong>Camera Feed Highlighting 🎨</strong>
            <p>
              Highlights persons in{" "}
              <span className="text-[#FF0F0F] font-semibold">red</span> and
              other objects in{" "}
              <span className="text-[#00B612] font-semibold">green</span>.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Note;
