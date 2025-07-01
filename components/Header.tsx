"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggler } from "./ThemeToggler";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
            Truly IAS
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-muted-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4">
          <ThemeToggler />

          <Button
            asChild
            className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:scale-[1.01]"
          >
            <Link href="/posts">Explore Posts</Link>
          </Button>
        </nav>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 flex flex-row items-center justify-between gap-4 animate-fade-in">
          <ThemeToggler />

          <Button
            asChild
            className="bg-gradient-to-tr from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-md shadow-sm hover:shadow-md hover:scale-[1.01] transition-all"
          >
            <Link href="/posts">Explore</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
