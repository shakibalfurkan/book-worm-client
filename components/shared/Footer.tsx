"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-2xl font-bold font-display text-foreground"
          >
            BookWorm
          </Link>
          <p className="text-sm text-muted-foreground">
            Discover your next favorite book, track your reading, and explore
            curated collections.
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <FaTwitter className="w-5 h-5 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <FaGithub className="w-5 h-5 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <FaInstagram className="w-5 h-5 text-primary" />
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-foreground mb-2">Quick Links</h4>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            href="/browse-books"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse Books
          </Link>
          <Link
            href="/my-library"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            My Library
          </Link>
          <Link
            href="/tutorials"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Tutorials
          </Link>
        </div>

        {/* Newsletter / Footer Note */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-foreground mb-2">Stay Updated</h4>
          <p className="text-sm text-muted-foreground">
            Subscribe to get the latest books, tutorials, and updates.
          </p>
          <form className="flex gap-2 mt-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background"
            />
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-background"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-border mt-8 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BookWorm. All rights reserved.
      </div>
    </footer>
  );
}
