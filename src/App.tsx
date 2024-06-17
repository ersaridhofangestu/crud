import {
  DocumentData,
  QuerySnapshot,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from './firebase.init';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaSearch } from 'react-icons/fa';
import { FaRupiahSign, FaTrashCan } from 'react-icons/fa6';
import { BsPlusSquareFill } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import { signOut } from 'firebase/auth';
import Window from './_Window';

interface Members {
  name: string;
  email: string;
  salary: number | '';
  date: string;
  id: string;
}

const App = () => {
  const navigate = useNavigate();
  const [values, setValue] = useState<Members[]>();
  const [rendering, setRendering] = useState<Boolean>(true);
  const [notive, setNotive] = useState<Boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [confirmation, setConfirmation] = useState<Boolean>(false);
  const [isWindow, setWindow] = useState<boolean>(false)

  const data: string | null = localStorage.getItem('email');

  useEffect(() => {
    redData();
    if (window.innerWidth >= 1024) {
      setWindow(true)
    }
  }, [rendering, data, window.innerWidth, isWindow]);

  const redData = async () => {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collection(db, 'members'),
    );
    const value: Members[] | any = querySnapshot.docs.map((doc) => ({
      name: doc.data().name,
      email: doc.data().email,
      salary: doc.data().salary,
      date: doc.data().date,
      id: doc.id,
    }));
    setValue(value);
  };

  const searchData = async (name: string) => {
    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, 'members'),
      );
      const value: Members[] | any = querySnapshot.docs
        .map((doc) => ({
          name: doc.data().name,
          email: doc.data().email,
          salary: doc.data().salary,
          date: doc.data().date,
          id: doc.id,
        }))
        .filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
      setValue(value);
    } catch (error) { }
  };

  const logOut = async () => {
    try {
      localStorage.removeItem('email');
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch (error) { }
  };

  const deleteData = async (id: string, e: any) => {
    e.preventDefault();
    let confirm: Boolean = false;
    confirm = true;
    if (confirm === true && id === id) {
      setMessage('Do you want to delete this data? If yes, click 1x again');
      setTimeout(() => {
        setNotive(false);
      }, 3000);
      if (confirmation === true) {
        setMessage('you have successfully deleted the data');
        setTimeout(async () => {
          await deleteDoc(doc(db, 'members', id));
          setRendering(!rendering);
          confirm = false;
          setNotive(false);
        }, 3000);
      } else {
      }
    }
  };

  return (
    <>
      {isWindow ? (<div className="max-w-[70rem] mx-auto h-screen flex flex-col gap-10 items-center justify-center">
        <div className="bg-white p-10 rounded-md w-full shadow-xl">
          <div className="absolute left-0 right-0 top-0 h-32 flex justify-center items-center">
            <div
              className={`absolute top-0 bg-white border p-3 rounded-md flex items-center gap-3 ${notive ? 'translate-y-10' : '-translate-y-[100%]'} transition-transform duration-500 ease-in-out delay-500`}
            >
              <img
                src="/security-guard.gif"
                alt="security"
                width={30}
                height={30}
              />
              <p className="text-[#0000FF] font-semibold">{message}</p>
            </div>
          </div>
          <nav className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h1 className="capitalize font-bold text-xl order-1">
              from employee
            </h1>
            <div className="w-1/2 h-full flex justify-center items-center bg-transparent rounded-lg border border-[#0000FF] overflow-hidden order-3">
              <input
                className="w-full focus:outline-none px-2 py-1"
                name="search"
                id="search"
                onChange={(e) => searchData(e.target.value)}
                autoComplete="off"
                placeholder="Search name..."
                aria-label={'search'}
              />
              <button
                className="w-10 h-8 bg-gray-200 flex justify-center items-center"
                type="button"
              >
                <FaSearch fill="#0000FF" />
              </button>
            </div>
            <div className="flex gap-4 items-center order-2 md:order-3">
              <div className="md:group/create">
                <Link to={'/create'}>
                  <BsPlusSquareFill fill="blue" size={25} />
                </Link>
                <p className="hidden group-hover/create:block absolute -translate-x-3 -translate-y-14 font-semibold capitalize">
                  craete
                </p>
              </div>
              <button
                onClick={logOut}
                className="flex items-center justify-start gap-2 border border-[#0000FF] rounded-md py-1 px-2 capitalize text-[#0000FF] font-bold hover:bg-[#0000FF] hover:text-white group/login transition-colors duration-300 delay-100 ease-in-out order-2"
              >
                <MdLogout className="text-[#0000FF] group-hover/login:text-white" />
                logout
              </button>
            </div>
          </nav>
          <main className="w-full">
            {values?.length ? (
              <>
                <table className="w-full ">
                  <thead className="border-b-2 capitalize">
                    <tr className="text-center">
                      <th>no</th>
                      <th>full Name</th>
                      <th>Email</th>
                      <th>salary</th>
                      <th>Date</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody className="tbody">
                    {values?.map((item, index) => (
                      <tr key={index}>
                        <td># {index + 1}</td>
                        <td className="text-center">{item.name}</td>
                        <td>{item.email}</td>
                        <td className="flex items-center gap-1">
                          <FaRupiahSign /> {item.salary.toLocaleString('id-ID')}{' '}
                          \-
                        </td>
                        <td className="text-center">
                          {item.date.replace('T', ' ' + ' ')}
                        </td>
                        <td className="flex justify-around items-center mt-1">
                          <button
                            className="flex items-center"
                            onClick={(e) => {
                              deleteData(item.id, e),
                                setNotive(true),
                                setConfirmation(true);
                            }}
                          >
                            <FaTrashCan fill="red" />
                          </button>
                          <Link to={`/edit/${item.id}`}>
                            <FaEdit fill="orange" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="capitalize text-center my-5 font-semibold">
                  amount of data{' '}
                  <span className="font-bold text-blue-500">{values.length}</span>
                </p>
              </>
            ) : (
              <p className="font-semibold text-center">Data is missing...</p>
            )}
          </main>
        </div>
      </div>) : (<Window />)}
    </>
  );
};

export default App;
