
const SectionTitle = ({ 
    title = "", 
    subTitle = "", 
    titleColor = "text-black", 
    subTitleColor = "text-primary" 
}) => {
    return (
        <div className="flex flex-col items-center">
            <p className={`text-xl text-center font-semibold italic mb-5 ${subTitleColor}`}>
                ------- {subTitle} -------
            </p>
            <h1 className={`font-semibold text-center uppercase text-2xl md:text-3xl p-6 border-t-2 border-b-2 border-primary md:w-1/2 ${titleColor}`}>
                {title}
            </h1>
        </div>
    );
};

export default SectionTitle;
