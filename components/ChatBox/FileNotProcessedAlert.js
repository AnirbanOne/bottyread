// Importing the 'toast' notification library and 'useState' hook from React
import toast from "react-hot-toast";
import { useState } from "react";

// Definition of a reusable button component 'PillButton'
const PillButton = ({ func, disabled }) => (
    <button
        // Event handler for button click
        onClick={func}
        className="ml-2 bg-blue-500 hover:bg-primary-main text-xs text-white font-bold py-1 px-2 rounded-full disabled:bg-primary-light disabled:cursor-not-allowed"
    >
        {/* Display appropriate text based on the 'disabled' prop */}
        {disabled ? "Processing file.." : "Process File"}
    </button>
);

// React component for displaying an alert to process a file
export default function FileNotProcessedAlert({ id }) {
    // State to manage the processing state
    const [processing, setProcessing] = useState(false);

    // Function to trigger file processing
    const trigger = async (id) => {
        // Set processing state to true
        setProcessing(true);

        // Fetch data from the "/api/process" endpoint using POST method
        let response = await fetch("/api/process", {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        // Check if the response is successful or not
        if (response.ok) {
            // Parse the successful response and show success message
            response = await response.json();
            toast.success(response.message);
        } else {
            // Parse the error response and show error message
            response = await response.json();
            toast.error(response.message);
        }

        // Set processing state back to false after processing is complete
        setProcessing(false);
    };

    // JSX for rendering the file processing alert component
    return (
        <div className="bg-orange-100 border-t-4 border-orange-500 rounded-b text-orange-900 px-4 py-3 shadow-md" role="alert">
            <p className="font-bold">Process File</p>
            <p>
                Please process the file before starting to chat. Click button to process
                {/* Render the 'PillButton' component with appropriate props */}
                <PillButton func={() => trigger(id)} disabled={processing} />
            </p>
        </div>
    );
}
