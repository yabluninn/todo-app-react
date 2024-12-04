/* eslint-disable react/prop-types */
import { useState } from "react";
import { useListsContext } from "../../contexts/ListsContext";
import { Link } from "react-router-dom";

export default function ListDropdown({ onChange }) {
  const [selectedList, setSelectedList] = useState("Select a list");
  const [isListVisible, setListVisible] = useState(false);

  const { taskLists } = useListsContext();

  const handleSelect = (list) => {
    setSelectedList(list.name);
    onChange(list.id); // Передаём ID списка
  };

  const toggleVisibility = () => {
    setListVisible(!isListVisible);
  };

  return (
    <div style={styles.container}>
      <p style={styles.label}>
        <i className="hgi-stroke hgi-folder-02"></i>Select List
      </p>
      <div style={styles.dropdownContainer}>
        <div style={styles.selectedItem} onClick={toggleVisibility}>
          {selectedList}
          <i
            className={
              isListVisible
                ? "hgi-stroke hgi-arrow-up-01"
                : "hgi-stroke hgi-arrow-down-01"
            }
            style={styles.dropdownIcon}
          ></i>
        </div>
        <ul
          style={{
            ...styles.dropdownList,
            display: isListVisible ? "block" : "none",
          }}
        >
          {taskLists.length === 0 && (
            <Link to={"/app/lists"} style={styles.newListButton}>
              <i
                className="hgi-stroke hgi-add-01"
                style={{ marginRight: "6px" }}
              ></i>
              New List
            </Link>
          )}
          {taskLists.length > 0 &&
            taskLists.map((list) => (
              <li
                key={list.id}
                style={{
                  ...styles.dropdownItem,
                  fontWeight: list.name === selectedList ? "bold" : "normal",
                }}
                onClick={() => handleSelect(list)}
              >
                <div
                  style={{
                    ...styles.listColorIcon,
                    backgroundColor: list.color || "grey",
                  }}
                ></div>
                {list.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "450px",
    marginBottom: "16px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  dropdownContainer: {
    width: "100%",
    height: "40px",
    border: "2px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  selectedItem: {
    padding: "8px 12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "40px",
  },
  dropdownIcon: {
    fontSize: "18px",
  },
  dropdownList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    position: "absolute",
    width: "100%",
    maxHeight: "160px",
    overflowY: "auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    zIndex: 10,
  },
  dropdownItem: {
    padding: "8px 12px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listColorIcon: {
    width: "10px",
    height: "10px",
    borderRadius: "3px",
    marginRight: "8px",
  },
  newListButton: {
    justifySelf: "center",
    width: "95%",
    height: "30px",
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: "18px",
    paddingRight: "18px",
    color: "black",
    border: "2px dashed #bbb",
    background: "#eee",
    marginTop: "4px",
    marginBottom: "4px",
    textDecoration: "none",
  },
};
