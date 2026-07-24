import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from "lucide-react";

type StatusType = "safe" | "warning" | "danger" | "critical" | "info" | "online" | "offline" | "degraded";

interface StatusBadgeProps {
  status: StatusType | string;
  label?: string;
  className?: string;
  showIcon?: boolean;
}

export default function StatusBadge({ status, label, className, showIcon = true }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  
  let variantClass = "text-zinc-400 bg-zinc-400/10 border-zinc-400/20";
  let Icon = Info;

  if (["safe", "online", "low"].includes(normalizedStatus)) {
    variantClass = "status-safe";
    Icon = CheckCircle2;
  } else if (["warning", "degraded", "medium"].includes(normalizedStatus)) {
    variantClass = "status-warning";
    Icon = AlertTriangle;
  } else if (["danger", "high"].includes(normalizedStatus)) {
    variantClass = "status-danger";
    Icon = AlertCircle;
  } else if (["critical", "banned", "offline"].includes(normalizedStatus)) {
    variantClass = "status-critical";
    Icon = AlertCircle;
  }

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      variantClass,
      className
    )}>
      {showIcon && <Icon className="w-3 h-3 mr-1.5" />}
      {label || status}
    </span>
  );
}
