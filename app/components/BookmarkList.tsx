"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  FilePenIcon,
  Trash2Icon,
  MoveHorizontalIcon,
  HeartIcon,
} from "lucide-react";
import { FcFolder } from "react-icons/fc";
import { motion } from "framer-motion";
import { useState } from "react";
import AddEditBookmarkModal from "./AddEditBookmarkModal";

interface BookmarkListProps {
  bookmarks: any[];
  viewMode: string;
  handleEditBookmark: (id: number, updates: any) => void;
  handleDeleteBookmark: (id: number) => void;
  handleToggleFavorite: (id: number) => void;
}

export default function BookmarkList({
  bookmarks,
  viewMode,
  handleEditBookmark,
  handleDeleteBookmark,
  handleToggleFavorite,
}: BookmarkListProps) {
  const [editingBookmark, setEditingBookmark] = useState(null);

  const handleOpenEditModal = (bookmark: any) => {
    setEditingBookmark(bookmark);
  };

  const handleCloseEditModal = () => {
    setEditingBookmark(null);
  };

  const handleSaveChanges = (updates: any) => {
    handleEditBookmark(editingBookmark.id, updates);
    handleCloseEditModal();
  };

  const handleConfirmDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this bookmark?")) {
      handleDeleteBookmark(id);
    }
  };

  return (
    <>
      {viewMode === "grid" ? (
        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {bookmarks.map((bookmark) => (
            <motion.div
              key={bookmark.id}
              className="bg-card p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <Link href="#" className="font-medium text-lg" prefetch={false}>
                  {bookmark.title}
                </Link>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <MoveHorizontalIcon className="w-5 h-5" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem
                        onClick={() => handleOpenEditModal(bookmark)}
                      >
                        <FilePenIcon className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleConfirmDelete(bookmark.id)}
                      >
                        <Trash2Icon className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => handleToggleFavorite(bookmark.id)}
                  >
                    {bookmark.isFavorite ? (
                      <HeartIcon className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5" />
                    )}
                    <span className="sr-only">
                      {bookmark.isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"}
                    </span>
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                {bookmark.description}
              </p>
              <div className="flex items-center gap-2">
                {Array.isArray(bookmark.categories) &&
                  bookmark.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {bookmarks.map((bookmark) => (
            <motion.div
              key={bookmark.id}
              className="bg-card p-4 rounded-md shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-4">
                <FcFolder className="w-6 h-6" />
                <div>
                  <Link
                    href="#"
                    className="font-medium text-lg"
                    prefetch={false}
                  >
                    {bookmark.title}
                  </Link>
                  <p className="text-muted-foreground text-sm">
                    {bookmark.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {Array.isArray(bookmark.categories) &&
                  bookmark.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <MoveHorizontalIcon className="w-5 h-5" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem
                      onClick={() => handleOpenEditModal(bookmark)}
                    >
                      <FilePenIcon className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleConfirmDelete(bookmark.id)}
                    >
                      <Trash2Icon className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => handleToggleFavorite(bookmark.id)}
                >
                  {bookmark.isFavorite ? (
                    <HeartIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5" />
                  )}
                  <span className="sr-only">
                    {bookmark.isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"}
                  </span>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      {editingBookmark && (
        <AddEditBookmarkModal
          isOpen={true}
          onClose={handleCloseEditModal}
          onSubmit={handleSaveChanges}
          initialValues={editingBookmark}
        />
      )}
    </>
  );
}
