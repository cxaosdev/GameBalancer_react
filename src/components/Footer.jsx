import { FaGithub } from "react-icons/fa";
export default function Footer() {
  return (
    <div className="do-hyeon-regular m-0 p-0 pb-[1rem] text-[#515255]">
      <div className="max-w-[48rem] pl-[2rem]">
        <section className="pt-[2rem]">
          <div className="float-right md:float-none md:mb-[1.25rem] md:flex">
            <div className="text-[1.5rem] font-bold leading-[1.4]">
              Game Balancer
            </div>
          </div>
          <nav className="flex flex-wrap footer__nav md:flex-nowrap">
            <ul className="m-0 flex w-1/3 list-none gap-20 p-0 text-[0.875rem] leading-[1.4] md:mr-[15%]">
              <li className="mb-[1rem]">League of Legends</li>
              <li className="mb-[1rem]">Valorant</li>
            </ul>
          </nav>
        </section>
        <section className="border-t border-[#c3c4c7] pb-[1.5rem] pt-[1.5rem] text-[0.813rem] leading-[1.5] text-[#868B94]">
          <div className="flex items-center">
            <span>
              <a
                href="https://github.com/cxaosdev/GameBalancer_react"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong className="flex items-center">
                  <FaGithub />{" "}
                  <span className="hover:text-indigo-500">cxaosdev</span>
                </strong>
              </a>
            </span>
          </div>
          <div>
            <strong>문의</strong> | <span>scy0723123@gmail.com</span>
          </div>
        </section>
      </div>
    </div>
  );
}
