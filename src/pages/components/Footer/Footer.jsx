const Footer = () => {
    return (
        <footer className="bg-neutral container mx-auto text-neutral-content">
            <div className="footer sm:footer-horizontal p-10">
                <aside>
                    <p>
                        ACME Industries Ltd.
                        <br />
                        Providing reliable tech since 1992
                    </p>
                </aside>
                <div>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        {/* Social Icons */}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="footer footer-center bg-black/80 p-4">
                <aside>
                    <p>
                        Copyright © {new Date().getFullYear()} - All right reserved by ACME
                        Industries Ltd
                    </p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;
