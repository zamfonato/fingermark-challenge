import axios from "axios";
import { useEffect, useState } from "react";
import {
  KioskType,
  TitleProps,
  TdProps,
  ThProps,
  TableProps,
  ServerCrudResponse,
  AlertParams,
} from "../../@types";
import { useRecoilState } from "recoil";
import { currentKioskState } from "../../atoms/currentKioskAtom";
import { currentAdminViewState } from "../../atoms/currentAdminViewAtom";
import { kioskListState } from "../../atoms/kioskListAtom";
import moment from "moment";
import Alert from "../common/Alert";

const BASE_URL = import.meta.env.VITE_BASE_URL

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 className={"font-semibold text-lg  text-blueGray-700"}>
            {children}
          </h3>
        </div>
      </div>
    </div>
  );
};

const Td: React.FC<TdProps> = ({ children }) => {
  return (
    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
      {children}
    </td>
  );
};

const Th: React.FC<ThProps> = ({ children }) => {
  return (
    <th
      className={
        "px-6 align-middle border border-solid py-3" +
        " text-xs uppercase border-l-0 border-r-0 " +
        "whitespace-nowrap font-semibold text-left " +
        "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
      }
    >
      {children}
    </th>
  );
};

const Table: React.FC<TableProps> = ({ items, edit, remove }) => {
  return (
    <table className="items-center w-full bg-transparent border-collapse">
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>SERIAL KEY</Th>
          <Th>DESCRIPTION</Th>
          <Th>OPEN AT</Th>
          <Th>CLOSES AT</Th>
          <Th>CLOSED</Th>
          <Th>EDIT</Th>
          <Th>DELETE</Th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((kiosk, index) => (
            <tr key={index}>
              <Td>{kiosk.id}</Td>
              <Td>{kiosk.serialKey}</Td>
              <Td>{kiosk.description}</Td>
              <Td>{moment(kiosk.storeOpensAt).format("LT")}</Td>
              <Td>{moment(kiosk.storeClosesAt).format("LT")}</Td>
              <Td>{kiosk.isKioskClosed ? "Yes" : "No"}</Td>
              <Td>
                <i
                  onClick={() => {
                    edit(kiosk.id);
                  }}
                  className="far fa-edit text-green-500 cursor-pointer"
                ></i>
              </Td>
              <Td>
                <i
                  onClick={() => {
                    remove(kiosk.id);
                  }}
                  className="fas fa-trash text-red-500 cursor-pointer"
                ></i>
              </Td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              className="border-t-0  text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              colSpan={8}
            >
              No items
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
const KioskTable = () => {
  const [kiosks, setKiosks] = useRecoilState(kioskListState);
  const [, setCurrentKiosk] = useRecoilState(currentKioskState);
  const [, setView] = useRecoilState(currentAdminViewState);
  const [, setCurrentId] = useRecoilState(currentKioskState);
  const [alert, setAlert] = useState<AlertParams>();

  const handleEdit = (id: string) => {
    setCurrentKiosk(id);
    setView("crud");
  };

  const handleDelete = (id: string) => {
    const deleteKiosk = async () => {
      const result = (await axios.delete(
        `${BASE_URL}kiosk/${id}`
      )) as ServerCrudResponse;
      if (result.data.message.includes("Deleted Kiosk")) {
        setAlert({ type: "success", text: "kiosk deleted!" });
        setTimeout(() => setAlert(undefined), 2000);
        setKiosks(
          kiosks.filter((kiosk) => {
            if (kiosk.id !== id) {
              return kiosk;
            }
          })
        );
      }
    };
    deleteKiosk();
  };

  useEffect(() => {    
    const fetchData = async () => {
      const result = await axios.get(`${BASE_URL}kiosk`);
      setKiosks(result.data);
    };
    fetchData();
    setCurrentId("");
  }, []);

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded  bg-white"
        }
      >
        <Title>Kiosks List</Title>
        <div className="block w-full overflow-x-auto">
          {alert ? <Alert type={alert.type} text={alert.text} /> : <></>}
          <Table items={kiosks} edit={handleEdit} remove={handleDelete} />
        </div>
      </div>
    </>
  );
};
export default KioskTable;
