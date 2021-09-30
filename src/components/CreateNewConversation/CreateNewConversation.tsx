import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";

import {
  setContacts,
  setCurrentUser,
  setCurrentConversation,
} from "../../Store/Actions/Actions";
import SvgProfile from "../../assets/profile";
import { constants, baseUrl } from "../../constants";
import FloatButton from "../FloatButton/FloatButton";


// Models
import State from "../../Models/state";
import Contact from "../../Models/Contact";

// style imports
import "./CreateNewConversation.css";

const CreateNewConversation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const contacts = useSelector((state: State) => state.contacts);
  const currentUser = useSelector((state: State) => state.currentUser);
  const currentUserId: string = localStorage.getItem("currentUserId") || '';

  const [selectedUser, setSelectedUser] = useState<Contact | null>(null);
  const [title, setTitle] = useState<string>("");
  const [newGroupMembers, setNewGroupMembers] = useState<Contact[]>([]);
  const [newGroupMembersId, setNewGroupMembersId] = useState<number[]>([]);

  useEffect(() => {
    if (!contacts.length) {
      fetch(`${baseUrl}/contacts`)
        .then((response) => response.json())
        .then((contactsData) => dispatch(setContacts(contactsData)));
    }
  }, [contacts]);

  const addGroupMembersToTheNewConvo = (contact: Contact) => {
    if (newGroupMembersId.includes(contact.id)) {
      const removedElement = newGroupMembers.filter(
        (member: Contact) => member.id !== contact.id
      );

      const removedElementId = newGroupMembersId.filter(
        (memberId) => memberId !== contact.id
      );

      setNewGroupMembers(removedElement);
      setNewGroupMembersId(removedElementId);
      return;
    }

    setNewGroupMembers([...newGroupMembers, contact]);
    setNewGroupMembersId([...newGroupMembersId, contact.id]);
  };
  const createNewConversation = () => {
    if (!title || !newGroupMembersId.length) {
      alert(constants.errorMessageTextForNewConversation);
      return;
    }
    const requestOptions: any = {
      method: "POST",
      headers: {
        user_id: JSON.parse(currentUserId),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, contact_ids: newGroupMembersId }),
    };

    fetch(`${baseUrl}/conversations`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('currentConvoTitle',JSON.stringify(title))
        history.push(`/conversations/${data.id}`);
      });
  };

  return (
    <div className="CreateNewConversation">
      <div className="new-converstation-header flex">
        {constants.newConversationText}
      </div>
      <div className="new-converstation-contacts flex">
        {contacts.length
          ? contacts
              .filter((contact: Contact) => contact.id !== JSON.parse(currentUserId))
              .map((contact: Contact) => {
                return (
                  <div
                    className={`contact-item flex ${
                      newGroupMembersId.includes(contact.id)
                        ? "highlight-user"
                        : ""
                    }`}
                    onClick={() => addGroupMembersToTheNewConvo(contact)}
                  >
                    <div className="avatar flex">
                      <div className="avatar-inner-div">
                        <SvgProfile
                          rootClass="profile-avatar"
                          color={"primary"}
                        />
                      </div>
                    </div>
                    <div className="name">{contact.name}</div>
                  </div>
                );
              })
          : null}
      </div>
      <div className="chat-input">
        <TextField
          className="chat-input"
          hiddenLabel
          id="filled-hidden-label-small"
          placeholder="Jot something Down"
          variant="filled"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <FloatButton
        text={constants.create}
        handleClick={createNewConversation}
      />
    </div>
  );
};

export default CreateNewConversation;
