import { useState } from "react";

import "../../styles/notes/Notes.css";

import NoteListContainer from "../layout/notes/NoteListContainer";
import CreateNoteModal from "../modals/CreateNoteModal";
import CreateButton from "../ui/CreateButton";
import NoteSideSection from "../layout/notes/NoteSideSection";
import { useListsContext } from "../../contexts/ListsContext";
import {useTranslation} from "react-i18next";

export default function Notes() {
  const [isCreateNoteModalOpen, setCreateNoteModalOpen] = useState(false);
  const [isNoteSideMenuOpen, setNoteSideMenuOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const { noteLists } = useListsContext();
  const { t } = useTranslation();

  const openCreateNoteModal = () => setCreateNoteModalOpen(true);
  const closeCreateNoteModal = () => setCreateNoteModalOpen(false);

  const handleEditNote = (note) => {
    if (!note) {
      console.error("Note is undefined");
      return;
    }
    setSelectedNote(note);
    setNoteSideMenuOpen(true);
  };

  const closeNoteSideMenu = () => {
    setNoteSideMenuOpen(false);
    setSelectedNote(null);
  };

  console.log("Note lists: ", noteLists);

  return (
    <div className="page-container">
      <div className="tasks-header">
        <div>
          <p className="t-header-title">Notes</p>
          <p className="t-header-subtitle">
            Here you can manage all your notes
          </p>
        </div>
      </div>
      <CreateButton title={"New Note"} onClick={openCreateNoteModal} />
      {noteLists &&
        noteLists.map((list) => (
          <NoteListContainer
            key={list._id}
            list={list}
            onNoteSideOpen={handleEditNote}
          />
        ))}
      {isCreateNoteModalOpen && (
        <CreateNoteModal onClose={closeCreateNoteModal} />
      )}
      {isNoteSideMenuOpen && selectedNote && (
        <NoteSideSection
          note={selectedNote}
          onClose={closeNoteSideMenu}
        />
      )}
    </div>
  );
}
