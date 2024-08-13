import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";

const AllTasksSection = ({ user }) => {
  const {  i18n } = useTranslation();

  const allTasks = query(collection(db, user.uid), orderBy("id"));
  const compeletedTasks = query(
    collection(db, user.uid),
    where("compeleted", "==", true)
  );

  const notcompeletedTasks = query(
    collection(db, user.uid),
    where("compeleted", "==", false)
  );
  const [initialData, setinitialData] = useState(allTasks);
  const [value, loading, error] = useCollection(initialData);

  const [isFullOpacity, setisFullOpacity] = useState(false);

  const [selectValue, setselectValue] = useState("aaa");

  if (error) {
    return <h1>ERROR: {error.message}</h1>;
  }

  if (loading) {
    return (
      <section className="mttt">
        <ReactLoading type={"spin"} color={"teal"} height={77} width={77} />
      </section>
    );
  }

  if (value) {
    return (
      <div>
        {/* OPIONS (filtered data) */}
        <section
          style={{ justifyContent: "center" }}
          className="parent-of-btns flex mtt"
        >
          {selectValue === "aaa" && (
            <div>
              <button
                style={{ opacity: isFullOpacity ? "1" : "0.3" }}
                onClick={(params) => {
                  setisFullOpacity(true);
                  setinitialData(
                    query(collection(db, user.uid), orderBy("id", "desc"))
                  );
                }}
              >
                {i18n.language === "fr" && "Le plus récent d'abord"}
                {i18n.language === "en" && "Newest first"}
                {i18n.language === "ar" && "الأحدث أولاً"}
              </button>

              <button
                style={{ opacity: isFullOpacity ? "0.3" : "1" }}
                onClick={(params) => {
                  setisFullOpacity(false);
                  setinitialData(
                    query(collection(db, user.uid), orderBy("id", "asc"))
                  );
                }}
              >
                {i18n.language === "fr" && "Le plus ancien en premier"}
                {i18n.language === "en" && "Oldest first"}
                {i18n.language === "ar" && "الأقدم أولا"}
              </button>
            </div>
          )}

          <select
            style={{ alignSelf: "flex-end" }}
            value={selectValue}
            onChange={(eo) => {
              if (eo.target.value === "aaa") {
                setisFullOpacity(false);
                setselectValue("aaa");
                setinitialData(allTasks);
              } else if (eo.target.value === "bbb") {
                setselectValue("bbb");
                setinitialData(compeletedTasks);
              } else if (eo.target.value === "ccc") {
                setselectValue("ccc");
                setinitialData(notcompeletedTasks);
              }
            }}
          >
            <option value="aaa">
              {i18n.language === "fr" && "Toutes les tâches"}
              {i18n.language === "en" && "All Tasks"}
              {i18n.language === "ar" && "كل المهام"}
            </option>
            <option value="bbb">
              {i18n.language === "fr" && "Complété"}
              {i18n.language === "en" && "Completed"}
              {i18n.language === "ar" && "مكتمل "}
            </option>
            <option value="ccc"> 
            {i18n.language === "fr" && "Pas achevé"}
              {i18n.language === "en" && "Not Completed "}
              {i18n.language === "ar" && "غير مكتمل"}
            </option>
          </select>
        </section>

        <section dir="auto" className="flex all-tasks mt">
          {value.docs.length === 0 && (
                  i18n.language === "fr" ? <h1>Félicitations ! Vous avez accompli vos tâches ♥</h1> :
                  i18n.language === "en" ? <h1>Congratulations! You have completed your tasks ♥</h1> :
                 <h1>مبروك لقد أكملت مهامك ♥</h1> 
          )}

          {value.docs.map((item) => {
            return (
              <article key={item.data().id} dir="auto" className="one-task">
                <Link className="task-link" to={`/edit-task/${item.data().id}`}>
                  <h2> {item.data().title} </h2>
                  <ul>
                    {item.data().details.map((item, index) => {
                      if (index < 2) {
                        return <li key={item}> {item} </li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>

                  <p className="time">
                    <Moment fromNow date={item.data().id} />
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </div>
    );
  }
};

export default AllTasksSection;
