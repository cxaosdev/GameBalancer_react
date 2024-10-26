import { FaGithub, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="do-hyeon-regular fixed bottom-0 left-0 z-[1000] h-[5.5rem] w-full px-[0.6rem] text-[#515255]">
      <section className="w-100 bg-transparent pt-[0.4rem]">
        <div className="flex justify-between bg-transparent pb-[0.2rem] pr-[0.8rem]">
          <div className="text-[1.2rem]">Game Balancer</div>
        </div>
        <section className="text-[0.9rem] text-[#868B94]">
          <div className="flex w-[100%] justify-between">
            <nav className="footer__nav flex flex-nowrap">
              <ul className="m-0 flex list-none flex-col flex-nowrap gap-0 p-0">
                <li
                  className="cursor-pointer"
                  onClick={() => navigate("/LeagueOfLegends")}
                >
                  League of Legends 〉
                </li>
                <li
                  className="mb-[1rem] cursor-pointer"
                  onClick={() => navigate("/Valorant")}
                >
                  Valorant 〉
                </li>
              </ul>
            </nav>
            <div className="fixed bottom-0 right-[2rem] flex items-end text-[1rem]">
              <div className="flex items-center">
                <FaPhoneAlt />
                <span>&nbsp;Contact: scy0723123@gmail.com &nbsp;</span>
              </div>
              <div className="mt-1 flex items-center">
                <FaGithub />
                <span className="ml-2 cursor-pointer hover:text-indigo-500">
                  cxaosdev
                </span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
