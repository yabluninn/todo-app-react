/* eslint-disable react/prop-types */
import "../styles/landing/LandingNavButton.css";

export default function LandingNavButton({ title, isDropdown }) {
  return (
    <button className="lnb-button">
      {title}
      {isDropdown && (
        <i
          className="hgi-stroke hgi-arrow-down-01"
          style={{ marginLeft: "8px", fontWeight: "bold" }}
        ></i>
      )}
    </button>
  );
}
