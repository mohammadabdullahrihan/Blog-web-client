import logo from "/public/logo.svg";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center text-primary-content p-10">
        <aside>
          <img className="w-[130px] my-4" src={logo} alt="Logo" />
          <p className="font-bold text-lg text-gray-500 ">
            Trusted by Global Game Platforms
          </p>
        </aside>
        <nav className=" grid grid-cols-1 lg:flex ml-[69px] lg:space-x-[250px] ">
          <div className="text-left">
            <div className="flex">
              <div className="">
                <img src={logo} alt="" />
              </div>
  
            </div>
            <h1 className="mt-3 text-gray-500">
              Chill Gamer is the ultimate destination <br /> for playing
              discussing and creating game.
            </h1>
          </div>

          <div>
            <ul className="flex flex-col mt-5 space-y-3 text-gray-500 -ml-[60px] lg:-ml-0  ">
              <h1 className="text-lg font-semibold text-black">Links</h1>
              <li className="">
                <a href="#">All Reviews</a>
              </li>
              <li className="">
                <a href="#">Add Review</a>
              </li>
              <li className="">
                <a href="#">My Reviews</a>
              </li>
              <li className="">
                <a href="#">Wishlist</a>
              </li>
            </ul>
          </div>

          <div>
            <h1 className="lg:text-2xl font-medium mb-5 text-gray-500 -ml-[50px] lg:-ml-0 ">
              Receive notifications about <br /> news and new game releases
            </h1>
            <input
              placeholder="Email"
              type="text"
              className="px-[60px] -ml-[50px] lg:-ml-0 py-7 bg-gray-200 rounded-2xl"
            />
            <button className="px-[50px] -ml-[50px] lg:-ml-8 py-5 text-white bg-black text-lg font-medium rounded-full hover:text-black hover:bg-white hover:border border-black transition-all duration-300 ease-in-out ">
              Send
            </button>
          </div>
        </nav>
        <p className="mt-3 font-medium text-gray-500">
          Copyright © {new Date().getFullYear()} - All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default Footer;
