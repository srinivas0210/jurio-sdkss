import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// external components and constants
import Contacts from "../Contacts/Contacts";
import { constants, baseUrl } from "../../constants";
import FloatButton from "../FloatButton/FloatButton";
import { setContacts, setCurrentUser } from "../../Store/Actions/Actions";

// Models
import State from "../../Models/state";
import Contact from "../../Models/Contact";

// style imports
import "./Home.css";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const contacts = useSelector((state: State) => state.contacts);

  const [selectedUser, setSelectedUser] = useState<Contact | null>(null);

  useEffect(() => {
    fetch(`${baseUrl}/contacts`)
      .then((response) => response.json())
      .then((contactsData) => dispatch(setContacts(contactsData)));
  }, []);

  const handleSelectedUser = (contact: Contact) => setSelectedUser(contact);

  const redirectToConversations = () => {
    if (!selectedUser) {
      alert(constants.errorSelectAUser);
      return;
    }
    localStorage.setItem("currentUserId", JSON.stringify(selectedUser.id));
    dispatch(setCurrentUser(selectedUser));
    history.push(`/conversations`);
  };

  return (
    <div className="Home flex">
      <div className="home-header flex">{constants.authenticateText}</div>
      <Contacts
        contacts={contacts}
        selectedUser={selectedUser}
        handleSelectedUser={handleSelectedUser}
      />

      <FloatButton
        text={constants.continue}
        handleClick={redirectToConversations}
      />
    </div>
  );
};

export default Home;
