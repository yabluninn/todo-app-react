/* eslint-disable react/prop-types */

import "../../../styles/home/widgets/HomeNoteWidget.css"; // Подключаем CSS
import { Link } from "react-router-dom";
import HomeNote from "./HomeNote";
import NothingHere from "../../ui/NothingHere";
import { useListsContext } from "../../../contexts/ListsContext";

import {useTranslation} from "react-i18next";

export default function HomeNoteWidget() {
  const { getRecentNotes } = useListsContext();
  const { t } = useTranslation();

  const notes = getRecentNotes();

  return (
      <div className="home-note-widget">
        <div className="h-header">
          <p className="title">{t("recent-notes")}</p>
          <Link to={"/app/notes"} className="view-all-link">
              {t("view-all")}
          </Link>
        </div>
        <div className="note-container">
          {notes.length === 0 && <NothingHere icon={"fa-solid fa-note-sticky"} />}
          {notes.length > 0 &&
              notes.map((note) => <HomeNote key={note._id} note={note} />)}
        </div>
      </div>
  );
}
