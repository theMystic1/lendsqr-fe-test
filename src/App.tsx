// import { SupervisedUserCircleTwoTone } from "@mui/icons-material";
import AddAPhotoTwoToneIcon from "@mui/icons-material/AddAPhotoTwoTone";
// import { Settings } from "@mui/icons-material";

function App() {
  return (
    <main className="">
      <div className="nav"></div>
      <div className="side-nav"></div>
      {/* <button className="btn--primary">btn</button>
      <button className="btn--secondary">btn</button>
      <button className="btn--outline">btn</button>
      <button className="btn--pending">btn</button>
      <button className="btn--danger">btn</button>
      <button className="btn--active">btn</button> */}

      <div className="main-body">
        <div className="input">
          <input />
        </div>
        <div className="card ">
          <div className="card__header">
            <div>
              <h3 className="card__title">Profile</h3>
              <p className="card__subtitle">Updated today</p>
            </div>
            <button className="btn btn--secondary">Edit</button>
          </div>
          <div className="card__body">{/* content */}</div>
          <div className="card__footer">
            <button className="btn btn--outline">Cancel</button>
            <button className="btn btn--primary">Save</button>
          </div>
          <div className="card__header">
            <div className="card__icon card__icon--active">
              <AddAPhotoTwoToneIcon />
            </div>
            <div>Pending Approval</div>
          </div>
          <div className="card__header">
            <div className="card__icon card__icon--savings">
              <AddAPhotoTwoToneIcon />
            </div>
            <div>Pending Approval</div>
          </div>
          <div className="card__header">
            <div className="card__icon card__icon--users">
              <AddAPhotoTwoToneIcon />
            </div>
            <div>Pending Approval</div>
          </div>
          <div className="card__header">
            <div className="card__icon card__icon--loans">
              <AddAPhotoTwoToneIcon />
            </div>
            <div>Pending Approval</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
