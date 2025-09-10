import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "./mode-toggle";


export default function WithNav({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex justify-between px-7 py-5  sticky top-0 dark:bg-[linear-gradient(#000000,rgb(0,0,0,0))] bg-[linear-gradient(#ffffff,rgb(255,255,255,0))] z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="z-10 "
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <ModeToggle />
      </nav>
      <main>{children}</main>
    </>
  );
}
