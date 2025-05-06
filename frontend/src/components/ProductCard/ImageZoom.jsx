"use client";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import FullHoverZoom from "../FullHoverZoom";
import ZoomToolbar from "./ZoomToolbar";

export default function ImageZoom({ src, alt, zoom }) {
  return (
    <PhotoProvider
      maskOpacity={0.3}
      maskClassName="bg-black bg-opacity-30 backdrop-blur-sm"
      toolbarRender={ZoomToolbar}
    >
      <PhotoView src={src} key={src}>
        <div className="cursor-zoom-in">
          <FullHoverZoom src={src} alt={alt} zoom={zoom} />
        </div>
      </PhotoView>
    </PhotoProvider>
  );
}
