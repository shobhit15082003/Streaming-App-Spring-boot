import { useState } from "react";
import "./App.css";
import VideoUpload from "./components/VideoUpload";
import { Toaster } from "react-hot-toast";
import PlayerofVideo from "./components/PlayerofVideo";
import { Button, TextInput } from "flowbite-react";
import { motion } from "framer-motion";

function App() {
  const [videoId, setVideoId] = useState(null);
  const [fieldValue, setFieldValue] = useState("");

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center px-4 py-6 space-y-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center"
        >
          🎥 Video Streaming App
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          <motion.div
            className="flex flex-col items-center justify-center w-full p-4 rounded-lg bg-gray-800 shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-xl mb-4 font-semibold">🎬 Playing Video</h2>
            {videoId ? (
              <PlayerofVideo
                src={`http://localhost:8080/api/v1/videos/${videoId}/master.m3u8`}
              />
            ) : (
              <p className="text-gray-400 mb-4 text-center">
                Enter a Video ID to play it here
              </p>
            )}
            <div className="mt-4 flex gap-2 w-full justify-center">
              <TextInput
                placeholder="Enter Video ID"
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
                className="w-64 transition duration-300 focus:ring-2 focus:ring-cyan-500"
              />
              <Button
                onClick={() => setVideoId(fieldValue)}
                className="transition-all duration-300 hover:scale-105"
              >
                Play
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <VideoUpload />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default App;
