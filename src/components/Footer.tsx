const Footer = () => {
  return (
    <footer className="bg-primary flex flex-col sm:flex-row bottom-0 mt-1 justify-evenly items-center w-full text-white font-roboto">
      <div className="flex-col mr-80 mt-2 sm:mr-0 sm:mt-0">
        <a href="/">
          <img
            className="flex justify-start sm:self-auto h-11 w-11 ml-3"
            src="../../logo.png"
            alt="Company Logo"
          ></img>
          <div className="font-cursive font-semibold text-2xl">gebeya</div>
        </a>
      </div>
      <div className="flex-col self-start mb-4 ml-2">
        <div className="font-semibold text-xl mb-2">Contact Us</div>
        <ul className="list-disc pl-8">
          <li>Phone Number: +251 917171717</li>
          <li>Email: gebeya@et.com</li>
          <li>Telegram: t.me/gebeya</li>
        </ul>
      </div>
      <div className="flex-col self-start mb-4 ml-2">
        <div className="font-semibold text-xl mb-2">Popular Catagories</div>
        <ul className="list-disc pl-8">
          <li>Shoes</li>
          <li>Electronics</li>
          <li>Supplements</li>
          <li>Cars</li>
          <li>Clothes</li>
        </ul>
      </div>
      <div className="flex-col self-start mb-4 ml-2">
        <div className="font-semibold text-xl mb-2">Customer Services</div>
        <ul className="list-disc pl-8">
          <li>About Us</li>
          <li>Terms & Conditions</li>
          <li>FAQ</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
