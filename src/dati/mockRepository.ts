import { LibriRepository } from "./repository";
import {
    Categoria,
    SottoCategoria,
    Libro,
    LibroCard,
    Commento,
} from "./types";

export const mockLibriRepository: LibriRepository = {
    async inizializzaDB() {
        return;
    },

    async inserisciLibro() {
        return;
    },

    async inserisciCategoria() {
        return;
    },

    async inserisciSottoCategoria() {
        return;
    },

    async creaCommento() {
        return;
    },

    async eliminaCategoria() {
        return;
    },

    async eliminaLibro() {
        return;
    },

    async eliminaCommenti() {
        return;
    },

    async getCategorie(): Promise<Categoria[]> {
        return [];
    },

    async getSottoCategorie(): Promise<SottoCategoria[]> {
        return [];
    },

    async getLibriPerCard(): Promise<LibroCard[]> {
        return [];
    },

    async getLibroById(): Promise<Libro | null> {
        return null;
    },

    async getLibroModId(): Promise<Libro | null> {
        return null;
    },

    async getCommentiLibro(): Promise<Commento[]> {
        return [];
    },

    async contaLibriLetti(): Promise<number> {
        return 0;
    },

    async aggiornaLibro() {
        return;
    },
};
