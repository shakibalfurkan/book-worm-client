import CreateGenreDialog from "@/components/dialogs/CreateGenreDialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function Genres() {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold font-serif">Manage Genres</h2>
        <CreateGenreDialog />
      </div>
    </section>
  );
}
