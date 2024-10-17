import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="do-hyeon-regular m-0 p-0 pb-[0.5rem] text-[#515255]">
      <div className="px-[2rem]">
        <section className="w-100 pt-[0.5rem]">
          <div className="mb-[1rem] flex items-center justify-between">
            <div className="text-[1.5rem]">Game Balancer</div>
            <div className="flex flex-col items-end pr-[0.5rem] pt-[0.4rem] text-[0.9rem]">
              <a
                href="https://github.com/cxaosdev/GameBalancer_react"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong className="flex items-center">
                  <FaGithub />
                  <span className="ml-2 hover:text-indigo-500">cxaosdev</span>
                </strong>
              </a>
              <div className="mt-2">
                <strong>문의</strong> | <span>scy0723123@gmail.com</span>
              </div>
            </div>
          </div>
          <section className="border-t border-[#c3c4c7] pt-[1.5rem] text-[0.813rem] leading-[1.5] text-[#868B94]">
            <div className="flex w-[100%] justify-stretch">
              <nav className="flex footer__nav flex-nowrap">
                <ul className="m-0 flex list-none flex-nowrap gap-20 p-0 text-[0.875rem] leading-[1.4]">
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
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
