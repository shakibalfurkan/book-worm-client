import CreateBookDialog from "@/components/dialogs/books/CreateBookDialog";

export default function BookManagement() {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold font-serif">Manage Books</h2>
        <CreateBookDialog />
      </div>
    </section>
  );
}
