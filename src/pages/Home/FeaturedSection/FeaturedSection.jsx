import featuredImg from '../../../assets/home/featured.jpg';
import SectionTitle from '../../components/SectionTitle/SectionTitle';


const FeaturedSection = () => {
    return (
        <section className="my-20">
            {/* ✅ Background with parallax effect */}
            <div
                style={{ backgroundImage: `url(${featuredImg})` }}
                className="bg-fixed bg-cover bg-center bg-no-repeat px-6 md:px-36 py-10 md:py-20"
            >
                {/* ✅ Reusable section title */}
                <SectionTitle subTitle="Check It Out" title="Featured Item" titleColor='text-white font-extrabold'/>

                {/* ✅ Main content container with translucent overlay */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-10 bg-black/60 p-6 md:p-10 rounded-lg shadow-lg">

                    {/* ✅ Image column */}
                    <div className="flex-1">
                        <img
                            src={featuredImg}
                            alt="Featured dish"
                            className="w-full h-auto rounded-lg object-cover shadow-md "
                        />
                    </div>

                    {/* ✅ Description column */}
                    <div className="flex-1 text-white space-y-4">
                        <p className="text-sm md:text-base text-gray-200">Aug 20, 2029</p>
                        <p className="uppercase text-2xl md:text-3xl font-semibold tracking-wide">
                            Where can I get some?
                        </p>
                        <p className="text-justify leading-relaxed text-gray-100">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate expedita hic
                            dolorem, iusto vel suscipit nam excepturi debitis magnam nostrum! Ut eum dignissimos
                            culpa doloremque eligendi consectetur blanditiis laboriosam fugiat ea quia similique
                            quam nisi reprehenderit numquam magnam nemo vitae cupiditate, atque maiores dicta minus
                            pariatur. Perspiciatis nobis vero quas?
                        </p>

                        {/* ✅ Styled button with smooth hover transition */}
                        <button className="btn btn-outline border-0 border-b-4 mt-4 text-white border-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300">
                            Order Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;
