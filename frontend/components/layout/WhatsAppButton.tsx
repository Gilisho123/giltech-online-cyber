"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    const phoneNumber = "254758220554";

    const message = encodeURIComponent(
        "Hello Giltech Online Cyber, I'm interested in your services."
    );

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-full
        bg-green-500
        text-white
        shadow-2xl
        transition-all
        duration-300
        hover:scale-110
        hover:bg-green-600
        animate-bounce
      "
        >
            <FaWhatsapp size={34} />
        </a>
    );
}