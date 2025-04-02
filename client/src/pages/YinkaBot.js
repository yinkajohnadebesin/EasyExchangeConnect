import React, { useState } from 'react';
import axios from 'axios';
import '../css/YinkaBot.css';

function YinkaBot() {
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');

    const toggleBot = () => {
        setOpen(prev => !prev);
        setResponse('');
        setQuestion('');
    };

    const askQuestion = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        try {
            const res = await axios.post('http://localhost:3001/ask', { question });
            setResponse(res.data.response);
        } catch (err) {
            setResponse("Oops, something went wrong.");
            console.error(err);
        }
    };

    return (
        <>
            <div className="yinka-icon" onClick={toggleBot} />
            {open && (
                <div className="yinka-popup">
                    <h4>Hi, I’m Yinka 👋</h4>
                    <p>Ask me anything about EasyExchangeConnect.</p>
                    <form onSubmit={askQuestion}>
                        <textarea
                            className="yinka-textarea"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Ask a question..."
                        />
                        <button type="submit">Send</button>
                    </form>
                    {response && <div className="yinka-response">{response}</div>}
                    <button className="close-btn" onClick={toggleBot}>✖</button>
                </div>
            )}
        </>
    );
    
}

export default YinkaBot;