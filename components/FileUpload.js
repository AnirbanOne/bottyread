import { useState } from 'react';
import toast from "react-hot-toast";

// Component for uploading PDF files
export default function FileUpload() {
    // State to manage the selected file
    const [file, setFile] = useState();
    
    // State to manage the uploading state
    const [uploading, setUploading] = useState(false);

    // Event handler for file input change
    const handleFileChange = (e) => {
        if (e.target.files) {
            let file = e.target.files[0];

            // Check if the file type is PDF
            if (file.type !== 'application/pdf') {
                toast.error('Only PDF files are allowed');
                e.target.value = null;
                return;
            }
            setFile(file);
        }
    };

    // Event handler for upload button click
    const handleUploadClick = async () => {
        // Check if a file is selected
        if (!file) {
            return;
        }

        // Set uploading state to true
        setUploading(true);

        // Create a FormData object and append the file to it
        const formData = new FormData();
        formData.append('file', file);

        // Upload the file using the fetch API to the server
        let response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        // Check if the response is successful or not
        if (response.ok) {
            response = await response.json();
            toast.success(response.message);
        } else {
            response = await response.json();
            toast.error(response.message);
        }

        // Set uploading state back to false
        setUploading(false);
    };

    // JSX for rendering the FileUpload component
    return (
        <div className="mb-3">
            <div>
                {/* Label for file input */}
                <label
                    htmlFor="formFile"
                    className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                >
                    Upload a PDF File
                </label>
                {/* File input */}
                <input
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file"
                    id="formFile"
                    onChange={handleFileChange}
                />
            </div>

            <div className={"text-right py-2"}>
                {/* Upload button */}
                <button
                    type="button"
                    onClick={handleUploadClick}
                    disabled={uploading}
                    className="inline-block rounded bg-primary-main px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-sm transition duration-150 ease-in-out hover:bg-primary-dark hover:shadow-md focus:bg-primary-dark active:bg-primary-light disabled:bg-primary-light disabled:cursor-not-allowed"
                >
                    {/* Display appropriate text based on uploading state */}
                    {uploading ? 'Please wait...' : 'Upload'}
                </button>
            </div>
        </div>
    );
}
