/* eslint-disable react/prop-types */
import {stringExtensions} from "../../../utils/string-extensions.js";
import {useState} from "react";
import {Link} from "react-router-dom";
import {ACCOUNT_TYPES} from "../../../constants/account-types.js";
import "../../../styles/navigation/NavUser.css"

import { useTranslation } from "react-i18next";

export default function NavUser({ user }) {
  const [isHovered, setIsHovered] = useState(false);

  const DEFAULT_APP_URL = "/app";

  const { t } = useTranslation();

  const formattedUsername = stringExtensions.sliceWithDots(user.username, 15);

  if (!user) {
    return null;
  }

  return (
      <Link
          to={DEFAULT_APP_URL + "/profile"}
          className="nav-user"
          style={{ cursor: isHovered ? "pointer" : "default" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        <i className="hgi hgi-stroke hgi-user nav-user-icon"></i>
        <div className="nav-user-info">
          <p className="nav-user-name">{formattedUsername}</p>
          <p className="nav-user-account">{ACCOUNT_TYPES.FREE} {t("account")}</p>
        </div>
      </Link>
  );
}
