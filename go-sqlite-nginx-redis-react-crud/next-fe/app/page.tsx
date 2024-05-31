import NoteList from "./components/NoteList";
import Pagination from "./components/Pagination";
import Button from "./components/Button";
import Link from "next/link";
import axios from "axios";
import { NotesResponse } from "@/app/types/note";

async function getNotes(): Promise<NotesResponse | null> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`)
    const notesResponse: NotesResponse = res.data;
    return notesResponse;
  } catch (error) {
    console.error(error);
  }
  return null
}

export default async function Home() {
  const notesResponse = await getNotes();
  return (
    <>
      <div className="flex flex-row items-center justify-between mb-5">
        <h2 className="text-3xl font-bold dark:text-white">Notes Management</h2>
        <Link href="/notes/add">
          <Button label="Add Note" />
        </Link>
      </div>
      <NoteList notes={notesResponse?.notes} />
      <div className="flex items-center justify-end mt-5">
        <Pagination />
      </div>
    </>
  );
}

export const revalidate = 1;