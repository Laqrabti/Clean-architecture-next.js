"use client";
import { useEffect, useState } from "react";

export default function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    fetch("/api/video")
      .then((res) => res.json())
      .then((data) => {
        console.log("Video URL retrieved:", data.url);
        setVideoUrl(data.url)
      })
      .catch((err) => console.error(err));
  }, []);

  if (!videoUrl) return <p>Loading video...</p>;

  return (
    <video width={640} height={360} controls>
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
