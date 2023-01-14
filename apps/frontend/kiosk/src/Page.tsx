import { useRecoilState } from 'recoil';
import nameState from './state/nameState';

function Page() {
    const [name] = useRecoilState(nameState);
    return (
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">
          { `Welcome! ${name}` }
        </p>
        <p className="text-gray-500 text-lg">
          React and Tailwind CSS
        </p>
      </div>
    );
  }
  export default Page;