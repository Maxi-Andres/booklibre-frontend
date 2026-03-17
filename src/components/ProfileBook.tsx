import { PencilIcon, TrashIcon } from "@phosphor-icons/react";
import Tag from "./Tag";
import { formatDate } from "@/utils/formatDate";

export default function ProfileBook({bookImg, bookName, bookAuthor, bookGender, bookState, additionDate}: {bookImg: string, bookName: string, bookAuthor: string, bookGender: string, bookState: string, additionDate: Date}) {
  return (
    <div className="flex h-25 gap-4 justify-center items-center pl-3">
      <img src={bookImg} alt="" className="w-16 h-23 rounded-lg"/>
      <div className="w-3/8">
        <p>{bookName}</p>
        <p>{bookAuthor}</p>
        <p>{bookGender}</p>
      </div>
      <div className="min-w-28">
        <Tag filterKind="" filter="" text={bookState}></Tag>
      </div>
      <div className="text-sm text-gray-400 min-w-20 items-center">
        {formatDate(additionDate)}
      </div>
      <div>
        <button className="hover:cursor-pointer hover:text-gray-900 text-gray-500"><PencilIcon size={24} /></button>
        <button className="hover:cursor-pointer hover:text-red-500 text-gray-500"><TrashIcon size={24} /></button>
      </div>
    </div>
  )
}
