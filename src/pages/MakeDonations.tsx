import { useState } from "react";
import "../form.css";

const apiKey = import.meta.env.VITE_MAIL_SEND;

const MakeDonations = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendEmail = () => {
    (window as any).Email.send({
      SecureToken: apiKey, // Replace with your SMTP.js token
      To: "waringachristine01@gmail.com",
      From: "oddsthingshere@gmail.com", // Replace with your email
      Subject: "Nuria Donations",
      Body: `${formData.name} at ${formData.email},${formData.phone} want to make a donation`,
    }).then((response: any) => console.log(response));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendEmail();
    alert(
      `Thank you ${formData.name} for your interest in making donations . We will contact you as soon as we can to complete the process.`
    );
  };

  return (
    <>
      <h2>Interested in making a donation?</h2>
      <p>
        Thank you for considering donating your uniform to us. Your generosity
        will help those in need and make a difference in their lives. Please
        fill out the form below so we can contact you and proceed with the
        donation process.
      </p>
      <form className="uniform-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default MakeDonations;
