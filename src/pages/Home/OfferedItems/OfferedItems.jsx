
// import { useAllMenu } from "../../../hooks/useMenu";
import { useMenuByCategory } from "../../../hooks/useMenu";
import Container from "../../components/Container/Container";
import MenuCard from "../../components/MenuCard/MenuCard";
import SectionTitle from "../../components/SectionTitle/SectionTitle";



const OfferedItems = () => {
    // const menuItems = useAllMenu();
    // const offeredItems = menuItems.filter(item => item.category === "offered");
    const { data: offeredItems = [], isLoading } = useMenuByCategory("offered");

    // console.log(offeredItems);


    return (
        <section className="md:my-24 md:py-24 my-16 py-12 bg-backgroundcolor rounded-lg">
           <Container>
             <SectionTitle title="offered Items" subTitle="Should Try"></SectionTitle>
            <div className="grid mt-10 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {offeredItems.map(item => (
                    <MenuCard key={item._id} item={item}></MenuCard>
                ))}
            </div>
           </Container>
        </section>
    );
};

export default OfferedItems;