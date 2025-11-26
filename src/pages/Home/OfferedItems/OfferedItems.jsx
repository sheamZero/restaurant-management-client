
// import { useAllMenu } from "../../../hooks/useMenu";
import { useMenuByCategory } from "../../../hooks/useMenu";
import MenuCard from "../../components/MenuCard/MenuCard";
import SectionTitle from "../../components/SectionTitle/SectionTitle";



const OfferedItems = () => {
    // const menuItems = useAllMenu();
    // const offeredItems = menuItems.filter(item => item.category === "offered");
    const { data: offeredItems = [], isLoading } = useMenuByCategory("offered");

    // console.log(offeredItems);


    return (
        <section className="my-16">
            <SectionTitle title="offered Items" subTitle="Should Try"></SectionTitle>
            <div className="grid mt-10 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {offeredItems.map(item => (
                    <MenuCard key={item._id} item={item}></MenuCard>
                ))}
            </div>
        </section>
    );
};

export default OfferedItems;