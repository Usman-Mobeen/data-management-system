import { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function App() {
  let [showPass, setShowPass] = useState(false);
  let [showPassIndex, setShowPassIndex] = useState(null);
  let [showInput, setShowInput] = useState(false);

  let [formData, setFormData] = useState({
    uname: "",
    uemail: "",
    uphone: "",
    upass: "",
    index: "",
  });
  let formValue = function getValue(event) {
    let oldValue = { ...formData };
    let inputField = event.target.name;
    let inputText = event.target.value;
    oldValue[inputField] = inputText;
    setFormData(oldValue);
  };

  let [usersData, setUsersData] = useState([]);
  let storeData = function storeData(e) {
    if (formData.index === "") {
      let doubleCheck = usersData.filter(
        (v, i) =>
          v.uemail.toLowerCase() == formData.uemail.toLowerCase() ||
          v.uphone.replace(/-/g, "") == formData.uphone.replace(/-/g, "")
      );
      if (doubleCheck.length > 0) {
        toast.warn("Email or Phone Already used");
        e.preventDefault();
      } else {
        let currentData = formData;
        setUsersData([...usersData, currentData]);
        e.preventDefault();
        setFormData({
          uname: "",
          uemail: "",
          uphone: "",
          upass: "",
          index: "",
        });
        toast.success("Data Inserted");
        setShowInput(!showInput);
      }
    } else {
      let doubleCheck = usersData.filter(
        (v, i) =>
          (v.uemail.toLowerCase() == formData.uemail.toLowerCase() ||
            v.uphone.replace(/-/g, "") == formData.uphone.replace(/-/g, "")) &&
          i != formData.index
      );
      if (doubleCheck.length > 0) {
        toast.warn("Email or Phone Already used");
        e.preventDefault();
      } else {
        let oldUsersData = usersData;
        let editedData = {
          uname: formData.uname,
          uemail: formData.uemail,
          uphone: formData.uphone,
          upass: formData.upass,
        };
        oldUsersData[formData.index] = editedData;
        setUsersData(oldUsersData);
        setFormData({
          uname: "",
          uemail: "",
          uphone: "",
          upass: "",
          index: "",
        });
        toast.success("Data Updated");
        setShowInput(!showInput);
        e.preventDefault();
      }
    }
  };

  let removedData = function removedData(deleteIndex) {
    let finalArray = usersData.filter((v, i) => deleteIndex != i);
    setUsersData(finalArray);
    toast.success(`${usersData[deleteIndex].uname}'s Data Removed`);
  };

  let addIndex = function addIndex(edit) {
    let toEdit = usersData.filter((v, index) => index == edit);
    let finalData = {
      uname: toEdit[0].uname,
      uemail: toEdit[0].uemail,
      uphone: toEdit[0].uphone,
      upass: toEdit[0].upass,
      index: edit,
    };
    setShowInput(!showInput);
    setFormData(finalData);
  };
  let getPass = function getPass() {
    setShowPass(!showPass);
  };

  return (
    <>
      <ToastContainer />

      <div className={showInput ? "back active" : ""}></div>
      <div className={showInput ? "form active" : "form"}>
        <span
          onClick={() => {
            setShowInput(!showInput);
          }}
        >
          {formData.index !== 0 ? <span>&times;</span> : ""}
        </span>
        <form onSubmit={storeData}>
          {/* <label>Username</label> */}
          <input
            onChange={formValue}
            required
            name="uname"
            type="text"
            value={formData.uname}
            placeholder="Username"
          />
          <br />
          {/* <label>Email</label> */}
          <input
            onChange={formValue}
            required
            name="uemail"
            type="text"
            value={formData.uemail}
            placeholder="Email"
          />
          <br />
          {/* <label>Number</label> */}
          <input
            onChange={formValue}
            required
            name="uphone"
            type="tel"
            value={formData.uphone}
            placeholder="Phone Number"
          />
          <br />
          {/* <label>Password</label> */}
          <div className="password">
            <input
              onChange={formValue}
              required
              name="upass"
              type={showPass ? "text" : "password"}
              value={formData.upass}
              placeholder="Password"
            />
            <div onClick={getPass}>
              {showPass ? (
                <FontAwesomeIcon className="eye" icon={faEye} />
              ) : (
                <FontAwesomeIcon className="eye" icon={faEyeSlash} />
              )}
            </div>
          </div>

          <br />
          <button type="submit">
            {formData.index === "" ? "Submit" : "Update"}
          </button>
        </form>
      </div>
      <div className="insbutton">
        <button
          onClick={() => {
            setShowInput(!showInput);
          }}
        >
          Insert Data
        </button>
      </div>

      <div className="data">
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Password</th>
              <th>Edit/Remove</th>
            </tr>
          </thead>
          <tbody>
            {usersData.length > 0 ? (
              usersData.map((obj, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{obj.uname}</td>
                    <td>{obj.uemail}</td>
                    <td>{obj.uphone}</td>
                    <td>
                      {showPassIndex === i ? (
                        <>
                          {obj.upass}
                          <FontAwesomeIcon
                            onClick={() => setShowPassIndex(null)}
                            className="eye3"
                            icon={faEye}
                          />
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon
                            onClick={() => setShowPassIndex(i)}
                            className="eye2"
                            icon={faEyeSlash}
                          />
                        </>
                      )}
                    </td>

                    <td>
                      <button
                        onClick={() => {
                          addIndex(i);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="button-2"
                        onClick={() => {
                          removedData(i);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>Please Insert Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
