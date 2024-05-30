import NoteList from "./components/NoteList";
import Pagination from "./components/Pagination";
import Button from "./components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-row items-center justify-between mb-5">
        <h2 className="text-3xl font-bold dark:text-white">Notes Management</h2>
        <Link href="/notes/add">
          <Button label="Add Note" />
        </Link>
      </div>
      <NoteList />
      <div className="flex items-center justify-end mt-5">
        <Pagination />
      </div>
    </>
  );
}
