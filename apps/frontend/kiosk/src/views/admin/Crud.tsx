import { useRecoilState } from "recoil";
import { currentAdminViewState } from "../../atoms/currentAdminViewAtom";
import Form from "../../components/admin/Form";
import axios from "axios";
import { AlertParams, KioskType, ServerCrudResponse } from "../../@types";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL

function Crud() {
  const [, setView] = useRecoilState(currentAdminViewState);
  const [alert, setAlert] = useState<AlertParams>();

  const handleBack = () => {
    setView("list");
  };

  const handleSubmit = (kiosk: KioskType, isEditing: boolean) => {    
    const submit = async () => {
      let url = `${BASE_URL}kiosk`;
      if (isEditing) url = url + `/${kiosk.id}`;
      try {        
        const result = (
          isEditing
            ? await axios.patch(url, kiosk)
            : await axios.post(url, kiosk)
        ) as ServerCrudResponse;
        if (result.data.id) {          
          const text = isEditing ? "kiosk edited!" : "kiosk created!";
          setAlert({
            type: "success",
            text,
          });
          setTimeout(() => {
            setView("list");
          }, 3 * 1000);
        }
      } catch (error) {
        console.log(error);
        setAlert({
          type: "danger",
          text: "Oops, something went wrong.",
        });
      }
    };

    if (kiosk.serialKey.trim() === "") {
      setAlert({
        type: "danger",
        text: "Serial key cannot be empty",
      });
      return;
    }

    if (kiosk.description.trim() === "") {
      setAlert({
        type: "danger",
        text: "Description cannot be empty",
      });
      return;
    }

    submit();
  };

  return (
    <>
      <div className="flex justify-end mt-4 mb-4">
        <button
          onClick={handleBack}
          className="text-white p-4 text-center inline-flex items-center justify-center w-20 h-10 shadow-lg rounded-full bg-gray-500"
        >
          Back
        </button>
      </div>
      <div className="flex justify-end mt-4 mb-4">
        <Form
          alert={alert}
          callback={(kiosk, isEditing) => {
            handleSubmit(kiosk, isEditing);
          }}
        />
      </div>
    </>
  );
}
export default Crud;
