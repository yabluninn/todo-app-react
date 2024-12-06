class NoteService {
  sortedNotes = (noteList) =>
    noteList.notes.sort((a, b) => {
      const dateA = new Date(a.creationDate);
      const dateB = new Date(b.creationDate);
      return dateB - dateA;
    });
}

export const noteService = new NoteService();
