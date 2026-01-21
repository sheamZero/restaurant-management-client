import featuredImg from '../../../assets/home/featured.jpg';
import Container from '../../components/Container/Container';
import SectionTitle from '../../components/SectionTitle/SectionTitle';


const FeaturedSection = () => {
    return (
        <section className="my-20">
            <Container>
                <div
                    style={{ backgroundImage: `url(${featuredImg})` }}
                    className="bg-fixed bg-cover bg-center bg-no-repeat px-6 md:px-36 py-10 md:py-20"
                >

                    {/* ✅ Reusable section title */}
                    <SectionTitle subTitle="Check It Out" title="Featured Item" titleColor='text-white font-extrabold' />

                    {/* ✅ Main content container with translucent overlay */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-10 bg-black/60 backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-2xl border border-[#ff6700]/20">

                        {/* ✅ Image column */}
                        <div className="flex-1">
                            <img
                                src={featuredImg}
                                alt="Featured dish"
                                className="w-full h-auto rounded-lg object-cover shadow-lg border-4 border-primary hover:border-btnHover transition-all duration-300"
                            />
                        </div>

                        {/* ✅ Description column */}
                        <div className="flex-1 text-white space-y-4">
                            <p className="text-sm md:text-base text-primary font-semibold uppercase tracking-widest">Aug 20, 2029</p>
                            <p className="uppercase text-2xl md:text-3xl font-bold tracking-wide text-white">
                                Where can I get some?
                            </p>
                            <p className="text-justify leading-relaxed text-gray-200">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate expedita hic
                                dolorem, iusto vel suscipit nam excepturi debitis magnam nostrum! Ut eum dignissimos
                                culpa doloremque eligendi consectetur blanditiis laboriosam fugiat ea quia similique
                                quam nisi reprehenderit numquam magnam nemo vitae cupiditate, atque maiores dicta minus
                                pariatur. Perspiciatis nobis vero quas?
                            </p>

                            {/* ✅ Styled button with smooth hover transition */}
                            <button className="btn border-2 border-primary mt-4 bg-primary text-white font-semibold hover:bg-transparent hover:text-white hover:border-2 hover:border-primary transition-all duration-200">
                                Order Now
                            </button>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default FeaturedSection;
