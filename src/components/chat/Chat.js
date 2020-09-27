import React, { useEffect, useState } from "react";
import "./chat.css";

import { Avatar, Button, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db, { auth } from "../../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  const loginUser = useSelector((state) => state.loginUser);
  const { user } = loginUser;

  useEffect(() => {
    if (roomId) {
      db.collection("rooms").doc(roomId).onSnapshot((snapshot) => {
        setRoomName(snapshot.data().name);
      });
      db.collection("rooms").doc(roomId).collection("messages").orderBy(
        "timestamp",
        "asc",
      ).onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const signout = () => {
    auth.signOut();
    // dispatch(login({ userCredential: null }));
    window.location.reload();
  };

  const sendMessage = (e) => {
    e.preventDefault(e);
    db.collection("rooms").doc(roomId).collection("messages").add({
      id: user.uid,
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
        />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen at ...{new Date(
              messages[messages.length - 1]?.timestamp?.toDate(),
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <Button onClick={signout}>Signout</Button>
        </div>
      </div>
      <div className="chat__body">
        {messages?.map((message, index) => (<div key={index}>
          <p
            className={`chat__message && ${message.id === user.uid &&
              "chat__reciever"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        </div>))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            placeholder="type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
