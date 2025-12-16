import { Parallax, } from 'react-parallax';

const Cover = ({ bg_img, title, subTitle }) => {
    return (
        <Parallax
            blur={{ min: -30, max: 30 }}
            bgImage={bg_img}
            bgImageAlt="our menu"
            strength={-150}
        >
            <div className="px-16 py-24 md:px-40 md:py-32 ">
                <div className="text-white flex flex-col items-center justify-center bg-[#151515]/60 p-10 md:px-24 md:py-20 rounded">
                    <h3 className="text-2xl md:text-5xl font-bold mb-4 uppercase">{title}</h3>
                    <p className="text-sm text-center md:text-base">{subTitle}</p>
                </div>
            </div>
        </Parallax>

    );
};

export default Cover;