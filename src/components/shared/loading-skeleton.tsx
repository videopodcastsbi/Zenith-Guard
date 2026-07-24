import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "card" | "text" | "circular" | "table-row" | "chart";
}

export default function LoadingSkeleton({ 
  className, 
  variant = "text",
  ...props 
}: SkeletonProps) {
  if (variant === "card") {
    return (
      <div className={cn("glass-card rounded-xl p-6 animate-pulse", className)} {...props}>
        <div className="h-6 w-1/3 bg-white/10 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-white/5 rounded" />
          <div className="h-4 w-5/6 bg-white/5 rounded" />
          <div className="h-4 w-4/6 bg-white/5 rounded" />
        </div>
      </div>
    );
  }

  if (variant === "circular") {
    return (
      <div 
        className={cn("bg-white/10 rounded-full animate-pulse", className)} 
        {...props} 
      />
    );
  }

  if (variant === "table-row") {
    return (
      <div className={cn("flex items-center space-x-4 py-3 animate-pulse border-b border-white/5", className)} {...props}>
        <div className="h-4 w-1/4 bg-white/10 rounded" />
        <div className="h-4 w-1/4 bg-white/5 rounded" />
        <div className="h-4 w-1/4 bg-white/5 rounded" />
        <div className="h-4 w-1/4 bg-white/5 rounded" />
      </div>
    );
  }

  if (variant === "chart") {
    return (
      <div className={cn("glass-card rounded-xl p-6 h-64 flex items-end space-x-2 animate-pulse", className)} {...props}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className="flex-1 bg-white/10 rounded-t"
            style={{ height: `${Math.max(20, Math.random() * 100)}%` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div 
      className={cn("h-4 bg-white/10 rounded animate-pulse", className)} 
      {...props} 
    />
  );
}
