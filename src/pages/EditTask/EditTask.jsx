import "./edittask.css";

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import Loading from "../../comp/Loading";
import TitleSection from "./TitleSection";
import SubTasksSection from "./SubtaskSection";
import Btnssection from "./BtnSection";
import { useParams } from "react-router-dom";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);
  let { stringId } = useParams();
  const navigate = useNavigate();

  // ======================
  // 1- Title Section
  // ======================
  const titleInput = async (eo) => {
    await updateDoc(doc(db, user.uid, stringId), {
      // @ts-ignore
      title: eo.target.value,
    });
  };

  // ======================
  // 2- Sub-Task Section
  // ======================
  const compeletedCheckbox = async (eo) => {
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, stringId), {
        compeleted: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, stringId), {
        compeleted: false,
      });
    }
  };

  const trashIcon = async (item) => {
    await updateDoc(doc(db, user.uid, stringId), {
      details: arrayRemove(item),
    });
  };

  // ======================
  // 3- BTNs Section
  // ======================
  const [showData, setshowData] = useState(false);
  const deleteBTN = async (eo) => {
    setshowData(true);
    await deleteDoc(doc(db, user.uid, stringId));
    navigate("/", { replace: true });
  };

  if (error) {
    return <h1>Error : {error.message}</h1>;
  }

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return (
      <div>
        <Helmet>
          <title>edit task Page</title>
        </Helmet>

        <Header />

        {showData ? (
          <main>
            <ReactLoading
              type={"spin"}
              color={"teal"}
              height={77}
              width={77}
            />
          </main>
        ) : (
          <div className="edit-task">
            {/* Title */}
            <TitleSection
              user={user}
              stringId={stringId}
              titleInput={titleInput}
            />

            {/* Sub-tasks section */}
            <SubTasksSection
              user={user}
              stringId={stringId}
              compeletedCheckbox={compeletedCheckbox}
              trashIcon={trashIcon}
            />

            {/* Add-more BTN && Delete BTN */}

            <Btnssection
              user={user}
              stringId={stringId}
              deleteBTN={deleteBTN}
            />
          </div>
        )}

        <Footer />
      </div>
    );
  }
};

export default EditTask;
