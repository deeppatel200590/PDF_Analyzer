import react from 'react';
import axios from 'axios';
import { useState } from 'react';

const Content = () => {

    const[file, setFile] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState('');

    const sendquestion = async(e) => {
        e.preventDefault();
        if(question.trim() === '') return;
        setMessages([...messages, { sender: 'user', text: question }]);
        setQuestion('');
        const res = await axios.post('http://localhost:3000/chat', { question });
        setMessages((prev)=>[...prev, { sender: 'ai', text: res.data.answer }]);
    }

    const send = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        // Handle form submission logic here
        const res  = await axios.post('http://localhost:3000/upload', formData);
        if(res.data.message == 'success'){
            setIsUploaded(true);
        }
    }

    return (
        <div className="flex-1 flex flex-col justify-center items-center overflow-auto">
        {isUploaded ? (
            <div className="w-full h-full flex flex-col">

                <div className="flex-1 overflow-y-auto">

                    {messages.map((msg, index) => (
                        <div key={index}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className='w-full p-4'>
                    <form onSubmit={sendquestion} className='flex items-center'>
                        <input
                            type="text"
                            placeholder="Ask anything about your PDF..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="border rounded px-3 py-2 w-8/9"
                        />

                        <button className='rounded bg-blue-700 text-xl p-2 w-1/10 ml-2'>Send</button>
                    </form>
                </div>

            </div>
            ) : (
                <div>
                    <h1 className="text-3xl font-bold mb-6">
                    Upload Your PDF Document
                </h1>

                <form className="flex flex-col items-center gap-4" onSubmit={send}>
                    <input
                        type="file"
                        accept=".pdf"
                        className="border p-2 rounded"
                        onChange={(e) => setFile(e.target.files[0])}
                        />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                        >
                        Upload
                    </button>
                </form>
                </div>
            )}
        </div>
    );
};

export default Content;