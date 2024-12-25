import { Link } from "react-router-dom";
import bg from '/public/error.jpg'

const ErrorPage = () => {
  return (
    <div className="w-full flex items-center justify-center text-white">
      
      <div className="lg:flex justify-center mt-[30px] md:text-center lg:text-left text-center">

        {/* text and button */}
        <div className="p-10">
        <h1 className="text-black font-semibold text-[150px] -mb-10">404</h1>
        <h2 className="text-black text-[44px] font-semibold">Page not found</h2>
        <p className="text-gray-500 text-xl mb-10">The page you are looking for might have been <br />removed,  had its name changed, or is temporarily unavailable.</p>
          <Link to="/" className=" text-white bg-black text-lg font-medium rounded-full px-6 py-4 hover:text-black hover:bg-white hover:border border-black transition-all duration-300 ease-in-out ">
          Go back homepage
        </Link>
        </div>
        
        {/* image */}
        <div>
          <img className="w-full rounded-[100px] md:p-10 lg:p-0 p-5 " src={bg} alt="" />
        </div>
      </div>
     
    </div>
  );
};

export default ErrorPage;
