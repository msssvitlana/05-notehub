import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import NoteModal from "../NoteModal/NoteModal";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Loader from "../Loader/Loader";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce<string>(query, 1000);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const {
    data,
 
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["Notes", debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleModalOpen = (): void => setModalOpen(true);
  const handleModalClose = (): void => setModalOpen(false);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleQueryChange = (value: string): void => {
    setQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleQueryChange} value={query} />
        {isLoading && <Loader />}
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}
        <button className={css.button} onClick={handleModalOpen}>
          Create note +
        </button>
      </header>

      {isError && (
        <p className={css.loaderror}>
          An error occurred: {(error as Error).message}, please reload the page!
        </p>
      )}

    {isSuccess && data?.notes?.length > 0 && <NoteList notes={data.notes} />}


      {modalOpen && (
        <NoteModal
          onClose={handleModalClose}
          onSuccess={() => {
            refetch();
            handleModalClose();
          }}
        />
      )}
    </div>
  );
}
