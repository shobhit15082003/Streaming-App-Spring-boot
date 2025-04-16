import { Label, TextInput, Button, Card } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const VideoUpload = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title) {
      toast.error("Please provide a title and a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    try {
      const res = await fetch("http://localhost:8080/api/v1/videos/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Video uploaded successfully!");
        setTitle("");
        setFile(null);
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="bg-charcoal rounded-2xl shadow-electric-glow p-8 w-full max-w-md text-white transition duration-300 hover:shadow-electric-glow">
        <h2 className="text-2xl font-semibold text-center">📤 Upload Video</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <Label htmlFor="title" value="Video Title" />
            <TextInput
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 focus:ring-electric-blue"
            />
          </div>
          <div>
            <Label htmlFor="file" value="Choose Video File" />
            <input
              type="file"
              id="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-2 w-full text-sm text-gray-300 file:cursor-pointer file:bg-electric-blue file:text-white file:px-3 file:py-1 file:rounded file:transition file:duration-300 hover:file:bg-neon-green"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-electric-blue to-neon-green text-white font-bold transition duration-300 hover:scale-105"
          >
            Upload
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default VideoUpload;
