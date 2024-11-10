import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-gray-300 mt-20 pt-20 pb-10 px-10">
      <div className="flex flex-col gap-14 md:flex md:flex-row md:justify-between max-w-[1380px] mx-auto text-sm md:text-base">
        <section className="md:w-[40%] flex flex-col md:gap-4">
          <h1
            style={{ fontFamily: "Italianno"}}
            className="text-6xl font-bold text-orange-500"
          >
            Salieri's Restaurant.{" "}
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            ex consequatur repellendus corporis! Nobis, laudantium! Quo hic nisi
            sapiente delectus consequuntur fugit ducimus. Consectetur maiores
            praesentium odio dolor laboriosam obcaecati alias omnis ut, tempora
            sequi!
          </p>
          <div className="flex gap-5 pt-5 md:pt-0">
            <span className="border-[3px] border-gray-400 rounded-full p-2 cursor-pointer hover:border-gray-200 transition-all duration-200">
              <FaFacebookF />
            </span>
            <span className="border-[3px] border-gray-400 rounded-full p-2 cursor-pointer hover:border-gray-200 transition-all duration-200">
              {" "}
              <FaXTwitter />
            </span>
            <span className="border-[3px] border-gray-400 rounded-full p-2 cursor-pointer hover:border-gray-200 transition-all duration-200">
              {" "}
              <FaLinkedinIn />
            </span>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">COMPANY</h1>
          <div className="flex flex-col gap-2">
            <a className="hover:underline" href="#">
              Anasayfa
            </a>
            <a className="hover:underline" href="#">
              Hakkımızda
            </a>
            <a className="hover:underline" href="#">
              Teslimat
            </a>
            <a className="hover:underline" href="#">
              Gizlilik Politikası
            </a>
          </div>
        </section>
        <section className=" flex flex-col gap-4">
          <h1 className="text-3xl font-bold">BİZE ULAŞIN</h1>
          <span>+90-534-732-4540</span>
          <span>yakupmancar@hotmail.com</span>
        </section>
      </div>

      <div className="border-2 border-gray-400 border-t mx-auto max-w-[1550px] my-10"></div>

      <div className="text-xl text-center">
      Copyright 2024 © Salieri.com - Tüm Hakları Saklıdır.
      </div>
    </div>
  );
};

export default Footer;
