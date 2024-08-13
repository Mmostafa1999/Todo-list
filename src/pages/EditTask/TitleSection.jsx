import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import React, { useRef } from "react";
import Loading from "react-loading";
const TitleSection = ({ user, stringId, titleInput }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));

  const inputElement = useRef(null);

  if (error) {
    return <h1>Error : {error.message}</h1>;
  }

  if (loading) {
    return <Loading />;
  }

  if (value) {
    return (
      <section className="title center">
        <h1>
          <input
            style={{
              textDecoration: value.data().compeleted
                ? "line-through wavy #454545"
                : null,
            }}
            onChange={async (eo) => {
              titleInput(eo);
            }}
            ref={inputElement}
            defaultValue={value.data().title}
            className="title-input center"
            type="text"
          />
          <i
            onClick={() => {
              inputElement.current.focus();
            }}
            className="fa-solid fa-pen-to-square"
          ></i>
        </h1>
      </section>
    );
  }
};

export default TitleSection;
