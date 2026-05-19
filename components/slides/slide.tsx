import { SlideData } from "@/lib/slides-data";
import { cn } from "@/lib/utils";

interface SlideProps {
  slide: SlideData;
}

export default function Slide({ slide }: SlideProps) {
  const { title, subtitle, body, bodyExtra, points, code, example } = slide;

  const renderBodyLines = (lines: string[]) =>
    lines.map((line, i) => {
      const isCheckmark = line.startsWith("✓") || line.startsWith("✅");
      const isCross = line.startsWith("❌");
      const isIndented = line.startsWith("  ");
      const isBullet = line.trim().startsWith("•");

      return (
        <p
          key={i}
          className={cn(
            "text-base md:text-lg leading-relaxed",
            isIndented && "pl-4 text-neutral-500",
            isBullet && "pl-6",
            isCheckmark && "text-emerald-700",
            isCross && "text-red-700",
            line.startsWith("✅") && "font-semibold text-emerald-700 mt-2",
            (line.startsWith("The result:") ||
              line.startsWith("What Claude built:") ||
              line.startsWith("What user actually needed:") ||
              line.startsWith("What you'll see:") ||
              line.startsWith("What happens:") ||
              line.startsWith("Today we're covering:") ||
              line.startsWith("You already know:") ||
              line.startsWith("Your task") ||
              line.startsWith("Remember:") ||
              line.startsWith("Other skills") ||
              line.startsWith("After the interview")) &&
              "font-semibold text-neutral-700 mt-1"
          )}
        >
          {line}
        </p>
      );
    });

  return (
    <div className="flex flex-col justify-center min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-8 w-full">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-3">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-500 font-medium mb-8">
            {subtitle}
          </p>
        )}

        {/* Body */}
        {body && body.length > 0 && (
          <div className="space-y-1 mb-6 text-neutral-700">
            {renderBodyLines(body)}
          </div>
        )}

        {/* Example badge */}
        {example && (
          <div
            className={cn(
              "rounded-lg border px-5 py-3 mb-6 inline-block",
              example.type === "bad"
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-green-50 border-green-200 text-green-800"
            )}
          >
            <span className="font-semibold text-sm uppercase tracking-wide mr-2">
              {example.type === "bad" ? "❌ Bad" : "✅ Good"}
            </span>
            <span className="text-base font-medium">{example.label}</span>
            {example.description && (
              <p className="text-sm mt-1 opacity-80">{example.description}</p>
            )}
          </div>
        )}

        {/* Code block */}
        {code && (
          <pre className="font-mono text-sm md:text-base bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6 whitespace-pre-wrap text-neutral-700 leading-relaxed">
            {code}
          </pre>
        )}

        {/* Points */}
        {points && points.length > 0 && (
          <div
            className={cn(
              "grid gap-5 mb-6",
              points.length === 1
                ? "grid-cols-1"
                : points.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : points.length === 3
                ? "grid-cols-1 md:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2"
            )}
          >
            {points.map((point, i) => (
              <div
                key={i}
                className="bg-neutral-50 border border-neutral-200 rounded-lg p-4"
              >
                {point.label && (
                  <p className="font-semibold text-neutral-800 text-sm md:text-base mb-2">
                    {point.label}
                  </p>
                )}
                <ul className="space-y-1">
                  {point.items.map((item, j) => (
                    <li
                      key={j}
                      className={cn(
                        "text-sm md:text-base text-neutral-600 leading-snug",
                        item.startsWith("✓") && "text-emerald-700",
                        item.startsWith("✅") && "text-emerald-700 font-medium"
                      )}
                    >
                      {!item.match(/^(\d+\.|✓|✅)/) && (
                        <span className="mr-1 text-neutral-400">—</span>
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Body Extra */}
        {bodyExtra && (
          <div
            className={cn(
              "mt-4 text-neutral-700",
              typeof bodyExtra === "string" &&
                "font-semibold text-base md:text-lg border-l-4 border-neutral-300 pl-4 py-1"
            )}
          >
            {typeof bodyExtra === "string" ? (
              <p>{bodyExtra}</p>
            ) : (
              <div className="space-y-1">{renderBodyLines(bodyExtra)}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
