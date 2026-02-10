import {
    Categoria,
    SottoCategoria,
    Libro,
    LibroCard,
    Commento,
} from "./types";

export interface LibriRepository {
    inizializzaDB(): Promise<void>;

    // Inserimento
    inserisciLibro(libro: Omit<Libro, "id">): Promise<void>;
    inserisciCategoria(nome: string): Promise<void>;
    inserisciSottoCategoria(nome: string, idCategoria: number): Promise<void>;
    creaCommento(testo: string, idLibro: number): Promise<void>;

    // Eliminazione
    eliminaCategoria(id: number, tipo: number): Promise<void>;
    eliminaLibro(idLibro: number): Promise<void>;
    eliminaCommenti(ids: number[]): Promise<void>;

    // Lettura
    getCategorie(): Promise<Categoria[]>;
    getSottoCategorie(idCategoria: number): Promise<SottoCategoria[]>;
    getLibriPerCard(stato: number): Promise<LibroCard[]>;
    getLibroById(id: number): Promise<Libro | null>;
    getLibroModId(id: number): Promise<Libro | null>;
    getCommentiLibro(idLibro: number): Promise<Commento[]>;

    // Extra
    contaLibriLetti(): Promise<number>;
    aggiornaLibro(libro: Libro): Promise<void>;
}
