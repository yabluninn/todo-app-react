import "./Header.css";
// import CreateTaskButton from "./ui/CreateTaskButton";
import CurrentDate from "./util/CurrentDate";
import Greetings from "./util/Greetings";

export default function Header() {
  return (
    <>
      <div className="header">
        <div className="h-labels-block">
          <Greetings username={"Artem"} />
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
          <button className="h-menu-button">
            {/* <i class="fa-solid fa-sort-up"></i> */}
            {/* <i class="fa-solid fa-sort-down"></i> */}
            <i className="fa-solid fa-sort"></i>
          </button>
          <button className="h-menu-button">
            <i className="fa-solid fa-filter"></i>
          </button>
          <button className="h-menu-button">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </>
  );
}
