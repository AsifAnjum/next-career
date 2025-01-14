import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-2">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* quick links */}
        <div>
          <p className="text-xl font-bold text-white mb-4">Quick Links</p>
          <ul className="space-y-2">
            <li>
              <Link href="/jobs" className="hover:text-indigo-500">
                Jobs
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-indigo-500">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-indigo-500">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-indigo-500">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* legal */}
        <div>
          <p className="text-xl font-bold text-white mb-4">Legal</p>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-indigo-500">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-indigo-500">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-indigo-500">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>

        {/* follow us */}
        <div>
          <p className="text-xl font-bold text-white mb-4">Follow Us</p>
          <div className="flex space-x-6">
            <Link
              aria-label="facebook"
              href="/"
              className="text-gray-400 hover:text-indigo-500"
            >
              <Facebook />
            </Link>
            <Link
              aria-label="instagram"
              href="/"
              className="text-gray-400 hover:text-indigo-500"
            >
              <Instagram />
            </Link>
            <Link
              aria-label="youtube"
              href="#"
              className="text-gray-400 hover:text-indigo-500"
            >
              <Youtube />
            </Link>
          </div>
        </div>

        {/* contact us */}
        <div>
          <p className="text-xl font-bold text-white mb-4">Contact Us</p>
          <ul className="space-y-2">
            <li>
              <Link
                href="mailto:nextcareer.management@gmail.com"
                className="hover:text-indigo-500"
              >
                nextcareer.management@gmail.com
              </Link>
            </li>
            <li>
              <a href="tel:+1234567890" className="hover:text-indigo-500">
                +1 (234) 567-890
              </a>
            </li>
            <li className="text-gray-400">
              221B Baker Street, Somewhere, Nowhere
            </li>
          </ul>
        </div>
      </div>

      {/* footer bottom */}
      <div className="mt-12 border-t border-gray-700 pt-8 text-center">
        <p className="text-sm text-gray-500">
          © 2024 Next Career. All rights reserved. |{" "}
          <a href="/privacy-policy" className="hover:text-indigo-500">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms-and-conditions" className="hover:text-indigo-500">
            Terms & Conditions
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
