import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";
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
      email: user?.email,
    };

    if (!user?.email) {
      Swal.fire({
        title: "You need to be logged in!",
        text: "Please sign in to add items to your cart.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Sign In",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#E2852E",
        cancelButtonColor: "#ABE0F0",
        padding: "2rem",
        width: 400,
      }).then((result) => {
        if (result.isConfirmed) {
          // refetch();
          navigate("/sign-in" || "/");
        }
      });
      return;
    }

    try {
      const result = await mutateAsync(newItem);
      if (result.insertedId) {
        // Success
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <div className="card bg-white relative shadow-sm group">
      {/* IMAGE 50% */}
      <figure className="w-full h-[220px] overflow-hidden">
        <img
          src={image}
          alt="food"
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
      </figure>

      {/* CONTENT 50% */}
      <div className="card-body items-center text-center">
        <h2 className="card-title text-black">{name}</h2>
        <p className="text-gray-700">{recipe}</p>

        <div className="card-actions">
          <button
            onClick={() => handleCartItem(item)}
            className="btn bg-backgroundcolor my-2 text-primary hover:bg-primary hover:text-white border-0 rounded-full px-8 py-2 uppercase tracking-wide shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <p className="absolute top-4 bg-backgroundcolor px-2 py-1 text-primary rounded-md right-4 font-medium">
        ${price}
      </p>
    </div>
  );
};

export default MenuCard;
