import { useRecoilState } from "recoil";
import { currentAdminViewState } from "../atoms/currentAdminViewAtom";

import Cards from "../components/admin/Cards";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";
import List from "../views/admin/List";
import Crud from "../views/admin/Crud";

const Admin = () => {
  const [view] = useRecoilState(currentAdminViewState);  
  return (
    <>
      <Sidebar />
      <div className="bg-slate-400 relative md:ml-64">
        <Navbar />
        <Cards />
      </div>
      <div className="bg-gray-200 relative md:ml-64">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex flex-wrap">
            <div className="w-full mb-4 px-4">
              {view === "list" && <List />}
              {view === "crud" && <Crud />}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 relative md:ml-64">
          <Footer />
      </div>
    </>
  );
};
export default Admin;
