import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/YinkaBot.css';
import ReactMarkdown from 'react-markdown';

function YinkaBot() {
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const responseRef = useRef(null);

    const toggleBot = () => {
        setOpen(prev => !prev);
        setResponse('');
        setDisplayedText('');
        setQuestion('');
    };

    // ask Yinka a question...
    const askQuestion = async (e) => {
        e.preventDefault();
        // if question is empty, do nothing...
        if (!question.trim()) return;

        // render typing indicator
        setIsTyping(true);
        setResponse('');
        setDisplayedText('');

        try {
            // send question to backend to get response from OpenAI
            const res = await axios.post('http://localhost:3001/ask', { question });
            setResponse(res.data.response);
        } catch (err) {
            setResponse("Oops, something went wrong.");
            console.error(err);
        } finally {
            setIsTyping(false);
        }
    };

    // render response text character by character
    // This creates a typing effect for the response text.
    useEffect(() => {
        if (!response) return;
    
        let index = -1;
        const interval = setInterval(() => {
            if (index < response.length) {
                setDisplayedText((prev) => prev + response.charAt(index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 25); // speed
    
        return () => clearInterval(interval);
    }, [response]);

    // Auto-scroll response area as text types
    useEffect(() => {
        if (responseRef.current) {
            responseRef.current.scrollTop = responseRef.current.scrollHeight;
        }
    }, [displayedText]);

    return (
        <>
            <div className="yinka-icon" onClick={toggleBot} />
            {open && (
                <div className="yinka-popup">
                    <h4>Hi, I’m Yinka, your AI Assistant 👋</h4>
                    <form onSubmit={askQuestion}>
                        <textarea
                            className="yinka-textarea"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Ask a question..."
                        />
                        <button type="submit">Send</button>
                    </form>

                    <div className="yinka-response" ref={responseRef}>
                        {isTyping ? (
                            <p className="typing-indicator">Yinka is typing...</p>
                        ) : (
                            <ReactMarkdown>{displayedText}</ReactMarkdown>
                        )}
                    </div>

                    <button className="close-btn" onClick={toggleBot}>✖</button>
                </div>
            )}
        </>
    );
}

export default YinkaBot;
