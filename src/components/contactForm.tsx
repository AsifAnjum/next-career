"use client";
import { Button } from "./ui/button";

const ContactForm = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Full Name"
          autoComplete="false"
          className="contact__form_input"
          name="name"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email_address" className="sr-only">
          Email Address
        </label>
        <input
          id="email_address"
          type="email"
          placeholder="Email Address"
          autoComplete="false"
          className="contact__form_input"
          name="email"
        />
      </div>
      <div className="mb-3">
        <textarea
          placeholder="Your Message"
          className="contact__form_input h-36"
          name="message"
        ></textarea>
      </div>
      <Button type="submit" variant="default" className="w-full">
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
