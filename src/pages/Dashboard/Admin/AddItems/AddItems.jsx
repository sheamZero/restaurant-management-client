import { useForm } from 'react-hook-form';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { ImSpoonKnife } from "react-icons/im";
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { errorAction, successAction } from '../../../../utils/swal';
import { useNavigate } from 'react-router-dom';

// imgBB essentials for hosting image file 
const image_hosting_key = import.meta.env.VITE_IMGBB_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        try {
            const image = formData.image?.[0];
            if (!image) throw new Error("Image file is required");

            const imageFile = { image };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { "content-type": "multipart/form-data" },
            });

            if (!res.data.success) {
                throw new Error("Image upload failed");
            }

            const menuItem = {
                name: formData.recipe_name,
                category: formData.category,
                image: res.data.data.display_url,
                recipe: formData.recipe_details,
                price: parseFloat(formData.price),
            };

            const response = await axiosSecure.post("/menu", menuItem);

            if (response.data.insertedId) {
                await successAction(`${formData.recipe_name} added successfully!`);
                reset();
                navigate("/dashboard/admin/manage-items", { replace: true });
            } else {
                throw new Error("Item was not added");
            }
        } catch (err) {
            await errorAction(err.response?.data?.message || err.message || "Something went wrong");
        }
    };


    return (
        <section>
            <SectionTitle title="Add An Item" subTitle="What's new" />

            <div className="mt-5 w-full bg-[#F3F3F3] flex items-center justify-center px-4">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="rounded-lg p-8 w-full max-w-5xl"
                >

                    {/* Recipe Name */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Recipe Name*
                        </label>
                        <input
                            type="text"
                            placeholder="Enter recipe name"
                            {...register("recipe_name", { required: "Recipe name is required" })}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                        />
                        {errors.recipe_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.recipe_name.message}</p>
                        )}
                    </div>

                    {/* Category + Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                        {/* Category */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Category*
                            </label>
                            <select
                                {...register("category", { required: "Category is required" })}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            >
                                <option value="">Select category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="dessert">Dessert</option>
                                <option value="soup">Soup</option>
                                <option value="drinks">Drinks</option>
                                <option value="popular">Popular</option>
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Price*
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register("price", { required: "Price is required" })}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                            )}
                        </div>

                    </div>

                    {/* Recipe Details */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-2">
                            Recipe Details*
                        </label>
                        <textarea
                            rows="5"
                            placeholder="Write recipe details..."
                            {...register("recipe_details", { required: "Details are required" })}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                        />
                        {errors.recipe_details && (
                            <p className="text-red-500 text-sm mt-1">{errors.recipe_details.message}</p>
                        )}
                    </div>

                    {/* File Upload */}
                    <div className="mb-6">

                        <input
                            type="file"
                            {...register("image", { required: "Image is required" })}
                            className="w-full"
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-start">
                        <button
                            type="submit"
                            className="bg-[#D1A054] flex items-center gap-5 text-white font-semibold px-8 py-3 rounded-md hover:bg-[#b88845] transition-all"
                        >
                            Add Item
                            <ImSpoonKnife className="text-2xl" />
                        </button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default AddItems;
