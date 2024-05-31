import Link from "next/link";

export default function NoteList({
  notes
}: any) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
                Title
            </th>
            <th scope="col" className="px-6 py-3">
                Content
            </th>
            <th scope="col" className="px-6 py-3">
                Published
            </th>
            <th scope="col" className="px-6 py-3">
                Created At
            </th>
            <th scope="col" className="px-6 py-3">
                Updated At
            </th>
            <th scope="col" className="px-6 py-3">
                Action
            </th>
          </tr>
        </thead>
        <tbody>
          {notes?.map((note: any) => (
            <tr key={note.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <Link href={`/notes/${note.id}`} className="underline hover:opacity-50">
                    {note.title}
                  </Link>
              </th>
              <td className="px-6 py-4">
                  {note.content}
              </td>
              <td className="px-6 py-4">
                  {note.published ? 'Yes' : 'No'}
              </td>
              <td className="px-6 py-4">
                  {note.createdAt}
              </td>
              <td className="px-6 py-4">
                  {note.updatedAt}
              </td>
              <td className="px-6 py-4">
                  <Link href={`/notes/add?id=${note.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}
