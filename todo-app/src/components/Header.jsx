import "./Header.css";
// import CreateTaskButton from "./ui/CreateTaskButton";
import CurrentDate from "./util/CurrentDate";

export default function Header() {
  return (
    <>
      <div className="header">
        <div className="h-labels-block">
          <p className="h-main-label">Good Morning, Artem! 👋</p>
          <p className="h-sub-label">
            Today, <CurrentDate />
          </p>
        </div>
        <div className="h-buttons-block">
          <div className="h-dropdown">
            <button className="h-dropdown-button">
              <i className="fa-solid fa-chevron-down"></i>Today
            </button>
            <div className="h-dropdown-content">
              <a href="#">Option 1</a>
              <a href="#">Option 2</a>
              <a href="#">Option 3</a>
              <a href="#">Option 4</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
