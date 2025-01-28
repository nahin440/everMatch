import { Link } from "react-router-dom";

const PremiumCard = ({prem}) => {
     const {image , name , division , age , gender , occupation , _id} = prem;

  return (
    <div>
      <div className="flex justify-center p-4">
        <div
          href="#"
          className="block border rounded-lg p-4 shadow-sm shadow-indigo-100"
        >
          <img
            alt=""
            src={image}
            className="h-56 w-full rounded-md object-cover"
          />

          <div className="mt-2">
            <div>
              <div>
                <p className="sr-only ">Name</p>
                <span className="text-md font-semibold  rounded-md py-0.5 px-4 ">
                  {name}
                </span>
                <p className="sr-only bg-violet-200">Gender</p>
                <span className="text-sm font-semibold text-gray-500 rounded-md py-0.5 px-4 bg-violet-200">
                  {gender}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-8 text-xs">
              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <svg
                  className="size-4 text-indigo-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>

                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">Division</p>

                  <p className="font-medium">{division}s</p>
                </div>
              </div>

              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <svg
                  className="size-4 text-indigo-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>

                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">Occupation</p>

                  <p className="font-medium">{occupation}</p>
                </div>
              </div>

              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <svg
                  className="size-4 text-indigo-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>

                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">Age</p>

                  <p className="font-medium">{age}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="pt-6 flex justify-center">
                <Link to={`/view/${_id}`}>
                  <button className="bg-violet-500 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 hover:bg-violet-600 hover:shadow-lg">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCard;
