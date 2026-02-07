export interface CastMember {
  name: string;
  role: string;
}

export interface MovieDetails {
  title: string;
  originalTitle: string;
  year: string;
  runtime: string;
  director: string;
  rating: string;
  genres: string[];
  plot: string;
  cast: CastMember[];
  boxOffice?: string;
  awards?: string;
  posterId?: number; // Used to generate consistent picsum images
}

export interface SearchState {
  query: string;
  isLoading: boolean;
  error: string | null;
  data: MovieDetails | null;
}