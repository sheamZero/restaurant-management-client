

import shop_bg from '../../../assets/shop/banner2.jpg';
import Cover from '../../components/Cover/Cover';
import TabCategories from "../TabCategories/TabCategories";

const OurShop = () => {



    return (
        <section>
            <div className="bg-backgroundcolorwhite rounded-lg py-16 md:pb-20">
                <Cover bg_img={shop_bg} title={"our shop"} subTitle={"Would You Like to try our dish?"}></Cover>
            </div>

            {/* tab category  */}
            <TabCategories />
        </section>
    );
};

export default OurShop;