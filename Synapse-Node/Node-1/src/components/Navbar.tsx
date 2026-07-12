"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CardanoWallet } from "@meshsdk/react";
import { Link2, Activity } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-yellow-400 border-2 border-black rounded-none flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all">
              <Link2 className="w-5 h-5 text-black" strokeWidth={3} />
            </div>
            <span className="text-xl font-black tracking-tight text-black">
              MediChain<span className="text-yellow-500">DAO</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "/", label: "Home" },
              { href: "/patient", label: "Patient" },
              { href: "/doctor", label: "Doctor" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-bold border-2 transition-all ${
                  pathname === link.href
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-transparent hover:border-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Status + Wallet */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-green-100 text-xs font-bold">
              <Activity className="w-3 h-3 text-green-600" />
              <span>Cardano Testnet</span>
            </div>
            <div className="mesh-wallet-wrapper">
              <CardanoWallet />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t-2 border-black flex">
        {[
          { href: "/", label: "Home" },
          { href: "/patient", label: "Patient" },
          { href: "/doctor", label: "Doctor" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex-1 text-center py-2.5 text-sm font-bold border-r-2 border-black last:border-r-0 transition-all ${
              pathname === link.href
                ? "bg-yellow-400 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
