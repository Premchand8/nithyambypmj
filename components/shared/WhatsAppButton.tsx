import { MessageCircle } from "lucide-react";
import { whatsappEnquiryUrl } from "@/lib/products";

type Props = {
  sku?: string;
  label?: string;
  className?: string;
  variant?: "solid" | "ghost" | "outline";
};

export function WhatsAppButton({
  sku,
  label = "Enquire on WhatsApp", // Indian English CTA
  className = "",
  variant = "solid",
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles =
    variant === "solid"
      ? "bg-[#25D366] text-[#0A0A0A] hover:brightness-95"
      : variant === "outline"
        ? "border border-current/40 hover:bg-white/10"
        : "hover:opacity-80";

  return (
    <a
      href={whatsappEnquiryUrl(sku)}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      {label}
    </a>
  );
}
