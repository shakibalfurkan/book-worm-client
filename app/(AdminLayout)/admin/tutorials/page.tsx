import CreateTutorialDialog from "@/components/dialogs/tutorials/CreateTutorialDialog";
import { Sparkles } from "lucide-react";

export default function Tutorials() {
  return (
    <section className="p-4 max-w-7xl mx-auto">
      <div className="mb-10 w-full flex-col md:flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
            <Sparkles className="text-primary" /> Learning Center
          </h1>
          <p className="text-muted-foreground mt-2">
            Master the art of reading and reviewing.
          </p>
        </div>
        <CreateTutorialDialog />
      </div>
    </section>
  );
}
