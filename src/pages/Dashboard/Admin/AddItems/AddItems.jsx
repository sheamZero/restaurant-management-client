import { useForm } from 'react-hook-form';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { ImSpoonKnife } from "react-icons/im";


const AddItems = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        console.log("Submitted Data:", formData);
        reset();
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
