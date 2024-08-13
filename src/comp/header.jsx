import { NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [user] = useAuthState(auth);
  const { t, i18n } = useTranslation();

  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="myheader ">
      <header className="hide-when-mobile navbar-bg ">
        <h1>
          <a className="logo" href="/">
            Todo List
          </a>
        </h1>

        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>

        <ul className="flex">
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                Sign-in
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
                Sign-up
              </NavLink>
            </li>
          )}

          {user && (
            <li class="main-list lang">
              <p>{t("lang")}</p>
              <ul className="lang-box">
                <li
                  dir="rtl"
                  onClick={() => {
                    i18n.changeLanguage("ar");
                  }}
                >
                  <p>العربية</p>
                  {i18n.language === "ar" && (
                    <i className="fa-solid fa-check"></i>
                  )}
                </li>
                <li
                  onClick={() => {
                    i18n.changeLanguage("en");
                  }}
                >
                  <p>English</p>
                  {i18n.language === "en" && (
                    <i className="fa-solid fa-check"></i>
                  )}
                </li>
                <li
                  onClick={() => {
                    i18n.changeLanguage("fr");
                  }}
                >
                  <p>French</p>
                  {i18n.language === "fr" && (
                    <i className="fa-solid fa-check"></i>
                  )}
                </li>
              </ul>
            </li>
          )}

          {user && (
            <li
              onClick={() => {
                signOut(auth)
                  .then(() => {})
                  .catch((error) => {
                    // An error happened.
                  });
              }}
              className="main-list"
            >
              <button className="main-link btn">{t("signout")}</button>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/about">
              {t("support")}
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/profile">
              {t("account")}
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
