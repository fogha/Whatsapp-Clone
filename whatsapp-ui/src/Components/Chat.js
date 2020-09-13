import React, { useState } from "react";
import "./chat.css";
import { Avatar, IconButton, Icon } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFIle from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SelectInput from "@material-ui/core/Select/SelectInput";
import MicNoneIcon from "@material-ui/icons/MicNone";

export default function Chat({ messages }) {
  const [input, setInput] = useState(" ");

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFIle />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={` chat__message ${
              message.received && "chat__receiver"
            } `}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <div className="chat__footerLeft">
          <InsertEmoticonIcon />
          <IconButton>
            <AttachFIle />
          </IconButton>
        </div>

        <form>
          <input
            type="text"
            // value={input}
            // onChange={(e) => SelectInput(e.target.value)}
            placeholder="Type a message..."
          />
          {/* <button type="submit">Send a message</button> */}
        </form>
        <IconButton>
          <MicNoneIcon />
        </IconButton>
      </div>
    </div>
  );
}
