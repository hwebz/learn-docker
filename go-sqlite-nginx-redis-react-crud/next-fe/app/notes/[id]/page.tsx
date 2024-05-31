import { Note, NoteResponse, NotesResponse } from '@/app/types/note';
import axios from 'axios';
import React from 'react'

async function getNote(id: string): Promise<NoteResponse | null> {
  try {
    // Fetch the single note
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`)
    const noteResponse: NoteResponse = res.data;
    return noteResponse;
  } catch (error) {
    console.error(error);
  }

  return null;
}

export async function generateStaticParams() {
  // Fetch the list of notes
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`)
  const notesResponse: NotesResponse = res.data;

  // Get the id we want to pre-render based on notes
  return notesResponse.notes.map((note) => ({
    id: note.id
  }))
}

export default async function NoteDetail({
  params
}: any) {
  const noteResponse = await getNote(params.id);
  const note: Note | undefined = noteResponse?.data?.note;
  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{note?.title}</h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{note?.content}</p>
    </div>
  )
}
