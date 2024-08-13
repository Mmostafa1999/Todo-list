import ReactLoading from "react-loading";
import Model from "../../comp/shared/Model";
const HomeModel = ({
  closeModel,
  titleInput,
  detailsInput,
  addBTN,
  submitBTN,
  taskTitle,
  subTask,
  array,
  showLoading,
}) => {
  return (
    <Model closeModel={closeModel}>
      <div className="home-model">
        <input
          onChange={(eo) => {
            titleInput(eo);
          }}
          type="text"
          placeholder="Add Title"
          value={taskTitle}
        />
        <div>
          <input
            onChange={(eo) => {
              detailsInput(eo);
            }}
            type="text"
            placeholder="Details"
            value={subTask}
          />
          <button
            onClick={(eo) => {
              addBTN(eo);
            }}
          >
            Add
          </button>
        </div>

        {array.map((item) => (
          <ul>
            <li key={item}>{item}</li>
          </ul>
        ))}

        <button
          onClick={async (eo) => {
            submitBTN(eo);
          }}
        >
          {showLoading ? (
            <ReactLoading
              type={"spin"}
              color={"teal"}
              height={20}
              width={20}
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </Model>
  );
};

export default HomeModel;
