import React from "react";
import { useForm } from "react-hook-form";
import GmailImage from "../assets/images/Gmail.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const sendEmail = async (data) => {
    try {
      const res = await fetch(
        "https://contact-form-ts5m.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const responseData = await res.json();

      if (res.status === 201) {
        alert("✅ Email sent successfully!");
        reset();
      } else {
        throw new Error(responseData.message || "Something went wrong");
      }
    } catch (error) {
      alert(`❌ ${error.message}`);
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
          <Form className="mt-2 col-lg-6" onSubmit={handleSubmit(sendEmail)}>
            {/* Email Field */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </Form.Group>

            {/* Message Field */}
            <Form.Group className="mb-3" controlId="formBasicPosition">
              <Form.Label>Enter your message</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter text message"
                {...register("text", { required: "Message is required" })}
              />
              {errors.text && (
                <p className="text-danger">{errors.text.message}</p>
              )}
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Home;
