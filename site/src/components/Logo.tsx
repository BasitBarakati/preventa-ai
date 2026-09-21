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
      <span className={`inline-flex items-center justify-center overflow-hidden rounded-xl ${className}`}>
        <Image
          src="/brand/preventa-ai-uploaded-logo.jpg"
          alt="Preventa AI Symbol"
          width={90}
          height={98}
          priority={priority}
          className="w-full h-full object-contain rounded-lg"
        />
        <span className="sr-only">PREVENTA AI</span>
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/brand/preventa-ai-uploaded-logo.jpg"
        alt="PREVENTA AI"
        width={140}
        height={154}
        priority={priority}
        className="h-10 w-auto object-contain rounded-lg"
      />
    </div>
  );
}
