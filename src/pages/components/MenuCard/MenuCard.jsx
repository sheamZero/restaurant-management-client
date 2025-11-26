

const MenuCard = ({ item }) => {
    const { image, name, recipe, price } = item;

    return (
        <div className="card bg-[#f3f3f3] max-w-[400px] relative shadow-sm">
            <figure className="">
                <img
                    src={image}
                    alt="food"
                    className="" />
            </figure>

            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button className="mt-2 btn btn-outline border-0 border-b-2 border-yellow-500 text-yellow-500 hover:text-yellow-500 uppercase">Add to card</button>
                </div>
            </div>
            <p className="absolute top-5 bg-black px-4 py-2 text-white rounded-md right-8 font-medium">${price}</p>
        </div>
    );
};

export default MenuCard;