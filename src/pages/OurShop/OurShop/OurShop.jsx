
import shop_bg from '../../../assets/shop/banner2.jpg';
import Cover from '../../components/Cover/Cover';
import TabCategories from "../TabCategories/TabCategories";

const OurShop = () => {


    return (
        <section>
            <Cover bg_img={shop_bg} title={"our shop"} subTitle={"Would You Like to try our dish?"}></Cover>

            {/* tab category  */}
            <TabCategories />
        </section>
    );
};

export default OurShop;