import { FaFacebook, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-r from-black/95 via-gray-800 to-gray-900 text-white font-semibold overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none opacity-15">
                <div
                    className="absolute top-10 left-20 w-72 h-72 rounded-full blur-3xl"
                    style={{ background: "#5a716b" }}
                />
                <div
                    className="absolute bottom-10 right-20 w-96 h-96 rounded-full blur-3xl"
                    style={{ background: "#5a716b" }}
                />
            </div>

            {/* Main Footer Content */}
            <div className="relative container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 z-10">
                {/* Logo + About */}
                <div className="space-y-4">
                    <Link to="/" className="flex items-center space-x-2 mb-2">
                        <span className="text-3xl font-bold">Table.<span className="text-primary">Talk</span></span>
                    </Link>
                    <p className="text-sm leading-relaxed opacity-80">
                        TableTalk Restaurant is a premier dining destination offering authentic culinary experiences and exceptional service. Discover exquisite flavors in a welcoming atmosphere perfect for every occasion.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold mb-4 text-primary uppercase">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        {["Home", "Our Menu", "Our Shop", "Contact Us"].map((label, idx) => (
                            <li key={idx}>
                                <Link to={`/${label.toLowerCase().replace(/\s/g, "-")}`} className="hover:text-primary transition-colors duration-200">{label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Company */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold mb-4 text-primary uppercase">Company</h3>
                    <ul className="space-y-2 text-sm">
                        {["Privacy Policy", "Terms of Service", "FAQs", "Support"].map((label, idx) => (
                            <li key={idx}>
                                <Link to={`/${label.toLowerCase().replace(/\s/g, "-")}`} className="hover:text-primary transition-colors duration-200">{label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact + Socials */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold mb-4 text-primary uppercase">Get In Touch</h3>
                    <p className="text-sm mb-2 opacity-80">
                        Have any questions or suggestions? We’re here to help.
                    </p>
                    <p className="text-sm opacity-90 mb-1">📧 <a href="mailto:support@tabletalk.com" className="hover:text-primary transition-colors">support@tabletalk.com</a></p>
                    <p className="text-sm opacity-90 mb-3">📍 Dhaka, Bangladesh</p>

                    <div className="flex flex-wrap gap-3 mt-2">
                        {[
                            { icon: <FaFacebook size={22} />, href: "https://www.facebook.com/", title: "Facebook" },
                            { icon: <FaLinkedin size={22} />, href: "https://www.linkedin.com/", title: "LinkedIn" },
                            { icon: <FaGithub size={22} />, href: "https://www.github.com/", title: "GitHub" },
                            { icon: <FaInstagram size={22} />, href: "https://www.instagram.com/", title: "Instagram" },
                            { icon: <BsTwitterX size={22} />, href: "https://twitter.com/", title: "Twitter (X)" },
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-primary transition-transform duration-200 hover:scale-110"
                                title={social.title}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider + Copyright */}
            <div className="border-t border-gray-700 py-4 text-center text-sm text-white relative z-10">
                © {new Date().getFullYear()} <span className="font-bold text-primary">TableTalk Restaurant</span>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
