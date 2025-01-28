import useReview from "../../../Hooks/useReview";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaCar, FaSave } from "react-icons/fa";

const Successstory = () => {
  const [review] = useReview();

  return (
    <div className="bg-gradient-to-b from-violet-100 via-violet-200 to-violet-300 py-12 px-6 my-10 rounded-lg md:px-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-violet-600 mb-8">
        Our Users' Successful Stories
      </h2>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {review.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-gradient-to-b from-yellow-50  to-yellow-100 shadow-xl rounded-lg p-6 max-w-3xl mx-auto">
              <h3 className="text-xl flex items-center gap-2  font-semibold text-gray-700 mb-2">
               <FaCar></FaCar> {item.title || "A Journey to Success"}
              </h3>
              <div className="mb-4 pt-2">
                <span className="text-sm px-4 py-2 text-gray-800 bg-gradient-to-r from-yellow-200 via-yellow-300 to-orange-300 rounded-md shadow-sm hover:shadow-md transition-all">
                  <span className="font-bold text-black">Date:</span>{" "}
                  {item.date}
                </span>
              </div>

              <div className="flex justify-center mb-4">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={item?.rating}
                  readOnly
                />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <img
                  src={item.image}
                  alt="Reviewer"
                  className="w-20 h-20 rounded-full border-4 border-gray-300 object-cover"
                />
                <p className="text-gray-700 text-center md:text-left text-base leading-relaxed">
                  {item.story}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Successstory;
