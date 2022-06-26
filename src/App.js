import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
  const [listOfFrriends, setListofFriends] = useState([]);
  

  const addFriend = () => {
    axios
      .post("https://mern-rka-1.herokuapp.com/addfriend", {
        name: name,
        age: age,
        description: description,
      })
      .then((response) => {
        setListofFriends([...listOfFrriends, 
          { _id: response.data._id,
            name: name, 
            age: age,
            description: description,
          
          }]);
      });
  };

  const updateFriend = (id) => {
    const newAge = prompt("Enter the new ID of the patient: ");

    axios.put("https://mern-rka-1.herokuapp.com/update", {
      newAge: newAge,
      id:id,
    }).then(()=>{
      setListofFriends(listOfFrriends.map((val)=>{
      return val._id === id ? {_id:id, name: val.name, age: newAge , description: val.description}:val;
      }))
    }); 
  };

  const deleteFriend = (id)=>{
    axios.delete(`https://mern-rka-1.herokuapp.com/delete/${id}`)
    .then(()=>{

      setListofFriends(listOfFrriends.filter((val)=>{
        return val._id !== id;
      }))
    })
  };

  useEffect(() => {
    axios
      .get("https://mern-rka-1.herokuapp.com/read")
      .then((response) => {
        setListofFriends(response.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder=""
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        

        <input
          type="number"
          placeholder=""
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="xyxhkhj "
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <button onClick={addFriend}>Add record</button>
      </div>
      <div className="listOfFriends">
        {listOfFrriends.map((val) => {
          return (
            <div className="friendContainer">
              <div className="friend">
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Description:{val.description}</h3>
              </div>
              <button
                onClick={() => {
                  updateFriend(val._id);
                }}
              >
                Update
              </button>

              <button
              
              onClick={() => {
                deleteFriend(val._id);
              }}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
