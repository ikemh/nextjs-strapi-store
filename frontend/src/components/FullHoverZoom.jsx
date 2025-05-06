"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

export default function FullHoverZoom({ src, alt, zoom = 2 }) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[1000/400] overflow-hidden cursor-zoom-in"
      onMouseEnter={() => setZoomed(true)}
      onMouseMove={(e) => zoomed && handleMouseMove(e)}
      onMouseLeave={() => setZoomed(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{
          transform: zoomed ? `scale(${zoom})` : "scale(1)",
          transformOrigin: `${origin.x}% ${origin.y}%`,
          transition: zoomed ? "none" : "transform 0.3s ease",
        }}
      />
    </div>
  );
}
