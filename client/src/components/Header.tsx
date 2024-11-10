import salieriImg from "../assets/img/salieri.png";
import { IoSearch } from "react-icons/io5";
import { FaBasketShopping } from "react-icons/fa6";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";

const Header = () => {
  const { cart, getCart } = useAppContext(); // Sepet verilerini context'ten çekeriz.
  const userId = useUser().user?.id; // user bilgisini clerk yardımıyla çekeriz.

  // Eğer kullanıcı oturum açmışsa, sepet verisi yüklendiğinde çağır;
  useEffect(() => {
    if (userId) {
      getCart(userId);
    }
  }, [userId]);

  // cart verisi henüz yüklenmemişse sıfır gösterir;
  const totalItems = cart && cart.items ? cart.items.length : "";

  return (
    <div className="flex items-center justify-between mt-4">
      <Link to="/">
        <img className="w-24 md:max-w-32 lg:max-w-40" src={salieriImg} />
      </Link>
      <section className="flex items-center gap-2 md:gap-4 lg:gap-6 md:text-lg text-[15px] sm:text-base lg:text-xl">
        <Link to="/" className="hover:underline pr-2 sm:pr-4 md:pr-0">
          anasayfa
        </Link>
        <Link to="/" className="hidden md:block hover:underline">
          menü
        </Link>
        <a className="hidden md:block hover:underline" href="#">
          bize ulaşın
        </a>
        <Link to="/myOrders" className="hover:underline">
          siparişlerim
        </Link>
      </section>

      <section className="flex items-center gap-3 lg:gap-6">
        <span className="hidden md:block text-xl xl:text-2xl cursor-pointer">
          <IoSearch />
        </span>

        <Link
          to="/Cart"
          className="text-2xl xl:text-3xl text-orange-900 cursor-pointer relative"
        >
          <FaBasketShopping />
          {userId ? (
            <h1 className="absolute -right-2 -top-2 md:-right-3 text-xs md:text-sm bg-orange-600 text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
              {totalItems}
            </h1>
          ) : (
            ""
          )}
        </Link>

        <div className="flex items-center gap-1 lg:gap-2 text-sm md:text-base xl:text-xl">
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
