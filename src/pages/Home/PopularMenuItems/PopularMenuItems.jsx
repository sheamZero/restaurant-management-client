import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuItem from "../../components/MenuItem/MenuItem";
import axios from "axios";


const PopularMenuItems = () => {
    const [popularMenu, setPopularMenu] = useState([]);
    const navigate = useNavigate()

    // console.log(popularMenu);
    useEffect(() => {
         axios.get("http://localhost:9000/menu?category=popular")
            .then(res => setPopularMenu(res.data))
            .catch(err => console.error("Error loading popular menu:", err));
    }, [])

    return (
        <section className="my-16">
            <SectionTitle title="popular items" subTitle="Check It Out" />
            <div className="grid grid-cols-1 my-12 md:grid-cols-2 gap-10">
                {popularMenu.map(item => <MenuItem key={item._id} item={item} />)}
            </div>
            <div className="flex items-center justify-center">
                <button onClick={() => navigate("/our-menu")} className="btn btn-outline uppercase border-0 border-b-2">view full menu</button>
            </div>
        </section>
    );
};

export default PopularMenuItems;