"use client";

import { Github, Linkedin, X } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background text-foreground py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16 text-sm">
        {/* Brand Section */}
        <div className="max-w-sm space-y-2">
          <p className="text-base font-semibold text-foreground">Truly IAS</p>
          <p className="text-muted-foreground">
            A minimalist blog CMS that’s more disciplined than a UPSC aspirant
            during prelims prep.
          </p>
          <p className="text-xs mt-4 text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <Link
              href="https://sidharth-sangelia.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 decoration-accent hover:text-accent-foreground transition"
            >
              Sidharth Sangelia
            </Link>
            . All rights reserved.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Tech Stack</p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>Next.js 15 (App Router)</li>
            <li>Tailwind CSS + ShadCN UI</li>
            <li>MongoDB + Mongoose</li>
            <li>Tiptap Editor + Cloudinary</li>
            <li>Deployed on Vercel (obviously)</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Connect</p>
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/sidharthsangelia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-accent-foreground transition hover:scale-110"
            >
              <Github size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/sidharthsangelia/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-accent-foreground transition hover:scale-110"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="https://x.com/Sidharth_1503"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="hover:text-accent-foreground transition hover:scale-110"
            >
              <X size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="mt-10 text-center text-sm text-muted-foreground">
        Built with ☕, VSCode magic, and a lot of Ctrl+Z by{" "}
        <Link
          href="https://sidharth-sangelia.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4 decoration-accent hover:text-accent-foreground transition"
        >
          Sidharth Sangelia
        </Link>
        .
      </div>
    </footer>
  );
}
