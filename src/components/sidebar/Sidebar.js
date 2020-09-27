import React, { useEffect, useState } from "react";
import "./sidebar.css";

import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from "../sidebar-chat/SidebarChat";

import db from "../../firebase";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);

  const loginUser = useSelector((state) => state.loginUser);
  const { user } = loginUser;

  useEffect(() => {
    if (rooms) {
      db.collection("rooms").onSnapshot((snapshot) => {
        setRooms(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })));
      });
    } else {
      setRooms([]);
    }
  }, [rooms]);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} alt={user?.dispayName} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatBubbleIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat
            key={room.id}
            id={room.id}
            room={room}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
