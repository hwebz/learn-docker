"use client"

import { AddNoteData, Note, NoteResponse, UpdateNoteData } from '@/app/types/note'
import axios from 'axios'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

async function getNote(id: string): Promise<NoteResponse | null> {
  try {
    // Fetch the single note
    const res = await axios.get(`/api/notes/${id}`)
    const noteResponse: NoteResponse = res.data;
    return noteResponse;
  } catch (error) {
    console.error(error);
  }

  return null;
}

async function addNote(payload: AddNoteData): Promise<NoteResponse | null> {
  try {
    const res = await axios.post('/api/notes', payload);
    const noteResponse: NoteResponse = res.data;  
    return noteResponse;
  } catch (error) {
    console.error(error);
  }

  return null
}

async function updateNote(payload: UpdateNoteData): Promise<NoteResponse | null> {
  try {
    const res = await axios.patch(`/api/notes/${payload.id}`, payload);
    const noteResponse: NoteResponse = res.data;  
    return noteResponse;
  } catch (error) {
    console.error(error);
  }

  return null
}

export default function AddNotePage() {
  const searchParams = useSearchParams();
  const noteId = searchParams.get('id');
  const router = useRouter()

  useEffect(() => {
    const fetchNote = async () => {
      if (noteId) {
        const noteResponse = await getNote(noteId);
        const note: Note | undefined = noteResponse?.data?.note;
        
        setValue('title', note?.title || '');
        setValue('content', note?.content || '');
        setValue('published', !!note?.published);

      }
    }

    fetchNote()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      title: '',
      content: '',
      published: false
    }
  })
  const classes = {
    valid: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    invalid: 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
  }

  const onSubmit = async (data: any) => {
    if (noteId) {
      await updateNote({
        ...data,
        id: noteId
      })
    } else {
      await addNote(data)
    }
    router.replace('/')
  }

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>

      <Link href="/" className="flex items-center gap-2 font-medium text-blue-600 dark:text-blue-500 hover:opacity-50 transition-all">
        <svg className="w-4 h-4 ms-2 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        Back
      </Link>
      <h2 className="text-3xl font-bold dark:text-white mb-5 mt-2">Add Note</h2>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input type="text" className={errors.title ? classes.invalid : classes.valid} {...register('title', { required: true })} />
        {errors.title && <p className="mt-2 text-sm text-red-600 dark:text-red-500">Title is required</p>}
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
        <textarea rows={5} className={errors.content ? classes.invalid : classes.valid} {...register('content', { required: true })} />
        {errors.content && <p className="mt-2 text-sm text-red-600 dark:text-red-500">Content is required</p>}
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input type="checkbox" {...register('published')} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
        </div>
        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Published?</label>
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
    </form>
  )
}
