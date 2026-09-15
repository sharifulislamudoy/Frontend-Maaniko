"use client";
import { Check, Copy, Printer } from "lucide-react";
import { useState } from "react";
import styles from "./Guides.module.css";

export default function GuideActions() {
  const [message, setMessage] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage("লিংক কপি হয়েছে");
    } catch {
      setMessage("ব্রাউজারের address bar থেকে লিংক কপি করুন।");
    }
  }
  return (
    <div className={styles.actions}>
      <button type="button" onClick={() => window.print()}>
        <Printer size={17} /> প্রিন্ট / PDF
      </button>
      <button type="button" onClick={() => void copy()}>
        {message === "লিংক কপি হয়েছে" ? (
          <Check size={17} />
        ) : (
          <Copy size={17} />
        )}{" "}
        লিংক কপি
      </button>
      <span role="status">{message}</span>
    </div>
  );
}
