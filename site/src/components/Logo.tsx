import Image from "next/image";

type LogoProps = {
  variant?: "full" | "symbol";
  priority?: boolean;
  className?: string;
  dark?: boolean;
};

export default function Logo({ variant = "full", priority = false, className = "", dark = false }: LogoProps) {
  if (variant === "symbol") {
    return (
      <span className={`brand-symbol ${dark ? "brand-symbol--dark" : ""} ${className}`}>
        <Image
          src="/brand/preventa-ai-symbol.png"
          alt=""
          width={340}
          height={370}
          priority={priority}
          sizes="56px"
        />
        <span className="sr-only">PREVENTA AI</span>
      </span>
    );
  }

  return (
    <Image
      src="/brand/preventa-ai-logo.png"
      alt="PREVENTA AI"
      width={690}
      height={445}
      priority={priority}
      className={className}
      sizes="(max-width: 768px) 240px, 330px"
    />
  );
}
