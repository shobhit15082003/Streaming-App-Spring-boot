import { useEffect, useRef } from "react";
import Hls from "hls.js";

const PlayerofVideo = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src;
    }
  }, [src]);

  return (
    <div className="w-full flex justify-center items-center">
      <motion.video
        ref={videoRef}
        controls
        autoPlay
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-lg shadow-lg"
      />
    </div>
  );
};

export default PlayerofVideo;
