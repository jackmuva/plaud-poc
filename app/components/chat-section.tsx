"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Textarea } from "./ui/textarea";

const ChatSection = (user: { email: string }) => {
  const [chatState, setChatState] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChatState(e.target.value);
  }

  return (
    <div className="h-[82vh] flex bg-stone-100">
      <div className="w-[70%] border-t-2 min-h-full flex flex-col overflow-y-auto">
        <div className="p-4 space-y-4 shrink-0">
          <div className="flex w-full items-start justify-between gap-4 ">
            <Textarea
              id="chat-input"
              autoFocus
              name="message"
              placeholder="Type a message"
              className="flex-1 max-h-full min-h-[500px]"
              value={chatState}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="w-[30%] h-full border-t-2 bg-stone-100">
        <Sidebar summary={chatState} user={user.email} />
      </div>
    </div >
  );
}
export default ChatSection;
