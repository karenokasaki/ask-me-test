import { Link } from "react-router-dom";

import { QrCodeIcon } from "@heroicons/react/24/outline";

function Navbar() {
   return (
      <nav className="py-7 ">
         <Link
            to="/"
            className="flex items-center justify-center p-10 sm:gap-10 bg-primary-button shadow-md"
         >
            <QrCodeIcon className="w-12 h-12 text-slate-800" />
            <span className="text-5xl tracking-widest text-slate-800">
               Dev Support
            </span>
         </Link>
      </nav>
   );
}

export default Navbar;
