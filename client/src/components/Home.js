import React, { useState } from "react";
import GmailImage from "../assets/images/Gmail.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Home = () => {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    
   try
   {
      const res = await fetch("http://localhost:8006/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          text,
        }),
      });
      const data = await res.json();
      
      if(res.status===201)
      {
         setMessage("✅ Email sent successfully!");
         setEmail("");
         setText("");
      }
      else{
        throw new Error(data.message || "something went wrong");
      }
      
   }
   catch(error)
   {
     setMessage(`❌ ${error.message}`);
      
    
   }
   finally{
    setLoading(false);
   }
    
  };

  return (
    <>
      <div className="container mt-2">
        <div className="d-flex justify-content-center">
          <h2>Send with React & NodeJs</h2>
          <img
            src={GmailImage}
            alt="Gmail logo"
            className="mx-3"
            style={{ width: "50px" }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Form className="mt-2 col-lg-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter your Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPosition">
              <Form.Label>Enter your message</Form.Label>
              <Form.Control
                as="textarea"
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text message"
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={sendEmail}>
              {loading ? "sending..." : "Send"}
            </Button>

            {message && (
              <p
                className="mt-3"
                style={{ color: message.startsWith("✅") ? "green" : "red" }}
              >
                {message}
              </p>
            )}
          </Form>
        </div>
      </div>
    </>
  );
};

export default Home;
