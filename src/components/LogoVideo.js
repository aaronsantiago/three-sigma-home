import { useRef, useState, useEffect } from "react";

export default function LogoVideo() {
  const [scroll, setScroll] = useState(0);
  const videoRef = useRef();
  const containerRef = useRef();
  const scrollHandler = () => {
    if (containerRef.current != null) {
      let t =
        window.scrollY / (containerRef.current.scrollHeight - window.innerHeight);
      let pbR =
        (t - videoRef.current.currentTime / videoRef.current.duration) *
        videoRef.current.duration *
        2;
      if (pbR >= 0) {
        videoRef.current.playbackRate = pbR + 1;
      } else {
        videoRef.current.playbackRate = 0;
      }
  
      setScroll(t);
    }
    requestAnimationFrame(scrollHandler);
  };

  useEffect(() => {
    requestAnimationFrame(scrollHandler);
  }, []);

  return (
    <div style={{ height: "450vh" }}>
      <div
        ref={containerRef}
        style={{ height: "300vh" }}
        className="w-full bg-black overscroll-none sticky top-0"
      >
        <div className="sticky top-0 w-screen h-screen">
          <div style={{height: "calc(100vw * 18 / 23/2 + 3px)", bottom: "calc(100vw * 18 / 23/2)"}} className="z-10 absolute w-full bg-gradient-to-b from-black" />
          <video
            className="absolute bottom-0 w-screen"
            autobuffer="autobuffer"
            preload="preload"
            ref={videoRef}
            src="/logo.mp4"
            autoPlay="true"
            playsInline
          ></video>
        </div>
      </div>
    </div>
  );
}
