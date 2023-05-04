export const useChatState = () => {
  const chatWindow = useState("chatWindow", () => false);
  const chatInitiated = useState("chatInitiated", () => false);

  return {
    chatWindow,
    chatInitiated,
  };
};
