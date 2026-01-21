const MenuItem = ({ item }) => {
  const { image, recipe, name, price } = item;

  return (
    <div className="flex items-start gap-5 p-3 shadow-sm rounded-lg md:gap-8 group">
      {/* Image */}
      <div className="w-[110px] h-[80px] md:w-[130px] md:h-[90px] overflow-hidden shrink-0 rounded-tr-[200px] rounded-br-[200px] rounded-bl-[200px] group-hover:border-2 border-primary transition-transform duration-300">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Text content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2 border-b border-dotted border-gray-300 pb-1">
          <p className="text-lg md:text-xl font-semibold text-gray-800">{name}</p>
          <p className="text-sm md:text-base text-primary font-medium">${price}</p>
        </div>

        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {recipe}
        </p>
      </div>
    </div>
  );
};

export default MenuItem;
