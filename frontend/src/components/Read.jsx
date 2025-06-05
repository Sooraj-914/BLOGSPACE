import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Read = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  const baseUrl = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl)
        if (response.status !== 200) {
          throw new Error('Failed to fetch blogs')
        }
        setData(response.data)
      } catch (error) {
        setError(error.message || "Server interaction failed")
      }
    }
    fetchData()
  }, [])

  if (error)
    return (
      <p className="text-red-600 text-center mt-8 text-lg font-semibold">
        Error: {error}
      </p>
    )

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-800 drop-shadow-md">
        Read Blogs
      </h1>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center text-lg italic">
          No blogs available.
        </p>
      ) : (
        <div className="space-y-8">
          {data.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-lg rounded-lg p-8 border border-gray-300 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-3xl font-semibold text-gray-900 mb-3 hover:text-blue-700 cursor-pointer transition-colors duration-300">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                By <span className="font-medium">{blog.author}</span>
              </p>
              <p className="text-gray-800 leading-relaxed mb-5">{blog.content}</p>
              <p className="text-xs text-gray-400 text-right italic">
                {new Date(blog.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Read