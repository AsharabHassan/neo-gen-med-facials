"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store";
import { useCamera } from "@/hooks/useCamera";

export default function CaptureScreen() {
  const { dispatch } = useApp();
  const { videoRef, canvasRef, isActive, error, startCamera, stopCamera, capturePhoto } =
    useCamera();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  function handleCapture() {
    const dataUrl = capturePhoto();
    if (dataUrl) {
      dispatch({ type: "SET_IMAGE", imageDataUrl: dataUrl });
      dispatch({ type: "SET_SCREEN", screen: "analysing" });
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      dispatch({ type: "SET_IMAGE", imageDataUrl: dataUrl });
      dispatch({ type: "SET_SCREEN", screen: "analysing" });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="screen items-center gap-5 py-8">
      {/* Header */}
      <div className="flex items-start justify-between w-full">
        <div>
          <p className="label-xs mb-1.5">Step 01 / 03</p>
          <h2 className="font-serif text-[2.2rem] font-normal italic text-text-primary leading-[1.05]">
            Position<br />Your Face.
          </h2>
        </div>
        <button
          className="font-sans text-[10px] text-text-muted tracking-wider uppercase hover:text-text-body transition-colors mt-1 flex-shrink-0"
          onClick={() => dispatch({ type: "SET_SCREEN", screen: "landing" })}
        >
          Back
        </button>
      </div>

      {/* Instruction strip */}
      <div className="w-full flex items-center justify-between">
        {["Face forward", "Good lighting", "No glasses"].map((tip) => (
          <span key={tip} className="font-sans text-[10px] text-text-muted tracking-wide">
            {tip}
          </span>
        ))}
      </div>

      {/* Viewfinder */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-surface-cream" style={{ aspectRatio: "3/4" }}>
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-brand-orange/40 z-10 rounded-tl" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-brand-orange/40 z-10 rounded-tr" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-brand-orange/40 z-10 rounded-bl" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-brand-orange/40 z-10 rounded-br" />

        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover scale-x-[-1] transition-opacity duration-500 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          />

          {isActive && (
            <div
              className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent pointer-events-none animate-scan"
              style={{ top: "20%" }}
            />
          )}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="border-2 border-dashed border-brand-orange/25 rounded-full"
              style={{ width: "60%", height: "76%" }}
            />
          </div>

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-surface-warm/95 gap-4">
              <p className="font-sans text-sm text-text-muted text-center">{error}</p>
              <button
                className="btn-outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload a Photo
              </button>
            </div>
          )}

          {!isActive && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-surface-warm">
              <motion.p
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="font-sans text-xs text-text-muted tracking-widest uppercase"
              >
                Initialising Camera...
              </motion.p>
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={handleFileUpload}
      />

      <div className="w-full space-y-2.5">
        {isActive && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="btn-primary w-full"
            onClick={handleCapture}
          >
            Capture Photo
          </motion.button>
        )}
        <button
          className="btn-outline w-full"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload from Gallery
        </button>
      </div>
    </div>
  );
}
