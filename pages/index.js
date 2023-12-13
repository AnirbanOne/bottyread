// Importing necessary components, hooks, and styles
import FileUpload from "@/components/FileUpload";
import MyFiles from "@/components/MyFiles";
import Intro from "@/components/Intro";
import ChatBox from "@/components/ChatBox";
import { useState } from "react";
import useMyFiles from "@/apiHooks/useMyFiles";
import Head from 'next/head';

// Home component for rendering the main page
export default function Home() {
    // State for managing the active file
    const [activeFile, setActiveFile] = useState();

    // Custom hook to fetch user files
    const { files, isError, isLoading } = useMyFiles();

    // Loading state check
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    // JSX for rendering the Home component
    return (
        <>
            {/* Head component for updating the title of the page */}
            <Head>
                <title>BottyRead - Chat with my PDF</title>
            </Head>
            {/* Main content */}
            <main className={`w-full h-screen`}>
                <div className={"max-w-5xl mx-auto "}>
                    {/* Branding */}
                    <h1
                        className={"inline-block text-transparent px-5 lg:px-0 bg-clip-text py-4 text-3xl font-bold bg-gradient-to-r from-[#108dc7] to-[#ef8e38] font-squarePeg"}
                    >
                        BottyRead
                    </h1>
                    <div className={"mt-5 px-5 lg:px-0 h-[calc(100vh-170px)] min-h-[calc(100vh-170px)]"}>
                        {/* Main content grid */}
                        <div className={"grid lg:grid-cols-2 gap-8 h-[inherit]"}>
                            {/* Left column */}
                            <div>
                                {/* Introduction section */}
                                <Intro />
                                {/* File upload component */}
                                <FileUpload />
                                {/* User files component */}
                                <MyFiles setActiveFile={setActiveFile} files={files} />
                            </div>
                            {/* Right column */}
                            <div>
                                {/* ChatBox component */}
                                <ChatBox activeFile={activeFile} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
