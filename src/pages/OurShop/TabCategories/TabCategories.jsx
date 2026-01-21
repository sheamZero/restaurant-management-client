import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MenuCard from '../../components/MenuCard/MenuCard';
import { useAllMenu } from '../../../hooks/useMenu';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import Container from '../../components/Container/Container';


const TabCategories = () => {
    const { data: menuItems = [] } = useAllMenu();
    const location = useLocation();

    // console.log(location?.state);

    const categories = [
        { label: "salads", key: "salad" },
        { label: "soups", key: "soup" },
        { label: "pizzas", key: "pizza" },
        { label: "desserts", key: "dessert" },
        { label: "drinks", key: "drinks" },
        { label: "offered", key: "offered" }
    ];

    const defaultCategory = location.state?.category || "salad";
    const initialIndex = categories.findIndex(cat => cat.key === defaultCategory) || 0;
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const itemPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [tabIndex]);

    const filteredItems = menuItems.filter(item => item.category === categories[tabIndex].key);
    const totalPage = Math.ceil(filteredItems.length / itemPerPage);

    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

    return (
        <div className='py-12 my-16 md:my-24 md:py-24 bg-backgroundcolor rounded-lg'>
            <Container>
                <Tabs
                    selectedIndex={tabIndex}
                    onSelect={(index) => setTabIndex(index)}
                >
                    <TabList className="flex items-center justify-center gap-6 my-10">
                        {categories.map(cat => (
                            <Tab
                                key={cat.key}
                                className="uppercase text-2xl font-medium cursor-pointer p-px"
                                selectedClassName="text-primary border-b-2 border-primary"
                            >
                                {cat.label}
                            </Tab>
                        ))}
                    </TabList>

                    {categories.map((cat, index) => (
                        <TabPanel key={cat.key}>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                                {index === tabIndex && itemsToDisplay.map(item => (
                                    <MenuCard key={item._id} item={item} />
                                ))}
                            </div>
                        </TabPanel>
                    ))}
                </Tabs>

                {/* Pagination */}
                <div className='flex items-center justify-center mt-10 gap-4'>
                    <button
                        className='w-16 h-16 rounded-full flex items-center justify-center border'
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                        <IoArrowBack className='text-2xl' />
                    </button>

                    <p className='font-medium'>{currentPage} / {totalPage}</p>

                    <button
                        className='w-16 h-16 rounded-full flex items-center justify-center border'
                        disabled={currentPage === totalPage}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPage))}
                    >
                        <IoArrowForward className='text-2xl' />
                    </button>
                </div>
            </Container>
        </div>
    );
};


export default TabCategories;
