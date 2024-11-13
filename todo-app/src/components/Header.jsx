import "./Header.css";
import CreateTaskButton from "./ui/CreateTaskButton";
import CurrentDate from "./util/CurrentDate";

export default function Header() {
  return (
    <>
      <div className="header">
        <p className="today-label">
          Today, <CurrentDate />
        </p>
        <CreateTaskButton />
      </div>
    </>
  );
}
