"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "maaniko-home-intro-expires-at";

const THIRTY_MINUTES_IN_MS = 30 * 60 * 1000;
const FADE_OUT_DURATION_IN_MS = 500;

type LoaderPhase = "checking" | "playing" | "leaving" | "hidden";

/*
 * Client-side navigation-এর সময় unnecessary
 * loader flash বন্ধ রাখে।
 */
let memoryExpiresAt = 0;

export default function HomeIntroLoader() {
  const [phase, setPhase] = useState<LoaderPhase>(() => {
    if (typeof window !== "undefined" && memoryExpiresAt > Date.now()) {
      return "hidden";
    }

    return "checking";
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const hasCheckedStorageRef = useRef(false);
  const hasFinishedRef = useRef(false);
  const hideTimerRef = useRef<number | null>(null);

  const finishIntro = useCallback(() => {
    if (hasFinishedRef.current) {
      return;
    }

    hasFinishedRef.current = true;
    setPhase("leaving");

    hideTimerRef.current = window.setTimeout(() => {
      /*
       * পরবর্তী homepage visit বা navigation-এ
       * loader SSR overlay-ও সঙ্গে সঙ্গে hidden থাকবে।
       */
      document.documentElement.setAttribute("data-maaniko-intro", "skip");

      setPhase("hidden");
      hideTimerRef.current = null;
    }, FADE_OUT_DURATION_IN_MS);
  }, []);

  useEffect(() => {
    if (phase !== "checking" || hasCheckedStorageRef.current) {
      return;
    }

    hasCheckedStorageRef.current = true;

    const currentTime = Date.now();

    try {
      const storedValue = window.localStorage.getItem(STORAGE_KEY);

      const storedExpiresAt = Number(storedValue);

      const hasValidCooldown =
        Number.isFinite(storedExpiresAt) && storedExpiresAt > currentTime;

      if (hasValidCooldown) {
        memoryExpiresAt = storedExpiresAt;

        document.documentElement.setAttribute("data-maaniko-intro", "skip");

        setPhase("hidden");
        return;
      }
    } catch {
      // Storage unavailable হলে intro স্বাভাবিকভাবে চলবে।
    }

    /*
     * আগের cooldown শেষ হয়ে গেলে পুরোনো skip attribute
     * সরিয়ে নতুন intro দেখাবে।
     */
    document.documentElement.removeAttribute("data-maaniko-intro");

    const newExpiresAt = currentTime + THIRTY_MINUTES_IN_MS;

    memoryExpiresAt = newExpiresAt;

    try {
      window.localStorage.setItem(STORAGE_KEY, String(newExpiresAt));
    } catch {
      // Storage blocked হলে in-memory cooldown কাজ করবে।
    }

    setPhase("playing");
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing") {
      return;
    }

    const video = videoRef.current;

    if (!video) {
      finishIntro();
      return;
    }

    video.currentTime = 0;

    const playPromise = video.play();

    playPromise?.catch(() => {
      /*
       * Autoplay blocked হলে homepage যেন আটকে না থাকে।
       */
      finishIntro();
    });
  }, [finishIntro, phase]);

  useEffect(() => {
    const shouldSkipIntro =
      document.documentElement.getAttribute("data-maaniko-intro") === "skip";

    if (phase === "hidden" || shouldSkipIntro) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, []);

  if (phase === "hidden") {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Maaniko ওয়েবসাইট লোড হচ্ছে"
      className={`maaniko-home-intro fixed inset-0 z-[9999] flex h-dvh w-screen items-center justify-center overflow-hidden bg-white transition-opacity duration-500 ease-out ${
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {phase !== "checking" && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          disablePictureInPicture
          preload="auto"
          poster="/Logo.png"
          onEnded={finishIntro}
          onError={finishIntro}
          aria-hidden="true"
          className="h-full w-full bg-white object-contain"
        >
          <source src="/video1.mp4" type="video/mp4" />
        </video>
      )}

      <span className="sr-only">Maaniko homepage লোড হচ্ছে</span>
    </div>
  );
}
