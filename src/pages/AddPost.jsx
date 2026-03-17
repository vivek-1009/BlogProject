import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <Container>

        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Create New Post
          </h1>
          <p className="text-gray-500 mt-1">
            Share your thoughts with the world 🚀
          </p>
        </div>

        {/* Form */}
        <PostForm />

      </Container>

    </div>
  )
}

export default AddPost