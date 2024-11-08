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
  const { cart, getCart } = useAppContext();  // Sepet verilerini context'ten çekeriz.
  const userId = useUser().user?.id;  // user bilgisini clerk yardımıyla çekeriz.

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
      <span>
        <img className="w-40" src={salieriImg} />
      </span>
      <section className="flex items-center gap-6 text-xl">
        <Link to="/" className="hover:underline">
          anasayfa
        </Link>
        <Link to="/" className="hover:underline">
          menü
        </Link>
        <a className="hover:underline" href="#">
          bize ulaşın
        </a>
        <Link to="/myOrders" className="hover:underline">
          siparişlerim
        </Link>
      </section>

      <section className="flex items-center gap-8">
        <span className="text-3xl cursor-pointer">
          <IoSearch />
        </span>

        <Link
          to="/Cart"
          className="text-4xl text-orange-900 cursor-pointer relative"
        >
          <FaBasketShopping />
          <h1 className="absolute -top-2 -right-3 text-sm bg-orange-600 text-white rounded-full w-5 flex items-center justify-center">
            {totalItems}
          </h1>
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
