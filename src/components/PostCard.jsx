import React from 'react'
import appwriteService from '../appwrite/conf'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link
      to={`/post/${$id}`}
      className="flex bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
    >
      {/* Image Left */}
      <div className="w-1/3 h-40">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Right */}
      <div className="w-2/3 p-4 flex flex-col justify-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Read full post →
        </p>
      </div>
    </Link>
  )
}

export default PostCard