import { Rating } from '@smastrom/react-rating';


const Review = ({ item }) => {
  const { story, date, image, rating } = item;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Very Own</h2>
      <h3 className="text-sm text-gray-600 mb-4">
        <span className="font-semibold">Date:</span> {date}
      </h3>
      
      <div className="flex justify-center mb-4">
        <Rating style={{ maxWidth: 180 }} value={rating} readOnly />
      </div>

      <div className="flex items-start gap-4">
        <img 
          src={image} 
          alt="Reviewer" 
          className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
        />
        <p className="text-gray-700 text-sm leading-relaxed">{story}</p>
      </div>
    </div>
  );
};

export default Review;
