import our_menu from '../../assets/menu/banner3.jpg';
import dessert_bg from '../../assets/menu/dessert-bg.jpeg';
import pizza_bg from '../../assets/menu/pizza-bg.jpg';
import salad_bg from '../../assets/menu/salad-bg.jpg';
import soup_bg from '../../assets/menu/soup-bg.jpg';

import { useAllMenu } from '../../hooks/useMenu';
import Cover from '../components/Cover/Cover';
import MenuItem from '../components/MenuItem/MenuItem';
import SectionTitle from '../components/SectionTitle/SectionTitle';


const OurMenu = () => {

    const menuItems = useAllMenu();
    const offeredItems = menuItems.filter(item => item.category === "offered");
    const dessertItems = menuItems.filter(item => item.category === "dessert");
    const pizzaItems = menuItems.filter(item => item.category === "pizza");
    const saladItems = menuItems.filter(item => item.category === "salad");
    const soupItems = menuItems.filter(item => item.category === "soup");
    const drinksItems = menuItems.filter(item => item.category === "drinks");

    console.log(offeredItems);


    return (
        <div>
            <section>
                <Cover bg_img={our_menu} title={"our menu"} subTitle={"Would you like to try a dish?"}></Cover>
            </section>

            <section className="mt-20 mb-10">
                <SectionTitle title={"today's offer"} subTitle={"Don't miss"}></SectionTitle>

                <div className="grid grid-cols-1 my-12 md:grid-cols-2 gap-10">
                    {offeredItems.map(item => <MenuItem item={item} key={item._id}></MenuItem>)}
                </div>

                <div className="flex items-center justify-center">
                    <button className="btn btn-outline uppercase border-0 border-b-2">ORDER YOUR FAVOURITE FOOD</button>
                </div>
            </section>

            <section>
                <Cover bg_img={dessert_bg} title={"dessert's"} subTitle={"Would you like to try a dessert?"}></Cover>
            </section>

            <section className="mt-20 mb-10">
                <SectionTitle title={"dessert's"} subTitle={"Don't miss"}></SectionTitle>

                <div className="grid grid-cols-1 my-12 md:grid-cols-2 gap-10">
                    {dessertItems.map(item => <MenuItem item={item} key={item._id}></MenuItem>)}
                </div>

                <div className="flex items-center justify-center">
                    <button className="btn btn-outline uppercase border-0 border-b-2">ORDER YOUR FAVOURITE FOOD</button>
                </div>
            </section>

            <section>
                <Cover bg_img={pizza_bg} title={"pizza's"} subTitle={"Would you like to try a pizza?"}></Cover>
            </section>

            <section className="mt-20 mb-10">
                <SectionTitle title={"pizza's"} subTitle={"Don't miss"}></SectionTitle>

                <div className="grid grid-cols-1 my-12 md:grid-cols-2 gap-10">
                    {pizzaItems.map(item => <MenuItem item={item} key={item._id}></MenuItem>)}
                </div>

                <div className="flex items-center justify-center">
                    <button className="btn btn-outline uppercase border-0 border-b-2">ORDER YOUR FAVOURITE FOOD</button>
                </div>
            </section>

            <section>
                <Cover bg_img={salad_bg} title={"salad's"} subTitle={"Would you like to try a salad?"}></Cover>
            </section>

            <section className="mt-20 mb-10">
                <SectionTitle title={"salad's"} subTitle={"Don't miss"}></SectionTitle>

                <div className="grid grid-cols-1 my-12 md:grid-cols-2 gap-10">
                    {saladItems.map(item => <MenuItem item={item} key={item._id}></MenuItem>)}
                </div>

                <div className="flex items-center justify-center">
                    <button className="btn btn-outline uppercase border-0 border-b-2">ORDER YOUR FAVOURITE FOOD</button>
                </div>
            </section>

            <section>
                <Cover bg_img={soup_bg} title={"soup's"} subTitle={"Would you like to try a salad?"}></Cover>
            </section>

            <section className="mt-20 mb-10">
                <SectionTitle title={"soup's"} subTitle={"Don't miss"}></SectionTitle>

                <div className="grid grid-cols-1 my-12 md:grid-cols-2 gap-10">
                    {soupItems.map(item => <MenuItem item={item} key={item._id}></MenuItem>)}
                </div>

                <div className="flex items-center justify-center">
                    <button className="btn btn-outline uppercase border-0 border-b-2">ORDER YOUR FAVOURITE FOOD</button>
                </div>
            </section>

            <section>
                <Cover bg_img={pizza_bg} title={"drink's"} subTitle={"Would you like to try a drink?"}></Cover>
            </section>

            <section className="mt-20 mb-10">
                <SectionTitle title={"drink's"} subTitle={"Don't miss"}></SectionTitle>

                <div className="grid grid-cols-1 my-12 md:grid-cols-2 gap-10">
                    {drinksItems.map(item => <MenuItem item={item} key={item._id}></MenuItem>)}
                </div>

                <div className="flex items-center justify-center">
                    <button className="btn btn-outline uppercase border-0 border-b-2">ORDER YOUR FAVOURITE FOOD</button>
                </div>
            </section>

        </div>
    );
};

export default OurMenu;