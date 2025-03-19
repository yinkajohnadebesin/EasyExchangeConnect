import React, { useState } from "react";
import axios from "axios";

const FAQs = () => {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        if (!question.trim()) return;
        
        setLoading(true);
        setResponse(""); 

        try {
            const res = await axios.post("http://localhost:3001/ask", { question });
            setResponse(res.data.response);
        } catch (error) {
            console.error("Error:", error);
            setResponse("Error getting response. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>FAQs - Ask ChatGPT</h1>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question..."
                style={{ padding: "10px", width: "300px" }}
            />
            <button onClick={handleAsk} style={{ marginLeft: "10px", padding: "10px 20px" }}>
                Ask
            </button>
            
            {loading && <p>Loading...</p>}

            {response && (
                <div style={{ marginTop: "20px", fontSize: "18px" }}>
                    <strong>Answer:</strong> {response}
                </div>
            )}
        </div>
    );
};

export default FAQs;
