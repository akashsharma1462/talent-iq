import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

let client = null;

export const initializeStreamClient = async (user, token) => {
  if (!apiKey) {
    throw new Error("Stream API key is missing");
  }

  // reuse client if same user
  if (client && client?.user?.id === user.id) {
    return client;
  }

  if (client) {
    await disconnectStreamClient();
  }

  client = new StreamVideoClient({
    apiKey,
    user,
    token,
  });

  return client;
};

export const disconnectStreamClient = async () => {
  if (client) {
    try {
      await client.disconnectUser();
      client = null;
    } catch (error) {
      console.error("Error disconnecting Stream client:", error);
    }
  }
};