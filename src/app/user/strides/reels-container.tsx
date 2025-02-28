"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reel from "@/components/parts/stride";
import axios from "axios";



const ReelsContainer: React.FC = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      try {
        // In a real app, this would be an actual API call
        // const postsResponse = await fetch('/api/posts');
        // const postsData = await postsResponse.json();

        const response = await axios.get('/api/fetch/allPosts');

        console.log(response.data.posts);

      
        // Simulate network delay
        setTimeout(() => {
          setPosts(response.data.posts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const handleSwipe = (direction: number) => {
    const newIndex = currentReelIndex + direction;
    if (newIndex >= 0 && newIndex < posts.length) {
      setCurrentReelIndex(newIndex);
    }
  };

  const handleLike = () => {
    console.log("Liked reel:", posts[currentReelIndex].id);
  };

  const handleComment = () => {
    console.log("Comment on reel:", posts[currentReelIndex].id);
  };

  const handleShare = () => {
    console.log("Share reel:", posts[currentReelIndex].id);
  };

  return (
    <div className="h-[90vh] w-full overflow-hidden">
      <motion.div
        className="h-full w-full"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y < -50) {
            handleSwipe(1);
          } else if (info.offset.y > 50) {
            handleSwipe(-1);
          }
        }}
      >
        <motion.div
          className="h-full"
          initial={{ y: 0 }}
          animate={{ y: `-${currentReelIndex * 100}%` }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          {posts.map((reel) => (
            <div key={reel.id} className="h-full w-full snap-center">
              <Reel 
                post={reel} 
                onLike={handleLike} 
                onComment={handleComment} 
                onShare={handleShare} 
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ReelsContainer;
