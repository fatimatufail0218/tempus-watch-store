import Link from "next/link";

interface ButtonProps {
  href: string;
  text: string;
  className?: string;
}

export default function Button2({
  href,
  text,
  className = "",
}: ButtonProps) {
  return (
    <Link href={href}>
      <button
        className={`border border-black hover:bg-black text-black hover:text-white text-[11px] tracking-[0.14em] transition-colors duration-300 ${className}`}
      >
        {text}
      </button>
    </Link>
  );
}