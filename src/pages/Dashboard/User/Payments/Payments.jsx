import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../CheckOutForm/CheckOutForm';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_KEY);
const Payments = () => {
    return (
        <Elements stripe={stripePromise} >
            <CheckOutForm></CheckOutForm>
        </Elements>
    );
};

export default Payments;