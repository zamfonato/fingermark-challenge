import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentAdminViewState } from "../../atoms/currentAdminViewAtom";
import logo from "../../assets/img/logo.png";

const Sidebar = () => {
  const [, setView] = useRecoilState(currentAdminViewState);
  return (
    <>
      <nav className="flex md:fixed md:top-0 md:bottom-0 shadow-xl bg-white items-start justify-center  md:w-64 py-4 px-6">
        <div className="items-center justify-center ">
          <img className="w-16 h-16 mt-5 mb-10 animate-bounce" src={logo} alt="" />
          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <Link
                className={"text-xs uppercase py-3 font-bold block "}
                to={"/"}
                onClick={() => setView("list")}
              >
                Kiosks List
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
