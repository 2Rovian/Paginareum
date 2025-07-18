import { FormEvent } from "react";

export interface Livro {
  id: string;
  title: string;
  imgURL?: string;
  pages?: string;
  category?: string;
  filePath: string;
}

export interface Book {
  book_id: number;
  created_at?: string;
  read_status: string;
  author?: string;
  title: string;
  pages?: number;
  urlPath: string;
  cover_img: string;
  category?: string;
  profile_id?: string;
  read_progress?: number;
}

export interface BookCardProps {
  book_id: number;
  created_at?: string;
  read_status: string;
  author?: string;
  title: string;
  pages?: number;
  urlPath: string;
  cover_img: string;
  category?: string;
  profile_id?: string;
  showControls?: boolean; // Mostrar 3-dots e botões (ler agora, marcar lido etc.)
  refetchBooks?: () => void;
  read_progress?: number;

}

export interface UserProfile {
  profile_id: string,
  created_at: string,
  username: string,
  avatar_url?: string
}

export interface handleAddBookProps {
  title: string;
  category: string;
  numPag: number;
  author_name: string;
  e?: FormEvent;

  profile_id: string;

  imgURL: File | null;
  pdf_File: File | null;

  // Callbacks
  setTitle: (val: string) => void;
  setCategory: (val: string) => void;
  setNumPag: (val: number | null) => void;
  setImgURL: (val: File | null) => void;
  setPdfFile: (val: File | null) => void;
  setAuthor_name: (val: string) => void;
  setLoading: (val: boolean) => void;
  // ---------

}