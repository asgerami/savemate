import React from "react";
import { Banknote } from "lucide-react";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <Banknote className="storke h-11 w-11 stroke-green-600 stroke-[1.5] " />
      <p className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        SaveMate
      </p>
    </a>
  );
}

export function MobileLogo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <p className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        SaveMate
      </p>
    </a>
  );
}

export default Logo;
