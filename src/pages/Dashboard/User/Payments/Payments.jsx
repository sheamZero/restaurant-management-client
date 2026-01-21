import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../CheckOutForm/CheckOutForm';
import { useSearchParams } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_KEY);

const Payments = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type") || "cart";

    return (
        <Elements stripe={stripePromise} >
            <CheckOutForm type={type}></CheckOutForm>
        </Elements>
    );
};

export default Payments;