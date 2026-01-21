import Container from "../../components/Container/Container";
import { FaPhoneAlt } from "react-icons/fa";

const CallUsBanner = () => {
  return (
    <section className=" py-12 md:py-20 bg-backgroundcolorwhite rounded-lg">
      <Container>
        <div className="flex items-center justify-center w-full bg-gradient-to-r from-black via-gray-900 to-gray-700 p-24 rounded">
          <p className="text-xl md:text-5xl font-semibold text-center text-white flex items-center gap-4">
            <FaPhoneAlt className="text-xl md:text-4xl" />
            Call Us: 01909758810
          </p>
        </div>
      </Container>
    </section>
  );
};

export default CallUsBanner;
