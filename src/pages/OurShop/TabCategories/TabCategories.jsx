import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MenuCard from '../../components/MenuCard/MenuCard';
import { useAllMenu } from '../../../hooks/useMenu';

const TabCategories = () => {
    const menuItems = useAllMenu();
    console.log(menuItems);

    const categories = [
        { label: "salads", key: "salad" },
        { label: "soups", key: "soup" },
        { label: "pizzas", key: "pizza" },
        { label: "desserts", key: "dessert" },
        { label: "drinks", key: "drinks" },
        { label: "offered", key: "offered" }
    ];

    return (
        <div className='my-20'>
            <Tabs>

                {/* TAB LIST */}
                <TabList className="flex items-center justify-center gap-6 my-10">
                    {categories.map(cat => (
                        <Tab
                            key={cat.key}
                            className="uppercase text-2xl font-medium cursor-pointer p-px"
                            selectedClassName="text-yellow-500 border-b-2 border-yellow-500"
                        >
                            {cat.label}
                        </Tab>
                    ))}
                </TabList>

                {/* TAB PANELS — using your structure */}
                {categories.map(cat => (
                    <TabPanel key={cat.key}>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                            {menuItems
                                .filter(item => item.category === cat.key)
                                .map(item => (
                                    <MenuCard key={item._id} item={item} />
                                ))
                            }

                        </div>
                    </TabPanel>
                ))}

            </Tabs>
        </div>
    );
};

export default TabCategories;
