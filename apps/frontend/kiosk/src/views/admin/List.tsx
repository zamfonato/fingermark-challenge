import { useRecoilState } from "recoil";
import { currentAdminViewState } from "../../atoms/currentAdminViewAtom";
import KioskTable from "../../components/admin/KioskTable";

function List() {
  const [, setView] = useRecoilState(currentAdminViewState);

  const handleCreate = () => {
    setView("crud");
  };

  return (
    <>
      <div className="flex justify-end mt-4 mb-4">
        <button
          onClick={handleCreate}
          className="text-white p-4 text-center inline-flex items-center justify-center w-20 h-10 shadow-lg rounded-full bg-indigo-600"
        >
          Create
        </button>
      </div>
      <KioskTable />
    </>
  );
}
export default List;
