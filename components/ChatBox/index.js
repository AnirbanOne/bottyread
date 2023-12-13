// Importing necessary libraries and components
import { MdSend } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ChooseFileAlert from "@/components/ChatBox/ChooseFileAlert";
import ReadyAlert from "@/components/ChatBox/ReadyAlert";
import Chat from "@/components/ChatBox/Chat";
import FileNotProcessedAlert from "@/components/ChatBox/FileNotProcessedAlert";
import NoteTaking from "../NoteTaking";
import { useRouter } from "next/router";
import supabase from "@/lib/client";

// Main ChatBox component
export default function ChatBox({ activeFile }) {
  // Ref for scrolling to the bottom of the chat window
  const divRef = useRef(null);

  // State for managing chat messages
  const [chat, setChat] = useState([]);

  // State for user input query
  const [query, setQuery] = useState();

  // State for file ID
  const [id, setId] = useState();

  // State for notes
  const [notes, setNotes] = useState([]);

  // Router instance
  const router = useRouter();

  // State for user ID
  const [userId, setUserId] = useState();

  // Function to scroll to the bottom of the chat window
  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/example');
        if (res.ok) {
          const data = await res.json();
          setUserId(data.userId); // Assuming the response has a key 'userId'
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Effect to scroll to the bottom when chat messages change
  useEffect(() => {
    scrollToBottom();
    console.log('msg added');
  }, [chat.length]);

  // Function to add a chat message
  const addChat = (query, response, id) => {
    setChat(prevState => [...prevState, {
      query,
      response,
    }]);

    setQuery(query);
    setId(id);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = e.target.query.value;
    const id = e.target.id.value;

    e.target.query.value = null;

    console.log(query, id);
    addChat(query, null, id);
  };

  // Function to update the last chat message
  const updateLastChat = (query, response) => {
    console.log("--old chat--", chat);
    const oldChats = [...chat];
    oldChats.pop();
    console.log(oldChats);
    setChat([...oldChats, {
      query,
      response,
    }]);
  };

  // Effect to fetch chat response when there is a query
  useEffect(() => {
    const fetchChatResponse = async () => {
      let response = await fetch("/api/query", {
        method: 'POST',
        body: JSON.stringify({ query, id }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        response = await response.json();
        updateLastChat(query, response.response);
      } else {
        response = await response.json();
        toast.error(response.message);
      }
    };

    if (query) {
      fetchChatResponse().then(() => console.log('response received'));
    }
  }, [query]);

  // Function to handle taking notes
  const handleTakeNotes = async () => {
    if (query && chat.length > 0 && chat[chat.length - 1].response) {
      const response = chat[chat.length - 1].response;

      // Insert data into the Supabase table
      const { data, error } = await supabase.from('paperbot').insert([
        { user_id: userId, text: response },
      ]);

      if (error) {
        console.error('Error inserting data into Supabase:', error.message);
        toast.error('Failed to store data in Supabase.');
      } else {
        // Redirect to the NoteTakingPage with the notes
        router.push({
          pathname: '/notetaking',
        });
        toast.success('Note added successfully');
      }
    } else {
      toast.error('No response to add as a note.');
    }
  };

  // JSX for rendering the ChatBox component
  return (
    <div className={"border h-full flex flex-col"}>
      {/* Header section */}
      <div className={"flex flex-col border text-center py-1 bg-[#ef8e38] text-white"}>
        {activeFile ? activeFile.fileName : "Choose a file to start chatting"}
      </div>

      {/* Main chat area */}
      <div className={"border p-3 grow flex flex-col justify-end h-[calc(100vh-270px)]"}>
        {activeFile
          ? !activeFile.isProcessed
            ? <FileNotProcessedAlert id={activeFile._id}/>
            : chat.length > 0
              ? <div ref={divRef} className={"overflow-auto"}>
                {
                  chat.map(({ query, response }, index) => (
                    <Chat key={index} query={query} response={response}/>
                  ))
                }
                <div ref={divRef}/>
              </div>
              : <ReadyAlert/>
          : <ChooseFileAlert/>
        }
      </div>

      {/* "Take notes" button */}
      <button
        onClick={handleTakeNotes}
        className="m-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
        disabled={!query || !chat.length || !chat[chat.length - 1].response}
      >
        Take notes
      </button>

      {/* Form for user input */}
      <form onSubmit={handleSubmit}>
        <div className={"border p-3 flex justify-between items-center space-x-2"}>
          <input name={'query'} className={"w-full m-0 outline-0"} placeholder={"Type here..."}/>
          <input name={'id'} value={activeFile ? activeFile._id : ''} hidden readOnly/>
          <button
            type="submit"
            className="inline-block rounded-full p-1 text-primary-main outline-0">
            <MdSend size={24}/>
          </button>
        </div>
      </form>
    </div>
  );
}
