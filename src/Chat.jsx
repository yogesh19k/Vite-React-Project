import React, { useEffect } from "react";
import ChatRight from "./ChatRight";
import ChatLeft from "./ChatLeft";
import "./chat.css";

export default function Chat(props){
    const bottomRef = React.useRef(null);
    const [chats,setChat]=React.useState([])

    function loadData(){
        fetch('/api')
        .then(res => res.json())
        .then(data =>{
            setChat(oldData => oldData.length < data.length ? data :oldData)
        })

    }

    useEffect(()=>{
        loadData()
        const interval=setInterval(loadData,1000)
        return(()=>{
            clearInterval(interval)
        })
    },[])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [chats]);

    const chatElements = chats.map(chat => props.yourChatIds.includes(chat.id) ? 
        <ChatRight
        key={chat.id}
        content={chat.content}
        img={`data:image/png;base64,${chat.img}`}
        />
        :
        <ChatLeft
        key={chat.id}
        content={chat.content}
        img={`data:image/png;base64,${chat.img}`}
        />
    )


    function handelReload(){
        setChat([{
            id:"K5w1C2Lyrndo1ngw8ZSlm",
            img:"",
            content:"hello how is this working",
            selfMsg:true,
        }])
    }

    return(
        <main className="Chat--group">
            {chatElements}
        <div ref={bottomRef} />
        </main>
    )
}