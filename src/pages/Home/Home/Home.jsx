import Cover from "../../components/Cover/Cover";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import bg_chef_service from '../../../assets/home/chef-service.jpg';
import PopularMenuItems from "../PopularMenuItems/PopularMenuItems";
import CallUsBanner from "../CallUsBanner/CallUsBanner";
import OfferedItems from "../OfferedItems/OfferedItems";
import FeaturedSection from "../FeaturedSection/FeaturedSection";
import Testimonials from "../Testimonials/Testimonials";



const Home = () => {
    return (
        <div>

            <Banner></Banner>
            <Category></Category>
            <section className=" bg-backgroundcolorwhite rounded-lg">
                <Cover bg_img={bg_chef_service} title={"TableTalk"} subTitle={" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga quas delectus perferendis cumque dicta, quia quae doloremque neque numquam dolore tenetur. Fugit odio quos consequuntur quas consequatur quae deserunt quo"}></Cover>
            </section>
            <PopularMenuItems></PopularMenuItems>
            <CallUsBanner></CallUsBanner>
            <OfferedItems></OfferedItems>
            <FeaturedSection></FeaturedSection>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;