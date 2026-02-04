import { useState } from "react";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { errorAction, successAction } from "../../../../utils/swal";

const AddReview = () => {
    const axiosSecure = useAxiosSecure();

    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !details || rating === 0) {
            return errorAction("Please fill all fields");
        }

        const review = { name, details, rating };

        try {
            setLoading(true);
            const { data } = await axiosSecure.post("/reviews", review);
            if (data.insertedId) {
                successAction("Review Added Successfully!");
            }
            setName("");
            setDetails("");
            setRating(0);
        } catch (error) {
            errorAction("Failed to add a review", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-6">
                Add a Review
            </h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-6 space-y-6"
            >
                {/* Name */}
                <div>
                    <label className="block text-lg font-semibold mb-1">
                        Your Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                    />
                </div>

                {/* Review */}
                <div>
                    <label className="block text-lg font-semibold mb-1">
                        Review Details
                    </label>
                    <textarea
                        rows="4"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Write your experience..."
                        className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                    />
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-lg font-semibold mb-2">
                        Rating
                    </label>
                    <Rating
                        initialRating={rating}
                        emptySymbol={<FaRegStar className="text-3xl text-gray-400" />}
                        fullSymbol={<FaStar className="text-3xl text-yellow-400" />}
                        onChange={(rate) => setRating(rate)}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Selected Rating: {rating}
                    </p>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary/90 transition"
                >
                    {loading ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </div>
    );
};

export default AddReview;
