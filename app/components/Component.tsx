"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  FilterIcon,
  LayoutGridIcon,
  ListIcon,
  AArrowUpIcon,
  ArrowDownWideNarrowIcon,
  PlusIcon,
} from "lucide-react";
import Navbar from "./Navbar";
import BookmarkList from "./BookmarkList";
import { bookmarksData } from "@/data";
import AddEditBookmarkModal from "./AddEditBookmarkModal";

export default function Component() {
  const [bookmarks, setBookmarks] = useState(bookmarksData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [viewMode, setViewMode] = useState("grid");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);

  const filteredBookmarks = useMemo(() => {
    return bookmarks
      .filter((bookmark) =>
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        } else {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
  }, [bookmarks, searchTerm, sortBy]);

  const handleAddBookmark = (newBookmark) => {
    setBookmarks([...bookmarks, { ...newBookmark, id: bookmarks.length + 1 }]);
    setIsAddModalOpen(false);
  };

  const handleDeleteBookmark = (id) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  const handleEditBookmark = (id, updates) => {
    setBookmarks(
      bookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, ...updates } : bookmark
      )
    );
    setEditingBookmark(null);
  };

  const handleToggleFavorite = (id) => {
    setBookmarks(
      bookmarks.map((bookmark) =>
        bookmark.id === id
          ? { ...bookmark, isFavorite: !bookmark.isFavorite }
          : bookmark
      )
    );
  };

  return (
    <div className="flex h-screen w-full">
      <Navbar
        bookmarks={bookmarks}
        handleDeleteBookmark={handleDeleteBookmark}
        handleAddBookmark={() => setIsAddModalOpen(true)}
      />
      <div className="flex-1 p-6 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Input
            type="search"
            placeholder="Search bookmarks..."
            className="flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <FilterIcon className="w-5 h-5" />
                <span className="sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setSortBy("title")}>
                <AArrowUpIcon className="w-4 h-4 mr-2" />
                Sort by title
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("createdAt")}>
                <ArrowDownWideNarrowIcon className="w-4 h-4 mr-2" />
                Sort by date added
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                {viewMode === "grid" ? (
                  <>
                    <LayoutGridIcon className="w-5 h-5" />
                    <span className="sr-only">Grid view</span>
                  </>
                ) : (
                  <>
                    <ListIcon className="w-5 h-5" />
                    <span className="sr-only">List view</span>
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setViewMode("grid")}>
                <LayoutGridIcon className="w-4 h-4 mr-2" />
                Grid view
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewMode("list")}>
                <ListIcon className="w-4 h-4 mr-2" />
                List view
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <BookmarkList
          bookmarks={filteredBookmarks}
          viewMode={viewMode}
          handleEditBookmark={(id, updates) => {
            setEditingBookmark(
              bookmarks.find((bookmark) => bookmark.id === id)
            );
            handleEditBookmark(id, updates);
          }}
          handleDeleteBookmark={handleDeleteBookmark}
          handleToggleFavorite={handleToggleFavorite}
        />
      </div>
      <AddEditBookmarkModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddBookmark}
      />
      {editingBookmark && (
        <AddEditBookmarkModal
          isOpen={true}
          onClose={() => setEditingBookmark(null)}
          onSubmit={(updates) =>
            handleEditBookmark(editingBookmark.id, updates)
          }
          initialValues={editingBookmark}
        />
      )}
    </div>
  );
}
