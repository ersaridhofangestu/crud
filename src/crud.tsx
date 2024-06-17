import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase.init';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdCancelScheduleSend } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';
import Window from './_Window';

const Crud = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [salary, setSalary] = useState<number | ''>('');
  const [date, setDate] = useState<string>('');
  const [message, setMessage] = useState<string | any>();
  const [notification, setNotification] = useState<boolean>(false);

  const [isWindow, setWindow] = useState<boolean>(false)

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
    if (window.innerWidth >= 1024) {
      setWindow(true)
    }
  }, [id, window.innerWidth]);

  const fetchData = async (id: string) => {
    const docRef = doc(db, 'members', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setFullName(data.name);
      setEmail(data.email);
      setSalary(data.salary);
      setDate(data.date);
    }
  };

  const updateData = async (id: string, e: React.FormEvent) => {
    e.preventDefault();
    const docRef = doc(db, 'members', id);
    await updateDoc(docRef, {
      name: fullName,
      email: email,
      salary: salary,
      date: date,
    });
    setMessage('Document successfully updated!');
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
      navigate('/dashboard');
    }, 3000);
  };

  const createData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName) {
      if (email) {
        if (salary) {
          if (date) {
            try {
              await addDoc(collection(db, 'members'), {
                name: fullName,
                email: email,
                salary: salary,
                date: date,
              });
              setNotification(true);
              setMessage('Document created successfully');
              setTimeout(() => {
                setNotification(false);
                navigate('/dashboard');
              }, 3000);
            } catch (error) {
              setMessage(error);
              setNotification(true);
              setTimeout(() => {
                setNotification(false);
              }, 3000);
            }
          } else {
            setMessage('Please enter your entry date...');
            setNotification(true);
            setTimeout(() => {
              setNotification(false);
            }, 3000);
          }
        } else {
          setMessage('Please enter your salary...');
          setNotification(true);
          setTimeout(() => {
            setNotification(false);
          }, 3000);
        }
      } else {
        setMessage('Please enter your email...');
        setNotification(true);
        setTimeout(() => {
          setNotification(false);
        }, 3000);
      }
    } else {
      setMessage('Please enter your name...');
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 3000);
    }
  };

  return (
    <>
      {isWindow ? (
        <div className="max-w-[30rem] mx-auto h-screen flex flex-col gap-5 items-center justify-center">
          <h1 className="text-2xl font-bold capitalize text-[#0000FF]">
            craete / edit
          </h1>
          <div
            className={`absolute top-0 bg-white border p-3 rounded-md flex items-center gap-3 ${notification ? 'translate-y-10' : '-translate-y-[100%]'} transition-transform duration-500 ease-in-out delay-500`}
          >
            <img src="/security-guard.gif" alt="security" width={30} height={30} />
            <p className="text-[#0000FF] font-semibold">{message}</p>
          </div>
          <form
            method="post"
            onSubmit={(e) => (id ? updateData(id, e) : createData(e))}
            className="flex flex-col gap-5 w-full border p-10 rounded-lg shadow-md"
          >
            <div className="w-full flex flex-col">
              <label
                htmlFor="fillName"
                className="text-[#0000FF] font-semibold capitalize"
              >
                Full Name
              </label>
              <input
                placeholder="Enter your name..."
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                name="fullName"
                className="focus:outline-none border-2 px-2 rounded-md py-1"
                autoComplete="off"
                aria-label={'fullName'}
              />
            </div>
            <div className="w-full flex flex-col">
              <label
                htmlFor="email"
                className="text-[#0000FF] font-semibold capitalize"
              >
                Email
              </label>
              <input
                placeholder="Enter your email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="focus:outline-none border-2 px-2 rounded-md py-1"
                autoComplete="off"
                aria-label={'email'}
              />
            </div>
            <div className="w-full flex flex-col">
              <label
                htmlFor="salary"
                className="text-[#0000FF] font-semibold capitalize"
              >
                Salary (Rp)
              </label>
              <input
                placeholder="Enter your salary"
                id="salary"
                type="number"
                value={salary === '' ? '' : salary.toString()}
                onChange={(e) =>
                  setSalary(e.target.value === '' ? '' : Number(e.target.value))
                }
                name="salary"
                className="focus:outline-none border-2 px-2 rounded-md py-1"
                autoComplete="off"
                aria-label={'salary'}
              />
            </div>
            <div className="w-full flex flex-col">
              <label
                htmlFor="date"
                className="text-[#0000FF] font-semibold capitalize"
              >
                Date
              </label>
              <input
                type="datetime-local"
                name="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="focus:outline-none border-2 px-2 rounded-md py-1"
                autoComplete="off"
                aria-label={'data'}
              />
            </div>
            <div className="grid grid-cols-2 w-1/2 gap-1">
              <button
                type="submit"
                className="flex items-center justify-start gap-2 border border-[#0000FF] rounded-md py-1 px-2 capitalize text-[#0000FF] font-bold hover:bg-[#0000FF] hover:text-white group/login transition-colors duration-300 delay-100 ease-in-out"
              >
                <IoIosSend className="text-[#0000FF] group-hover/login:text-white" />
                submit
              </button>
              <Link
                to={'/dashboard'}
                className="flex items-center justify-start gap-2 border border-[#0000FF] rounded-md py-1 px-2 capitalize text-[#0000FF] font-bold hover:bg-[#0000FF] hover:text-white group/login transition-colors duration-300 delay-100 ease-in-out"
              >
                <MdCancelScheduleSend className="text-[#0000FF] group-hover/login:text-white" />
                cancle
              </Link>
            </div>
          </form>
        </div>
      ) : (<Window />)}
    </>
  );
};

export default Crud;
