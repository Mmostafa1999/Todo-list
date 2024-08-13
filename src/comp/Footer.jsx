import React from "react";
import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { i18n } = useTranslation();

  if (i18n.language === "ar") {
    return (
      <div className="myfooter">
        <footer dir="rtl" className="navbar-bg">
          تم تصميمه وتطويره بواسطة محمود دردير
        </footer>
      </div>
    );
  } else if (i18n.language === "en") {
    return (
      <div className="myfooter">
        <footer className="navbar-bg">
          Designed and developed by Mahmoud Dardier
        </footer>
      </div>
    );
  } else if (i18n.language === "fr") {
    return (
      <div className="myfooter">
        <footer className="navbar-bg">Conçu et développé par Mahmoud Dardier </footer>
      </div>
    );
  }
};

export default Footer;
