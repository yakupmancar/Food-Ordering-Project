import salieriImg from "../assets/img/salieri.png";
import { IoSearch } from "react-icons/io5";
import { FaBasketShopping } from "react-icons/fa6";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between mt-4">
      <span>
        <img className="w-40" src={salieriImg} />
      </span>
      <section className="flex items-center gap-6 text-xl">
        <Link to="/" className="hover:underline">
          home
        </Link>
        <a className="hover:underline" href="#">
          menu
        </a>
        <a className="hover:underline" href="#">
          mobile app
        </a>
        <a className="hover:underline" href="#">
          contact us
        </a>
      </section>

      <section className="flex items-center gap-8">
        <span className="text-3xl cursor-pointer">
          <IoSearch />
        </span>

        <Link to="/Cart" className="text-4xl text-orange-900 cursor-pointer">
          <FaBasketShopping />
        </Link>

        <div className="flex items-center gap-2 text-xl">
          {/* Oturum açılmışa kullanıcı bilgilerini gösterir. */}
          <SignedIn>
            <UserButton />
            {/* <h1 className="sm:text-base text-sm">{user?.firstName}</h1>/ */}
          </SignedIn>

          {/* Oturum açılmamışsa Signin ve Signout butonları gözükür. */}
          <SignedOut>
            <SignUpButton className="hover:underline" mode="modal" />
            |
            <SignInButton className="hover:underline" mode="modal" />
          </SignedOut>
        </div>
      </section>
    </div>
  );
};

export default Header;
