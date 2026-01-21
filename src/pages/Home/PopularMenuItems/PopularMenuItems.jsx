import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuItem from "../../components/MenuItem/MenuItem";
import axios from "axios";
import Container from "../../components/Container/Container";
import { motion } from "framer-motion";

const PopularMenuItems = () => {
    const [popularMenu, setPopularMenu] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:9000/menu?category=popular")
            .then(res => setPopularMenu(res.data))
            .catch(err => console.error("Error loading popular menu:", err));
    }, []);

    return (
        <section className="my-16 py-12 md:my-24  md:py-24 bg-backgroundcolor rounded-lg">
            <Container>
                <SectionTitle title="popular items" subTitle="Check It Out" />

                {/* Menu items */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 my-12 md:grid-cols-2 gap-10"
                >
                    {popularMenu.map(item => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            <MenuItem item={item} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => navigate("/our-menu")}
                        className="uppercase tracking-wide px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base border-2 border-primary text-primary rounded-full font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 active:scale-95"
                    >
                        View Full Menu
                    </button>
                </div>

            </Container>
        </section>
    );
};

export default PopularMenuItems;
