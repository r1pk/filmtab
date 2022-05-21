import { useSelector, useDispatch } from 'react-redux';

import { sendMessage, clearChat } from '../redux/actions';

import Chat from '../components/Chat';

const ChatContainer = (props) => {
  const messages = useSelector((store) => store.chat.messages);
  const dispatch = useDispatch();

  const handleSendMessage = (content) => {
    dispatch(sendMessage(content));
  };

  const handleClearChat = () => {
    dispatch(clearChat());
  };

  return <Chat messages={messages} onSendMessage={handleSendMessage} onClearChat={handleClearChat} {...props} />;
};

export default ChatContainer;
