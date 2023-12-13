// Import the useSWR hook from the "swr" library
import useSWR from "swr";

// Define the API endpoint URL for fetching files
const url = "/api/my-files";

// Custom hook to fetch and manage user files using useSWR
export default function useMyFiles() {
    // Use the useSWR hook to fetch data from the specified URL
    const { data, error } = useSWR(url);

    // Return an object with the fetched files, loading state, and error state
    return {
        // Fetched files data
        files: data,
        
        // Loading state: true if data is not yet available and there are no errors
        isLoading: !error && !data,
        
        // Error state: true if there is an error fetching the data
        isError: error
    };
}
