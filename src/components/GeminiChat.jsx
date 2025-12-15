import { useState, useEffect } from "react";
import { getGeminiResponse } from "../utils/text";

const GeminiChat=()=>{
  const [chats,setChats]=useState(()=>JSON.parse(localStorage.getItem("chats")||"[]"));
  const [activeId,setActiveId]=useState(null);
  const [input,setInput]=useState("");
  const [typing,setTyping]=useState(false);
  const [showSettings,setShowSettings]=useState(false);
  const [apiKey,setApiKey]=useState(localStorage.getItem("GEMINI_API_KEY")||"");

  const activeChat=chats.find(c=>c.id===activeId);

  useEffect(()=>{localStorage.setItem("chats",JSON.stringify(chats));},[chats]);

  const ensureChat=()=>{
    if(activeChat) return activeChat.id;
    const chat={id:Date.now(),title:"New Chat",messages:[]};
    setChats(p=>[chat,...p]);
    setActiveId(chat.id);
    return chat.id;
  };

  const send=async()=>{
    if(!input.trim()||typing) return;
    const text=input; setInput(""); setTyping(true);
    const chatId=ensureChat();

    setChats(p=>p.map(c=>c.id===chatId?{...c,messages:[...c.messages,{role:"user",text}]}:c));

    const reply=await getGeminiResponse(text);
    let current="";

    for(const ch of reply){
      current+=ch;
      setChats(p=>p.map(c=>
        c.id===chatId
          ?{...c,messages:[...c.messages.filter(m=>m.role!=="assistant"),{role:"assistant",text:current}],title:c.title==="New Chat"?text.slice(0,28):c.title}
          :c
      ));
      await new Promise(r=>setTimeout(r,8));
    }
    setTyping(false);
  };

  const newChat=()=>{const chat={id:Date.now(),title:"New Chat",messages:[]};setChats(p=>[chat,...p]);setActiveId(chat.id);};
  const saveApiKey=()=>{apiKey.trim()?localStorage.setItem("GEMINI_API_KEY",apiKey.trim()):localStorage.removeItem("GEMINI_API_KEY");setShowSettings(false);};

  return(
    <div className="flex h-screen bg-white overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-72 border-r bg-gray-50 flex flex-col p-4">
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-[#4D2E64]">Gemini Desk</h1>
          <p className="text-xs text-gray-500">AI Workspace</p>
        </div>

        <button onClick={newChat} className="mb-4 py-2.5 rounded-lg bg-purple-600 text-white text-sm hover:bg-purple-700 transition">
          + New Chat
        </button>

        <div className="border-t pt-3 mb-2 text-xs font-semibold text-gray-400">RECENT CHATS</div>

        <div className="flex-1 space-y-1 overflow-y-auto">
          {chats.map(c=>(
            <div key={c.id} onClick={()=>setActiveId(c.id)} className={`px-3 py-2 rounded-lg cursor-pointer text-sm transition ${c.id===activeId?"bg-purple-100 text-purple-700":"hover:bg-gray-100"}`}>
              {c.title}
            </div>
          ))}
        </div>

        <div className="border-t pt-3 text-xs text-gray-400">Powered by Gemini</div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <header className="flex items-center justify-between px-6 py-3 border-b">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#4D2E64]">Effortless Support</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">Online</span>
          </div>
          <button onClick={()=>setShowSettings(true)} className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm hover:bg-purple-700 transition">
            API Settings
          </button>
        </header>

        {/* EMPTY STATE */}
        {!activeChat&&(
          <div className="flex-1 flex flex-col items-center text-center pt-10">
            <div className="w-20 h-20 mb-6">
              <img src="https://cdn.dribbble.com/userupload/22752596/file/original-79ef8f1017847bb6be620e07b03c2bb0.gif" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-3xl font-bold text-[#824b9c]">Effortless Support, Anytime</h2>
            <p className="mt-2 text-lg text-gray-500 max-w-md">
              Providing Seamless Assistance to Employees, Every Step of the Way
            </p>
            <button onClick={newChat} className="mt-6 px-6 py-3 rounded-xl bg-purple-600 text-white">
              Start New Chat
            </button>
            <div className="mt-10 w-full max-w-sm space-y-3">
              <QuickCard title="Company Policy" icon="https://img.icons8.com/?size=100&id=2UdOcs6ysdJo&format=png&color=AB5CC9"/>
              <QuickCard title="Document Finder" icon="https://img.icons8.com/?size=100&id=QxNDCQCA0COh&format=png&color=AB5CC9"/>
            </div>
          </div>
        )}

        {/* CHAT */}
        {activeChat&&(
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeChat.messages.map((m,i)=>(
              <div key={i} className={`flex ${m.role==="user"?"justify-end":"justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line ${m.role==="user"?"bg-purple-600 text-white rounded-br-md":"bg-gray-100 text-gray-800 rounded-bl-md"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing&&<div className="text-sm text-gray-400">Gemini is typing…</div>}
          </div>
        )}

        {/* INPUT */}
        <div className="border-t p-8">
          <div className="flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type message" className="flex-1 px-4 py-2 border rounded-xl"/>
            <button onClick={send} className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm">Send</button>
          </div>
        </div>
      </div>

      {/* SETTINGS */}
      {showSettings&&(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 w-full max-w-sm mx-4">
            <h3 className="font-semibold mb-2">API Settings</h3>
            <input value={apiKey} onChange={e=>setApiKey(e.target.value)} className="w-full p-2 border rounded text-sm"/>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={()=>setShowSettings(false)} className="text-sm">Cancel</button>
              <button onClick={saveApiKey} className="px-4 py-1.5 bg-purple-600 text-white text-sm rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const QuickCard=({title,icon})=>(
  <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition cursor-pointer">
    <div className="flex items-center gap-4">
      <img src={icon} className="h-8 w-8" alt="" />
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </div>
    <span className="text-purple-500 text-3xl">→</span>
  </div>
);

export default GeminiChat;
