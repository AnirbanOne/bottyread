import { PineconeClient } from "@pinecone-database/pinecone";

const pinecone = new PineconeClient();

export const initialize = async () => {
  await pinecone.init({
    environment: process.env.NEXT_PUBLIC_PDB_ENV,
    apiKey: process.env.NEXT_PUBLIC_PDB_KEY,
  });
  console.log('pinecone initialized')
}

export default pinecone