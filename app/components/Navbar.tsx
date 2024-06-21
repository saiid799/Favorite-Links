"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { CiBookmark } from "react-icons/ci";
import { CiFolderOn } from "react-icons/ci";
import { motion } from "framer-motion";

interface NavbarProps {
  bookmarks: any[];
  handleDeleteBookmark: (id: number) => void;
  handleAddBookmark: () => void;
}

export default function Navbar({
  bookmarks,
  handleDeleteBookmark,
  handleAddBookmark,
}: NavbarProps) {
  return (
    <div className="bg-background border-r border-border p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <CiBookmark className="w-6 h-6" />
        <h1 className="text-xl font-bold">Bookmark</h1>
      </div>
      <div className="flex-1 overflow-auto">
        <nav className="grid gap-2">
          {bookmarks.map((bookmark) => (
            <motion.div
              key={bookmark.id}
              className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href="#"
                className="flex items-center gap-2"
                prefetch={false}
              >
                <CiFolderOn className="w-5 h-5" />
                <span>{bookmark.title}</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => handleDeleteBookmark(bookmark.id)}
              >
                <Trash2Icon className="w-5 h-5" />
                <span className="sr-only">Delete</span>
              </Button>
            </motion.div>
          ))}
        </nav>
      </div>
      <Button className="w-full" onClick={handleAddBookmark}>
        Add Bookmark
      </Button>
    </div>
  );
}
