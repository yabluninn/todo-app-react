import { useState } from "react";
import HomeHeader from "../layout/home/HomeHeader";
import HomeTasksWidget from "../layout/home/HomeTasksWidget";
import "../../styles/home/Home.css";
import VerticalTimeline from "../layout/app/VerticalTimeline";
import HomeNoteWidget from "../layout/home/HomeNoteWidget";
import CreateTaskModal from "../modals/CreateTaskModal";
import CreateNoteModal from "../modals/CreateNoteModal";
import { useListsContext } from "../../contexts/ListsContext";
import HomeTasksAnalyticsWidget from "../layout/home/HomeTasksAnalyticsWidget.jsx";
import HomeRecentTaskCompletionWidget from "../layout/home/HomeRecentTaskCompletionWidget.jsx";
import {useTranslation} from "react-i18next";

export default function Home() {
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [isCreateNoteModalOpen, setCreateNoteModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Today");

  const { getTasksByPeriod } = useListsContext();
  const { t } = useTranslation();
  const tasks = getTasksByPeriod(selectedPeriod);


  const openCreateTaskModal = () => setCreateTaskModalOpen(true);
  const closeCreateTaskModal = () => setCreateTaskModalOpen(false);

  const openCreateNoteModal = () => setCreateNoteModalOpen(true);
  const closeCreateNoteModal = () => setCreateNoteModalOpen(false);

  return (
      <div className="home-container">
        <HomeHeader
            onOpenCreateTaskModal={openCreateTaskModal}
            onOpenCreateNoteModal={openCreateNoteModal}
            onChangePeriod={setSelectedPeriod}
        />
        <div className="page-app-container">
          <div className="page-app-widgets"
               style={selectedPeriod !== "Today" ? {width: "100%"} : {}}
          >
            <HomeTasksWidget selectedPeriod={selectedPeriod}/>
            <HomeNoteWidget/>
            <HomeTasksAnalyticsWidget selectedPeriod={selectedPeriod}/>
            <HomeRecentTaskCompletionWidget selectedPeriod={selectedPeriod}/>
          </div>
            {selectedPeriod === "Today" && (
                <div className="home-day-overview">
                    <p className="home-day-overview-title">Day Overview</p>
                    <VerticalTimeline tasks={tasks || []} />
                </div>
            )}
        </div>
        {isCreateTaskModalOpen && <CreateTaskModal onClose={closeCreateTaskModal} />}
        {isCreateNoteModalOpen && <CreateNoteModal onClose={closeCreateNoteModal} />}
      </div>
  );
}
