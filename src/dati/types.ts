export type Categoria = {
  id: number;
  nome: string;
};

export type SottoCategoria = {
  id: number;
  nome: string;
  idCategoria: number;
};

export type Libro = {
  id: number;
  titolo: string;
  autore: string;
  descrizione: string | null;
  voto: number | null;
  stato: 0 | 1;
  idCategoria: number | null;
  idSottoCategoria: number | null;
};

export type LibroCard = {
  id: number;
  nomeLibro: string;
  autore: string;
  nomeCategoria: string | null;
  nomeSottoCategoria: string | null;
  voto: number | null;
};

export type Commento = {
  id: number;
  data: string;
  testo: string;
  idLibro: number;
};
