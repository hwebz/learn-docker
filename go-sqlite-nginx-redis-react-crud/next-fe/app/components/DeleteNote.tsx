"use client"

import ConfirmModal from "./ConfirmModal";
import { useMemo, useState } from "react";
import { DeleteNoteResponse, Note } from "@/app/types/note";
import axios from "axios";
import { set } from "react-hook-form";

async function deletNote(noteId: string): Promise<DeleteNoteResponse | null> {
  try {
    const res = await axios.delete(`/api/notes/${noteId}`);
    const deleteNoteResponse: DeleteNoteResponse = res.data;  
    return deleteNoteResponse;
  } catch (error) {
    console.error(error);
  }

  return null
}

type DeleteNoteProps = {
  note?: Note
}

export default function DeleteNote(props: DeleteNoteProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleDeleteNote = async () => {
    if (props.note?.id) {
      await deletNote(props.note?.id);
    }
    setOpen(false);
  }

  return (
    <>
      <p
        className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Delete
      </p>

      <ConfirmModal
        open={open}
        title='Delete Note'
        content='Are you sure you want to delete this note?'
        buttonLabels={['Delete', 'Cancel']}
        onConfirm={handleDeleteNote}
        onCancel={() => setOpen(false)}
      />
    </>
  )
}
