/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import EditInput from "../../ui/EditInput";
import EditPriorityDropdown from "../../ui/EditPriorityDropdown";
import EditTextArea from "../../ui/EditTextArea";
import { useListsContext } from "../../../contexts/ListsContext";
import SelectRelatedNoteModal from "../../modals/SelectRelatedNoteModal.jsx";

import "../../../styles/tasks/TaskSideSection.css"

export default function TaskSideSection({ task, onClose }) {
  const { getTaskListById, updateTask, getNoteById } = useListsContext();

  const [newTaskName, setNewTaskName] = useState(task.name || "");
  const [newStartTime, setNewStartTime] = useState(task.startTime || "");
  const [newEndTime, setNewEndTime] = useState(task.endTime || "");
  const [newTaskDate, setNewTaskDate] = useState(task.date || "");
  const [newTaskPriority, setNewTaskPriority] = useState(task.priority || "none");
  const [newTaskDescription, setNewTaskDescription] = useState(task.description || "");
  const [relatedNoteId, setRelatedNoteId] = useState(task.relatedNoteId || null);
  const [relatedNote, setRelatedNote] = useState(null);
  const [showSelectNoteModal, setShowSelectNoteModal] = useState(false);

  useEffect(() => {
    setNewTaskName(task.name || "");
    setNewStartTime(task.startTime || "");
    setNewEndTime(task.endTime || "");
    setNewTaskPriority(task.priority || "none");
    setNewTaskDescription(task.description || "");
    setRelatedNoteId(task.relatedNoteId || null);

    if (task.date) {
      const formattedDate = new Date(task.date).toISOString().split("T")[0];
      setNewTaskDate(formattedDate);
    } else {
      setNewTaskDate("");
    }

    if (task.relatedNoteId) {
      const note = getNoteById(task.relatedNoteId);
      setRelatedNote(note || null);
    } else {
      setRelatedNote(null);
    }
  }, [task, getNoteById]);


  const saveTask = () => {
    const formattedDate = newTaskDate
        ? new Date(newTaskDate).toISOString().split("T")[0]
        : "";

    const updatedTask = {
      name: newTaskName,
      startTime: newStartTime,
      endTime: newEndTime,
      date: formattedDate,
      priority: newTaskPriority,
      description: newTaskDescription,
      listId: task.listId,
      completed: task.completed ?? false,
      relatedNoteId: relatedNoteId,
    };

    console.log("🔹 Данные перед отправкой в updateTask:", updatedTask);

    updateTask(task._id, updatedTask);
    onClose();
  };

  const handleRemoveRelatedNote = () => {
    setRelatedNoteId(null);
    setRelatedNote(null);
  };

  const list = getTaskListById(task.listId);
  const listName = list ? list.name : "Unknown List";

  return (
      <div className="task-side-container">
        <div className="task-side-content">
          <div className="task-side-header">
            <div className="task-side-header-subblock">
              <i className="hgi-stroke hgi-arrow-right-double task-side-header-icon"></i>
              <p className="task-side-header-listname">{listName}</p>
            </div>
            <button className="task-side-close-button" onClick={onClose}>
              <i className="hgi-stroke hgi-cancel-01 task-side-close-icon"></i>
            </button>
          </div>
          <EditInput
              type="text"
              placeholder="Task name..."
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
          />
          <div className="task-side-info-block">
            <div className="task-side-info-subblock">
              <EditInput
                  type="time"
                  placeholder=""
                  value={newStartTime}
                  onChange={(e) => setNewStartTime(e.target.value)}
                  width={"100%"}
              />
              <p className="task-side-info-label">Start time</p>
            </div>
            <div className="task-side-info-subblock">
              <EditInput
                  type="time"
                  placeholder=""
                  value={newEndTime}
                  onChange={(e) => setNewEndTime(e.target.value)}
                  width={"100%"}
              />
              <p className="task-side-info-label">Due time</p>
            </div>
            <div className="task-side-info-subblock">
              <EditInput
                  type="date"
                  placeholder=""
                  value={newTaskDate}
                  onChange={(e) => setNewTaskDate(e.target.value)}
                  width={"100%"}
              />
              <p className="task-side-info-label">Due date</p>
            </div>
          </div>
          <div className="task-side-info-block">
            <div className="task-side-info-subblock">
              <EditPriorityDropdown
                  onChange={setNewTaskPriority}
                  width={"100%"}
                  defaultValue={task.priority}
              />
              <p className="task-side-info-label">Priority</p>
            </div>
          </div>
          <div className="task-side-info-subblock">
            <EditTextArea
                placeholder={"Task description..."}
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <p className="task-side-info-label">Description</p>
          </div>
          <div className="task-side-info-block">
            <div className="task-side-info-subblock">
              {relatedNote ? (
                  <div className="task-side-related-note">
                    <p>{relatedNote.name}</p>
                    <button className="task-side-remove-note-button" onClick={handleRemoveRelatedNote}>
                      Remove
                    </button>
                  </div>
              ) : (
                  <button className="task-side-add-note-button" onClick={() => setShowSelectNoteModal(true)}>
                    + Add Related Note
                  </button>
              )}
              <p className="task-side-info-label">Related Note</p>
            </div>
          </div>
          <button className="task-side-save-button" onClick={saveTask}>
            Save
          </button>
        </div>
        {showSelectNoteModal && (
            <SelectRelatedNoteModal
                onClose={() => setShowSelectNoteModal(false)}
                onSelect={(note) => {
                  setRelatedNoteId(note._id);
                  setRelatedNote(note);
                  setShowSelectNoteModal(false);
                }}
            />
        )}
      </div>
  );
}