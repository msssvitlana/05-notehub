import axios from "axios";
import type { Note, NewNoteData, NotesResponse } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api/notes/";
const NOTES_PER_PAGE = 12;

const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.interceptors.request.use((config) => {
  if (myToken) {
    config.headers.Authorization = `Bearer ${myToken}`;
  }
  return config;
});

export async function fetchNotes(query: string, page: number): Promise<NotesResponse> {
  try {
    const params = {
      page,
      perPage: NOTES_PER_PAGE,
      ...(query.trim() && { search: query.trim() }),
    };

    const response = await axios.get<NotesResponse>(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw new Error("Failed to fetch notes. Please try again later.");
  }
}

export async function removeNote(id: string): Promise<Note> {
  try {
    const response = await axios.delete<Note>(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw new Error("Failed to delete note. Please try again later.");
  }
}

export async function createNote(note: NewNoteData): Promise<Note> {
  try {
    const response = await axios.post<Note>(API_URL, note);
    return response.data;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw new Error("Failed to create note. Please try again later.");
  }
}
