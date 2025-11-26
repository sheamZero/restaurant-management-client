import our_menu from '../../assets/menu/banner3.jpg';
import dessert_bg from '../../assets/menu/dessert-bg.jpeg';
import pizza_bg from '../../assets/menu/pizza-bg.jpg';
import salad_bg from '../../assets/menu/salad-bg.jpg';
import soup_bg from '../../assets/menu/soup-bg.jpg';
import { useNavigate } from 'react-router-dom';
import { useAllMenu } from '../../hooks/useMenu';
import Cover from '../components/Cover/Cover';
import MenuItem from '../components/MenuItem/MenuItem';
import SectionTitle from '../components/SectionTitle/SectionTitle';

const OurMenu = () => {
    const { data: menuItems = [] } = useAllMenu();
    const navigate = useNavigate();

    const sectionsInfo = [
        {
            cover: our_menu,
            title: "our menu",
            subtitle: "Would you like to try a dish?",
            key: "offered",
            sectionTitle: "today's offer",
            sectionSubtitle: "Don't miss"
        },
        {
            cover: dessert_bg,
            title: "dessert's",
            subtitle: "Would you like to try a dessert?",
            key: "dessert",
            sectionTitle: "dessert's",
            sectionSubtitle: "Don't miss"
        },
        {
            cover: pizza_bg,
            title: "pizza's",
            subtitle: "Would you like to try a pizza?",
            key: "pizza",
            sectionTitle: "pizza's",
            sectionSubtitle: "Don't miss"
        },
        {
            cover: salad_bg,
            title: "salad's",
            subtitle: "Would you like to try a salad?",
            key: "salad",
            sectionTitle: "salad's",
            sectionSubtitle: "Don't miss"
        },
        {
            cover: soup_bg,
            title: "soup's",
            subtitle: "Would you like to try some soup?",
            key: "soup",
            sectionTitle: "soup's",
            sectionSubtitle: "Don't miss"
        },
        {
            cover: pizza_bg,
            title: "drink's",
            subtitle: "Would you like to try a drink?",
            key: "drinks",
            sectionTitle: "drink's",
            sectionSubtitle: "Don't miss"
        }
    ];

    return (
        <div>
            {sectionsInfo.map((sec) => {
                const filteredItems = menuItems.filter(item => item.category === sec.key);

                return (
                    <div key={sec.key}>

                        {/* COVER */}
                        <section>
                            <Cover bg_img={sec.cover} title={sec.title} subTitle={sec.subtitle} />
                        </section>

                        {/* ITEMS */}
                        <section className="mt-20 mb-10">
                            <SectionTitle title={sec.sectionTitle} subTitle={sec.sectionSubtitle} />

                            <div className="grid grid-cols-1 my-12 md:grid-cols-2 gap-10">
                                {filteredItems.map(item => (
                                    <MenuItem item={item} key={item._id} />
                                ))}
                            </div>

                            <div className="flex items-center justify-center">
                                <button
                                    onClick={() => navigate(`/our-shop`, { state: { category: sec.key } })}
                                    className="btn btn-outline uppercase border-0 border-b-2">
                                    ORDER YOUR FAVOURITE FOOD
                                </button>
                            </div>
                        </section>

                    </div>
                );
            })}
        </div>
    );
};

export default OurMenu;
