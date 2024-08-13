import React from "react";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import Loading from "react-loading";
const BtnSection = ({ user, deleteBTN, stringId }) => {
  const [value, loading, error] = useCollection(collection(db, user.uid));

  if (error) {
    return <h1>Error : {error.message}</h1>;
  }

  if (loading) {
    return <Loading />;
  }

  if (value) {
    return (
      <section className="center mt">
        <div>
          <button
            onClick={() => {
              deleteBTN();
            }}
            className="delete"
          >
            Delete task
          </button>
        </div>
      </section>
    );
  }
};

export default BtnSection;
