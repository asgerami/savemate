import React from "react";
import { Banknote } from "lucide-react";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Banknote className="storke h-11 w-11 stroke-green-600 stroke-[1.5] " />
      <p className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        SaveMate
      </p>
    </Link>
  );
}

export function MobileLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <p className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        SaveMate
      </p>
    </Link>
  );
}

export default Logo;
