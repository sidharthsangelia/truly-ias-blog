// app/admin/components/AdminHeader.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Shield, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggler } from "@/components/ThemeToggler";
import { UserButton, useUser } from "@clerk/nextjs";

export default function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isLoaded } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
         
        <Link href="/admin" className="flex items-center space-x-2">
          <span className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
            Truly IAS
          </span>
          <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            <Shield size={12} />
            <span>Admin</span>
          </div>
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
           
          <div className="flex items-center space-x-2 mr-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin" className="text-muted-foreground hover:text-foreground">
                <BarChart3 size={16} className="mr-1" />
                Dashboard
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm" asChild>
              <Link href="/posts" className="text-muted-foreground hover:text-foreground">
                Posts
              </Link>
            </Button>
            
          
            
             
          </div>

          {/* Public Site Link */}
          <Button
            variant="outline" 
            size="sm"
            asChild
            className="text-sm   font-medium"
          >
            <Link href="/">View Site</Link>
          </Button>

          <ThemeToggler />

          {/* User Info & Button */}
          <div className="flex items-center space-x-3">
            {isLoaded && user && (
              <div className="hidden lg:flex flex-col items-end text-sm">
                <span className="font-medium text-foreground">
                  {user.firstName || user.username || 'Admin'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.emailAddresses[0]?.emailAddress}
                </span>
              </div>
            )}
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </div>
        </nav>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-3 animate-fade-in border-t border-border">
          {/* User Info Mobile */}
          {isLoaded && user && (
            <div className="flex items-center space-x-3 py-2">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
              <div className="flex flex-col text-sm">
                <span className="font-medium text-foreground">
                  {user.firstName || user.username || 'Admin'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.emailAddresses[0]?.emailAddress}
                </span>
              </div>
            </div>
          )}

          {/* Admin Navigation Links Mobile */}
          <div className="flex flex-col space-y-2">
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/admin">
                <BarChart3 size={16} className="mr-2" />
                Dashboard
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/posts">
                Posts
              </Link>
            </Button>
            
           
          </div>

          {/* Action Buttons Mobile */}
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-border">
            <Button
              variant="outline" 
              size="sm"
              asChild
              className="flex-1 bg-purple-300"
            >
              <Link href="/posts">View Site</Link>
            </Button>

            <ThemeToggler />
          </div>
        </div>
      )}
    </header>
  );
}