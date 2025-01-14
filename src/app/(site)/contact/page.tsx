import ContactForm from "@/components/contactForm";

import { Mail, Map, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with us for any inquiries, support, or feedback. We'd love to hear from you!",
};

const Page = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  text-center">
        <h2 className="text-4xl font-bold text-gray-100">Contact</h2>
        <p className="pt-6 pb-6 text-base max-w-2xl text-center m-auto text-gray-400">
          Want to contact us? Choose an option below and well be happy to show
          you how we can transform companys web experience.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 grid md:grid-cols-2 lg:grid-cols-2 gap-y-8 md:gap-x-8 md:gap-y-8 lg:gap-x-8 lg:gap-y-16">
        <div>
          <h2 className="text-gray-100">Contact Us</h2>
          <p className="max-w-sm mt-4 mb-4 text-gray-400">
            Have something to say? We are here to help. Fill up the form or send
            email or call phone.
          </p>
          <div className="flex items-center mt-8 space-x-2 text-dark-600 text-gray-400">
            <Map size={20} />
            <span>221B Baker Street, Somewhere, Nowhere</span>
          </div>
          <div className="flex items-center mt-2 space-x-2 text-dark-600 text-gray-400">
            <Mail size={20} />
            <a href="mailto:nextcareer.management@gmail.com">
              nextcareer.management@gmail.com
            </a>
          </div>
          <div className="flex items-center mt-2 space-x-2 text-dark-600 text-gray-400">
            <Phone size={20} />
            <a href="tel:+1 (234) 567-890">+1 (234) 567-890</a>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default Page;
