import { FaGithub, FaHeadphonesAlt, FaPhone, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="do-hyeon-regular text-[#515255]">
      <div className="px-[1.7rem]">
        <section className="w-100 pt-[0.8rem]">
          <div className="flex justify-between pb-[0.7rem] pr-[0.8rem]">
            <div className="text-[1.4rem]">Game Balancer</div>
          </div>
          <section className="border-t border-[#c3c4c7] pt-[0.7rem] text-[1rem] text-[#868B94]">
            <div className="flex w-[100%] justify-between">
              <nav className="flex footer__nav flex-nowrap">
                <ul className="m-0 flex list-none flex-nowrap gap-20 text-[1rem]">
                  <li
                    className="mb-[1rem] cursor-pointer"
                    onClick={() => navigate("/LeagueOfLegends")}
                  >
                    League of Legends
                  </li>
                  <li
                    className="mb-[1rem] cursor-pointer"
                    onClick={() => navigate("/Valorant")}
                  >
                    Valorant
                  </li>
                </ul>
              </nav>
              <div className="flex flex-col items-end pr-[0.5rem] text-[1rem]">
                <strong className="flex items-center justify-center">
                  <FaPhoneAlt />
                  <span>
                    &nbsp;Contact: scy0723123@gmail.com &nbsp;|&nbsp;&nbsp;
                  </span>
                  <FaGithub />
                  <span className="ml-2 hover:text-indigo-500">cxaosdev</span>
                </strong>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
