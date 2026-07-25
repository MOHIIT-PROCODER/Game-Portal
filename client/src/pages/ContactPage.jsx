import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit trigger
    setSubmitted(true);
  };

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1 className="section-title" style={{ fontSize: "32px" }}>
          Contact Support
        </h1>
        <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
          Have feedback, bugs reports, or game requests? Fill out the contact
          form below and we will get back to you!
        </p>

        {submitted ? (
          <div
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.05)",
              border: "1px solid rgba(16, 185, 129, 0.15)",
              borderRadius: "var(--radius-md)",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "48px" }}>📬</span>
            <h3
              style={{
                marginTop: "12px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Thank You!
            </h3>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              Your feedback has been submitted successfully. We will check it
              shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "var(--text-secondary)",
                }}
              >
                Name
              </label>
              <input
                type="text"
                required
                className="search-input"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  padding: "12px 16px",
                  width: "100%",
                }}
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "var(--text-secondary)",
                }}
              >
                Email
              </label>
              <input
                type="email"
                required
                className="search-input"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  padding: "12px 16px",
                  width: "100%",
                }}
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "var(--text-secondary)",
                }}
              >
                Message
              </label>
              <textarea
                required
                rows={5}
                className="search-input"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  padding: "12px 16px",
                  width: "100%",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
                placeholder="What can we help you with?"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="play-button"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "var(--radius-md)",
                border: "none",
              }}
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </MainLayout>
  );
}

export default ContactPage;
