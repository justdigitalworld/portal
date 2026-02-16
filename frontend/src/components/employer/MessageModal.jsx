import { useState, useEffect, useRef } from 'react';
import { FaTimes, FaPaperPlane, FaImage } from 'react-icons/fa';
import api from '../../utils/api';

const MessageModal = ({ isOpen, onClose, applicationId, applicantName }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showImageInput, setShowImageInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen && applicationId) {
            fetchMessages();
        }
    }, [isOpen, applicationId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const { data } = await api.get(`/applications/${applicationId}/messages`);
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() && !imageUrl.trim()) return;

        setLoading(true);
        try {
            const payload = {
                content: newMessage || 'Sent an image',
                messageType: imageUrl ? 'image' : 'text',
                imageUrl: imageUrl || undefined
            };
            const { data } = await api.post(`/applications/${applicationId}/messages`, payload);
            setMessages([...messages, data]);
            setNewMessage('');
            setImageUrl('');
            setShowImageInput(false);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col h-[600px] overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-primary-600 text-white">
                    <div>
                        <h3 className="text-xl font-bold">Chat with {applicantName}</h3>
                        <p className="text-sm opacity-80">Direct Communication</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
                    {messages.length === 0 ? (
                        <div className="text-center text-slate-400 mt-10">
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender.role === 'employer' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.sender.role === 'employer'
                                    ? 'bg-primary-600 text-white rounded-tr-none'
                                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                                    }`}>
                                    {msg.messageType === 'image' && msg.imageUrl && (
                                        <img
                                            src={msg.imageUrl}
                                            alt="Message attachment"
                                            className="max-w-full h-auto rounded-lg mb-2 cursor-pointer hover:opacity-90"
                                            onClick={() => window.open(msg.imageUrl, '_blank')}
                                        />
                                    )}
                                    <p className="text-sm">{msg.content}</p>
                                    <p className={`text-[10px] mt-1 ${msg.sender.role === 'employer' ? 'text-white/70' : 'text-slate-400'}`}>
                                        {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Image Input (Toggleable) */}
                {showImageInput && (
                    <div className="px-4 py-2 border-t bg-slate-50">
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Enter image URL..."
                            className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
                        />
                    </div>
                )}

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
                    <div className="flex space-x-2">
                        <button
                            type="button"
                            onClick={() => setShowImageInput(!showImageInput)}
                            className={`p-3 rounded-xl transition-colors ${showImageInput ? 'bg-primary-100 text-primary-600' : 'text-slate-400 hover:bg-slate-100'}`}
                        >
                            <FaImage size={20} />
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-primary-600 outline-none"
                        />
                        <button
                            type="submit"
                            disabled={loading || (!newMessage.trim() && !imageUrl.trim())}
                            className="bg-primary-600 text-white p-3 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50"
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MessageModal;
