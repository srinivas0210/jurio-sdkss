import React   from "react";

import SvgProfile from "../../Assets/Profile";
import Contact from "../../Models/Contact";

// style imports
import "./Contacts.css";

interface ContactsProps {
  contacts: Contact[];
  selectedUser: Contact | null;
  handleSelectedUser(contact: Contact): void;
}

const Contacts: React.FunctionComponent<ContactsProps> = ({
  contacts,
  selectedUser,
  handleSelectedUser,
}) => {
  return (
    <div className="home-contacts flex">
      {contacts.length
        ? contacts.map((contact: Contact) => {
            return (
              <div
                className={`contact-item flex ${
                  selectedUser && selectedUser.id === contact.id
                    ? "highlight-user"
                    : ""
                }`}
                onClick={() => handleSelectedUser(contact)}
              >
                <div className="avatar flex">
                  <div className="avatar-inner-div">
                    <SvgProfile rootClass="profile-avatar" color={"primary"} />
                  </div>
                </div>
                <div className="name">{contact.name}</div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Contacts;
