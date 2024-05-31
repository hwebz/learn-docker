export type Note = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Make an enum for the status
export enum Status {
  SUCCESS = "success",
  ERROR = "error",
  FAIL = "fail"
}

export type NotesResponse = {
  notes: Note[];
  results: number;
  status: Status; 
}

export type NoteData = {
  note: Note;
}

export type NoteResponse = {
  data: NoteData;
  status: Status;
}

export type AddNoteData = {
  title: string;
  content: string;
  published?: boolean;
}

export type UpdateNoteData = {
  id: string;
  title: string;
  content: string;
  published?: boolean;
}