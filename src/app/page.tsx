import Post from "@/components/post"
import Image from "next/image"

const posts = [
  {
    id: 1,
    username: "johndoe",
    userImage: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=600&width=600",
    caption: "Beautiful day at the beach! 🌊☀️",
    likes: 123,
    comments: 12,
  },
  {
    id: 2,
    username: "janedoe",
    userImage: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=600&width=600",
    caption: "Delicious homemade pasta 🍝",
    likes: 89,
    comments: 5,
  },
  {
    id: 3,
    username: "bobsmith",
    userImage: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=600&width=600",
    caption: "Just finished a great workout 💪",
    likes: 56,
    comments: 3,
  },
]

export default function Home() {
  return (
    <main className="max-w-md mx-auto">
      <div className="text-3xl text-black">yoooo</div>
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">Instagram Clone</h1>
          <Image src="/placeholder.svg?height=24&width=24" alt="User" width={24} height={24} className="rounded-full" />
        </div>
      </header>
      <div className="pb-16">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </main>
  )
}

