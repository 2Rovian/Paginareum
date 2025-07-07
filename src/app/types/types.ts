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
  created_at: string;
  read_status: string;
  author?: string;
  title: string;
  pages?: number;
  urlPath: string;
  cover_img: string;
  category?: string;
  profile_id: string;
}

export interface UserProfile {
  profile_id: string,
  created_at: string,
  username: string,
  avatar_url?: string
}
