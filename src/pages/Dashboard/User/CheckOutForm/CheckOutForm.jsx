import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useGetAllCart } from "../../../../hooks/useCart";
import { useAuth } from "../../../../hooks/useAuth";
import { useGetAllReservation } from "../../../../hooks/useReservation";

const CheckOutForm = ({ type = "cart" }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: carts = [], isLoading } = useGetAllCart();
    const { data: reservations, isLoading: reservationLoading } = useGetAllReservation();

    console.log("typessss--", type);
    // console.log("cart--", reservations);

    const [clientSecret, setClientSecret] = useState("");
    const [paymentError, setPaymentError] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");

    /* ---------------- total price ---------------- */
    const totalPriceCarts = carts.reduce(
        (total, item) => total + Number(item.price || 0),
        0
    );

    const totalPriceReservations = reservations?.reduce(
        (total, item) => total + Number(item.price || 0),
        0
    );

    let totalPrice = 0;
    if (type === "cart") totalPrice = totalPriceCarts;
    if (type === "reservation") totalPrice = totalPriceReservations;

    /* ---------------- create payment intent ---------------- */
    useEffect(() => {
        if (clientSecret) return;
        if (isLoading || reservationLoading || loading) return;
        if (totalPrice <= 0) return;

        const createPaymentIntent = async () => {
            try {
                const { data } = await axiosSecure.post(
                    "/create-payment-intent",
                    { price: totalPrice }
                );
                setClientSecret(data.clientSecret);
            } catch (err) {
                setPaymentError("Failed to initialize payment.");
            }
        };

        createPaymentIntent();
    }, [isLoading, loading, reservationLoading, totalPrice, axiosSecure]);

    /* ---------------- handle submit ---------------- */
    const handlePaymentSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;
        if (!user?.email) {
            setPaymentError("User not authenticated.");
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) return;

        setIsProcessing(true);
        setPaymentError("");

        try {
            /* 1 create payment method WITH billing details */
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card,
                billing_details: {
                    email: user.email,
                    name: user.displayName || "Anonymous",
                },
            });

            if (error) {
                console.log("[Error]", error);
                setPaymentError(error.message);
                return;
            }

            console.log("[paymentMethod]", paymentMethod);


            /* 2 confirm payment */
            const { paymentIntent, error: confirmError } =
                await stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id,
                });

            if (confirmError) {
                setPaymentError(confirmError.message);
                console.log("[confirmError]", confirmError);
                return;
            }

            console.log("[paymentIntent]", paymentIntent);

            /* 3 success */
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);

                const paymentInfo = {
                    email: user?.email,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    type,
                    cartIds: type === "cart" ? carts.map(cart => cart._id) : [],
                    menuIds: type === "cart" ? carts.map(cart => cart.cartId) : [],
                    reservationIds: type === "reservation" ? reservations.map(res => res._id) : [],
                    amount: totalPrice,
                    status: "Pending",
                }
                const { data } = await axiosSecure.post("/payments", paymentInfo);
                console.log("saved->", data);

            }
        } catch (err) {
            setPaymentError("Payment failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (isLoading || loading) return null;

    /* ---------------- UI ---------------- */
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-10 p-5">
            <h2 className="text-3xl font-bold uppercase">Payment</h2>

            <form
                onSubmit={handlePaymentSubmit}
                className="flex flex-col gap-8 w-full md:max-w-xl"
            >
                <div className="border border-black/30 border-dashed rounded py-3 px-2">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "18px",
                                    color: "#424770",
                                    "::placeholder": { color: "#aab7c4" },
                                },
                                invalid: { color: "#9e2146" },
                            },
                        }}
                    />
                </div>

                {paymentError && (
                    <p className="text-red-600 text-center text-sm">
                        {paymentError}
                    </p>
                )}

                {transactionId && (
                    <p className="text-green-600 text-center text-sm">
                        Transaction ID: {transactionId}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={!stripe || !clientSecret || isProcessing}
                    className="btn btn-primary disabled:opacity-70 w-full"
                >
                    {
                        isProcessing
                            ?
                            "Processing..."
                            :
                            type === "cart"
                                ?
                                `Pay $${totalPrice} for Cart Items`
                                :
                                `Pay $${totalPrice} for Reservation Items`
                    }
                </button>
            </form>
        </div>
    );
};

export default CheckOutForm;
