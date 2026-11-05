"use client";

import { useEffect, useRef, useState } from "react";

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

/**
 * Looping, muted screen-recording that stands in for an animated GIF at a
 * fraction of the bytes. Nothing but the poster is fetched until the video
 * scrolls into view (`preload="none"`), it pauses again when it leaves (so
 * offscreen clips stop decoding), and it never autoplays for reduced-motion
 * or Save-Data visitors — they get a play button instead.
 */
export function LazyVideo({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Set when the visitor pauses (or motion is reduced), so scrolling back
  // into view doesn't override their choice.
  const heldRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
    if (saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) heldRef.current = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !heldRef.current) video.play().catch(() => {});
        else if (!entry.isIntersecting && !video.paused) video.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      heldRef.current = false;
      video.play().catch(() => {});
    } else {
      heldRef.current = true;
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        poster={poster}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause: ${label}` : `Play: ${label}`}
        data-playing={playing || undefined}
        className="cc-media-toggle absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#181818]/15 bg-white/90 text-[#181818]"
      >
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor" aria-hidden="true">
          {playing ? (
            <path d="M2.5 1.5h2.25v9H2.5zM7.25 1.5H9.5v9H7.25z" />
          ) : (
            <path d="M3 1.4v9.2a.4.4 0 0 0 .6.34l7.4-4.6a.4.4 0 0 0 0-.68L3.6 1.06A.4.4 0 0 0 3 1.4z" />
          )}
        </svg>
      </button>
    </>
  );
}
