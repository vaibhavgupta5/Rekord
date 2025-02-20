import Image from "next/image"
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react"

interface PostProps {
  username: string
  userImage: string
  image: string
  caption: string
  likes: number
  comments: number
}

export default function Post({ username, userImage, image, caption, likes, comments }: PostProps) {
  return (
    <div className="bg-white border-b mb-4">
      <div className="flex items-center p-4">
        <Image
          src={userImage || "/placeholder.svg"}
          alt={username}
          width={40}
          height={40}
          className="rounded-full mr-3"
        />
        <span className="font-semibold">{username}</span>
      </div>
      <Image src={image || "/placeholder.svg"} alt="Post" width={600} height={600} className="w-full" />
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <Heart className="w-6 h-6" />
            <MessageCircle className="w-6 h-6" />
            <Send className="w-6 h-6" />
          </div>
          <Bookmark className="w-6 h-6" />
        </div>
        <p className="font-semibold mb-1">{likes} likes</p>
        <p>
          <span className="font-semibold mr-2">{username}</span>
          {caption}
        </p>
        <p className="text-gray-500 text-sm mt-1">View all {comments} comments</p>
      </div>
    </div>
  )
}

