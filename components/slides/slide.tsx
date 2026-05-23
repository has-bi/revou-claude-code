"use client";

import { cn } from "@/lib/utils";
import { Slide as SlideType } from "@/lib/slides-data";

interface SlideProps {
  slide: SlideType;
}

export function Slide({ slide }: SlideProps) {
  return (
    <div className="flex flex-col justify-center h-full px-16 py-12 max-w-6xl mx-auto w-full">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
        {slide.title}
      </h1>

      {/* Subtitle */}
      {slide.subtitle && (
        <p className="text-xl md:text-2xl text-gray-400 font-normal mb-8">
          {slide.subtitle}
        </p>
      )}

      {/* Example block */}
      {slide.example && (
        <div
          className={cn(
            "rounded-lg px-5 py-3 mb-6 border text-sm md:text-base",
            slide.example.type === "bad"
              ? "bg-red-50 border-red-200 text-red-900"
              : "bg-green-50 border-green-200 text-green-900"
          )}
        >
          <span className="font-semibold">{slide.example.label}</span>{" "}
          {slide.example.text}
        </div>
      )}

      {/* Body lines */}
      {slide.body && slide.body.length > 0 && (
        <div className="mb-6 space-y-1">
          {slide.body.map((line, i) => (
            <p
              key={i}
              className={cn(
                "text-base md:text-lg text-gray-700 leading-relaxed",
                line === "" && "h-2"
              )}
            >
              {line}
            </p>
          ))}
        </div>
      )}

      {/* Code block */}
      {slide.code && (
        <pre className="bg-gray-100 rounded-lg px-5 py-4 text-sm md:text-base font-mono text-gray-800 whitespace-pre-wrap mb-6 border border-gray-200">
          {slide.code}
        </pre>
      )}

      {/* Points */}
      {slide.points && slide.points.length > 0 && (
        <div className="space-y-4 mb-4">
          {slide.points.map((point, pi) => (
            <div key={pi}>
              <p className="text-base md:text-lg font-semibold text-gray-800 mb-1">
                {point.label}
              </p>
              <ul className="space-y-0.5 pl-4">
                {point.items.map((item, ii) => (
                  <li
                    key={ii}
                    className="text-sm md:text-base text-gray-600 leading-snug"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
