import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

const Banner = () => {
  const slides = [
    {
      img: "https://img.freepik.com/free-photo/adorable-young-couple-together_23-2148691140.jpg?t=st=1736813383~exp=1736816983~hmac=32863cb4f9440ed7f71eb4c475259f96c56f26ef722adbbaaba4250498104333&w=1380",
      title: "Find Your Perfect Match",
      description: "Connecting hearts with trust and compatibility.",
    },
    {
      img: "https://images.unsplash.com/photo-1634729108541-516d16ddceec?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Discover Genuine Connections",
      description: "Start your journey to meaningful relationships today.",
    },
    {
      img: "https://images.unsplash.com/photo-1481653125770-b78c206c59d4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Evermatch - Where Love Happens",
      description: "Your story begins here, with us.",
    },
    {
      img: "https://images.unsplash.com/photo-1491582990992-68ec88e070a3?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Build Your Happily Ever After",
      description: "Take the first step towards a brighter future together.",
    },
  ];

  return (
    <div className="py-[44px] md:py-[54px]  bg-[#FBF5E5]">
      <AwesomeSlider className="h-[70vh] w-full">
        {slides.map((slide, index) => (
          <div key={index} className="h-full w-full relative">
            <img
              src={slide.img}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 bg-black bg-opacity-50">
              <h1 className="text-4xl font-bold text-[#FBF5E5]">
                {slide.title}
              </h1>
              <p className="mt-2 text-lg text-[#C890A7]">{slide.description}</p>
            </div>
          </div>
        ))}
      </AwesomeSlider>
    </div>
  );
};

export default Banner;
