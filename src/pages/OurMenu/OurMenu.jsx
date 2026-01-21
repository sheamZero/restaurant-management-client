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
import Container from '../components/Container/Container';
import { ArrowRight } from 'lucide-react';

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
                        <section className=' py-16 bg-backgroundcolorwhite'>
                            <Cover bg_img={sec.cover} title={sec.title} subTitle={sec.subtitle} />
                        </section>

                        {/* ITEMS */}
                        <section className="py-24 my-24 bg-backgroundcolor">
                            <Container>
                                <SectionTitle title={sec.sectionTitle} subTitle={sec.sectionSubtitle} />

                                <div className="grid grid-cols-1 my-12 md:grid-cols-2 gap-10">
                                    {filteredItems.map(item => (
                                        <MenuItem item={item} key={item._id} />
                                    ))}
                                </div>

                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={() => navigate(`/our-shop`, { state: { category: sec.key } })}
                                        className="group mb-5 relative overflow-hidden rounded-full border-2 border-primary px-8 py-3 text-sm font-semibold uppercase tracking-wide text-primary transition-all duration-300 hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                    >
                                        <span className="absolute inset-0 bg-primary translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>

                                        <span className="relative z-10 flex items-center gap-2">
                                            Order Now
                                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                                <ArrowRight></ArrowRight>
                                            </span>
                                        </span>
                                    </button>


                                </div>
                            </Container>
                        </section>

                    </div>
                );
            })}
        </div>
    );
};

export default OurMenu;
