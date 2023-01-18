import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { kioskListState } from "../../atoms/kioskListAtom";
import {
  CheckProps,
  FormProps,
  KioskType,
  Meridiem,
  TimePickerProps,
} from "../../@types";
import { currentKioskState } from "../../atoms/currentKioskAtom";
import moment from "moment";
import Alert from "../common/Alert";

const TimePicker: React.FC<TimePickerProps> = ({
  label,
  callback,
  defaultValue,
}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [meridiem, setMeridiem] = useState<Meridiem>("AM");
  useEffect(() => {
    const current = moment(`${hours}:${minutes} ${meridiem}`, "LT");
    callback(current.toDate());
  }, [hours, minutes, meridiem]);
  useEffect(() => {
    if (defaultValue) {
      const removeTimeZone = moment(defaultValue, "YYYY-MM-DDTHH:mm:ss");
      const dateToStrTime = moment(removeTimeZone).format("LT");
      const split = dateToStrTime.split(" ");
      const time = split[0].split(":");
      const me = split[1];
      const h = Number(time[0]);
      const m = Number(time[1]);
      setHours(h);
      setMinutes(m);
      setMeridiem(me as Meridiem);
    }
  }, [defaultValue]);
  return (
    <div className="w-full lg:w-6/12 px-4">
      <div className="relative w-full mb-3">
        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
          {label}
        </label>
        <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
          <select
            value={hours}
            key={"selectHour"}
            onChange={(e) => setHours(Number(e.target.value))}
            className="px-2 outline-none appearance-none bg-transparent"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => {
              return (
                <option key={`optHour${hour}`} value={hour}>
                  {hour}
                </option>
              );
            })}
          </select>
          <span className="px-2">:</span>
          <select
            value={minutes}
            key={"selectMinutes"}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="px-2 outline-none appearance-none bg-transparent"
          >
            {Array.from({ length: 60 }, (_, i) => i).map((minutes) => {
              return (
                <option key={`optSecond${minutes}`} value={minutes}>
                  {minutes}
                </option>
              );
            })}
          </select>
          <select
            value={meridiem}
            key={"selectMeridiem"}
            onChange={(e) => setMeridiem(e.target.value as Meridiem)}
            className="px-2 outline-none appearance-none bg-transparent"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const Check: React.FC<CheckProps> = ({ enabled, labels, callback }) => {
  const [checked, setChecked] = useState<boolean>();
  useEffect(() => {
    setChecked(enabled ? true : false);
  }, [enabled]);
  const handleToggle = () => {
    setChecked(!checked);
    callback(!checked);
  };
  return (
    <>
      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
        {checked ? labels[0] : labels[1]}
      </label>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          defaultChecked={checked}
          onClick={handleToggle}
        />
        <div className="w-11 h-6 bg-gray-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </>
  );
};

const Form: React.FC<FormProps> = ({ callback, alert }) => {
  const [currentId] = useRecoilState(currentKioskState);
  const [kiosks] = useRecoilState(kioskListState);

  const [id, setId] = useState<String>("");
  const [serialKey, setSerialKey] = useState<String>("");
  const [description, setDescription] = useState<String>("");
  const [isKioskClosed, setIsKioskClosed] = useState<Boolean>(false);
  const [storeOpensAt, setStoreOpensAt] = useState<Date>(new Date());
  const [storeClosesAt, setStoreClosesAt] = useState<Date>(new Date());
  const [isEditing, setEditing] = useState<boolean>();

  useEffect(() => {
    const editing = currentId.trim() !== "";
    setEditing(editing);
    if (editing) {
      const k = kiosks.find((item) => item.id === currentId);
      if (!k) return;
      setId(k.id);
      setSerialKey(k.serialKey);
      setDescription(k.description);
      setIsKioskClosed(k.isKioskClosed);
      setStoreOpensAt(k.storeOpensAt);
      setStoreClosesAt(k.storeClosesAt);      
    }
  }, []);

  const renderCheck = useMemo(() => {
    let enabled = isEditing ? true : false;
    if (enabled && isKioskClosed) {
      enabled = !isKioskClosed.valueOf();
    }
    return (
      <Check
        callback={(opened) => {
          setIsKioskClosed(!opened);
        }}
        labels={["OPENED", "CLOSED"]}
        enabled={enabled}
      />
    );
  }, [isEditing, isKioskClosed]);

  const renderStoreOpensAt = useMemo(() => {
    return (
      <TimePicker
        defaultValue={isEditing && storeOpensAt ? storeOpensAt : new Date()}
        label="Opens at"
        callback={(d: Date) => {
          setStoreOpensAt(d);
        }}
      />
    );
  }, [isEditing]);

  const renderStoreClosesAt = useMemo(() => {
    return (
      <TimePicker
        defaultValue={isEditing && storeClosesAt ? storeClosesAt : new Date()}
        label="Closes at"
        callback={(d: Date) => {
          setStoreClosesAt(d);
        }}
      />
    );
  }, [isEditing]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              {isEditing ? `Kiosk [${id}]` : "New kiosk"}
            </h6>
            <button
              onClick={() => {
                const kiosk: KioskType = {
                  id,
                  serialKey,
                  description,
                  isKioskClosed,
                  storeOpensAt,
                  storeClosesAt,
                };
                const edit = isEditing?.valueOf() ? true : false;
                callback(kiosk, edit);
              }}
              className="bg-emerald-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Save
            </button>
          </div>
        </div>
        {alert ? <Alert type={alert.type} text={alert.text} /> : <></>}
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Serial Key
                  </label>
                  <input
                    onChange={({ target: { value } }) => {
                      setSerialKey(value);
                    }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={serialKey.toString()}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">{renderCheck}</div>
              </div>
              {renderStoreOpensAt}
              {renderStoreClosesAt}
            </div>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Description
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <textarea
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={({ target: { value } }) => {
                      setDescription(value);
                    }}
                    value={description.toString()}
                    rows={4}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
