import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Swal from 'sweetalert2'
import { useAddToCart } from "../../../hooks/useCart";



const MenuCard = ({ item }) => {
    const { image, name, recipe, price } = item;
    const { user } = useAuth();

    const navigate = useNavigate();
    const { mutateAsync, refetch } = useAddToCart();


    const handleCartItem = async (item) => {
        const { name, recipe, image, cateory, price } = item;

        const newItem = {
            name,
            recipe,
            image,
            cateory,
            price,
            cartId: item._id,
            email: user?.email
        }
        // console.log(newItem);

        if (!user?.email) {
            Swal.fire({
                title: "You need to be logged in!",
                text: "Please sign in to add items to your cart.",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Sign In",
                cancelButtonText: "Cancel",
                confirmButtonColor: "#F59E0B", // Amber
                cancelButtonColor: "#9CA3AF",  // Gray
                padding: "2rem",
                width: 400,
            }).then((result) => {
                if (result.isConfirmed) {
                    refetch();
                    navigate("/sign-in" || "/");
                }
            });
            return;
        }

        try {
            const result = await mutateAsync(newItem); // add to cart
            if (result.insertedId) {
                // Swal.fire({
                //     position: "top-end",
                //     icon: "success",
                //     title: "Your work has been saved",
                //     showConfirmButton: false,
                //     timer: 1500
                // });
            }
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }


    };

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
                    <button
                        onClick={() => handleCartItem(item)}
                        className="mt-2 btn btn-outline border-0 border-b-2 border-yellow-500 text-yellow-500 hover:text-yellow-500 uppercase">Add to card</button>
                </div>
            </div>
            <p className="absolute top-5 bg-black px-4 py-2 text-white rounded-md right-8 font-medium">${price}</p>
        </div>
    );
};

export default MenuCard;