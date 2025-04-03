import { createPortal } from "react-dom";
import { useListsContext } from "../../contexts/ListsContext";
import { useState } from "react";

import InputWithLabel from "../ui/InputWithLabel";
import TextAreaWithLabel from "../ui/TextAreaWithLabel";
import TaskPriorityDropdown from "../ui/TaskPriorityDropdown";
import ListDropdown from "../ui/ListDropdown";
import { LIST_TYPES } from "../../constants/list-types";
import CreateButton from "../ui/CreateButton.jsx";
import SelectRelatedNoteModal from "./SelectRelatedNoteModal.jsx";

import "../../styles/modals/CreateTaskModal.css";

export default function CreateTaskModal({ onClose }) {
  const root = document.getElementById("root");
  const { addTask } = useListsContext();

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskStartTime, setTaskStartTime] = useState("");
  const [taskEndTime, setTaskEndTime] = useState("");
  const [taskPriority, setTaskPriority] = useState("none");
  const [selectedList, setSelectedList] = useState(-1);
  const [relatedNote, setRelatedNote] = useState(null);
  const [showSelectNoteModal, setShowSelectNoteModal] = useState(false);

  const handleAddTask = () => {
    if (
        taskName.trim() === "" ||
        taskDate.trim() === "" ||
        taskStartTime.trim() === "" ||
        taskEndTime.trim() === "" ||
        selectedList === -1
    ) {
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      date: taskDate,
      startTime: taskStartTime,
      endTime: taskEndTime,
      priority: taskPriority.toLowerCase(),
      listId: selectedList,
      relatedNoteId: relatedNote?._id || null,
    };

    addTask(newTask, selectedList);
    onClose();
  };

  return createPortal(
      <div className="modal-container">
        <div className="modal">
          <div className="modal-header">
            <p className="modal-title">Create new task</p>
            <button className="modal-close-button" onClick={onClose}>
              <i className="hgi-stroke hgi-cancel-01 modal-close-icon"></i>
            </button>
          </div>
          <div className="modal-content">
            <InputWithLabel
                icon="hgi-stroke hgi-text-font"
                type="text"
                placeholder="Enter task name"
                label="Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <TextAreaWithLabel
                icon="hgi-stroke hgi-text-firstline-left"
                placeholder="Enter task description"
                label="Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            />
            <div className="modal-input-block">
              <InputWithLabel
                  icon={"hgi-stroke hgi-calendar-01"}
                  type="date"
                  label="Date"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
              />
              <div className="time-inputs">
                <InputWithLabel
                    icon={"hgi-stroke hgi-clock-03"}
                    type="time"
                    label="From"
                    value={taskStartTime}
                    onChange={(e) => setTaskStartTime(e.target.value)}
                />
                <InputWithLabel
                    icon={"hgi-stroke hgi-clock-02"}
                    type="time"
                    label="To"
                    value={taskEndTime}
                    onChange={(e) => setTaskEndTime(e.target.value)}
                />
              </div>
            </div>
            <div className="time-inputs">
              <TaskPriorityDropdown onChange={setTaskPriority} />
              <ListDropdown
                  onChange={setSelectedList}
                  listType={LIST_TYPES.TASK_LIST}
              />
            </div>
            {relatedNote ? (
                <div className="related-note">
                  <p>Related Note: {relatedNote.name}</p>
                  <button className="change-note-button" onClick={() => setShowSelectNoteModal(true)}>
                    Change Related Note
                  </button>
                </div>
            ) : (
                <CreateButton
                    title={"Add Related Note"}
                    onClick={() => setShowSelectNoteModal(true)}
                />
            )}
          </div>
          <div className="modal-footer">
            <button className="add-task-button" onClick={handleAddTask}>
              Create Task
            </button>
          </div>
        </div>
        {showSelectNoteModal && (
            <SelectRelatedNoteModal
                onClose={() => setShowSelectNoteModal(false)}
                onSelect={(note) => {
                  setRelatedNote(note);
                  setShowSelectNoteModal(false);
                }}
            />
        )}
      </div>,
      root
  );
}