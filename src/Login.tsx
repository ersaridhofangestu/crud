import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase.init';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';
import { IoLogIn } from 'react-icons/io5';
import Window from './_Window';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [notification, setNotification] = useState<boolean>(false);
  const [type, setType] = useState<boolean>(false);
  const navigate = useNavigate();

  const [isWindow, setWindow] = useState<boolean>(false)

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setWindow(true)
    }
  }, [window])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (email) {
      if (password) {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          await localStorage.setItem('email', email);
          setMessage('You have successfully logged in');
          setNotification(true);
          setTimeout(() => {
            setNotification(false);
            navigate('/dashboard');
          }, 3000);
        } catch (error) {
          setMessage(
            'Please make sure your password and email are correct....',
          );
        }
      } else {
        setMessage('Please enter your password...');
        setNotification(true);
        setTimeout(async () => {
          setNotification(false);
        }, 3000);
      }
    } else {
      setMessage('Please enter your email...');
      setNotification(true);
      setTimeout(async () => {
        setNotification(false);
      }, 3000);
    }
  };



  return (
    <>
      {isWindow ? (
        <div className="max-w-[30rem] mx-auto h-screen flex flex-col gap-5 items-center justify-center">
          <h1 className="text-2xl font-bold capitalize text-[#0000FF]">Login</h1>
          <div
            className={`absolute top-0 bg-white border p-3 rounded-md flex items-center gap-3 ${notification ? 'translate-y-10' : '-translate-y-[100%]'} transition-transform duration-500 ease-in-out delay-500`}
          >
            <img src="/security-guard.gif" alt="security" width={30} height={30} />
            <p className="text-[#0000FF] font-semibold">{message}</p>
          </div>
          <form
            method="post"
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-5 w-full border p-10 rounded-lg shadow-md"
          >
            <div className="w-full flex flex-col">
              <label
                htmlFor="userName"
                className="text-[#0000FF] font-semibold capitalize"
              >
                email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="focus:outline-none border-2 px-2 rounded-md py-1"
                autoComplete="off"
                aria-label={'email'}
              />
            </div>
            <div className="w-full flex flex-col">
              <label
                htmlFor="password"
                className="text-[#0000FF] font-semibold capitalize"
              >
                password
              </label>
              <div className="w-full flex justify-center gap-2 border-2 px-2 rounded-md py-1 ">
                <input
                  id="password"
                  name="password"
                  type={!type ? 'password' : 'text'}
                  className="focus:outline-none  w-full"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  aria-label={'password'}
                />
                <div
                  onClick={() => setType(!type)}
                  className="cursor-pointer opacity-50"
                >
                  {!type ? <GrFormViewHide size={30} /> : <GrFormView size={30} />}
                </div>
              </div>
            </div>
            <div className="md:grid grid-cols-2 w-1/2">
              <button
                type="submit"
                className="flex items-center justify-start gap-2 border border-[#0000FF] rounded-md py-1 px-2 capitalize text-[#0000FF] font-bold hover:bg-[#0000FF] hover:text-white group/login transition-colors duration-300 delay-100 ease-in-out"
              >
                <IoLogIn className="text-[#0000FF] group-hover/login:text-white" />
                submit
              </button>
            </div>
            <p className='text-xs font-thin'>Note: if you want to test the app that I made, please enter your
              <span className='block ml-2 font-semibold'>
                Email: <span className='text-[#0000FF]'> admin@gmail.com </span>
                <br />
                password: <span className='text-[#0000FF]'>17062024</span>
              </span>
              if an error occurs and there are bugs or you want criticism and suggestions regarding the app I made you can contact me at my portofolio <Link className='block text-center mt-2 capitalize font-semibold text-[#0000FF] border-b h-[9px] border-[#0000FF]' to={"https://portofolio-ersaridhofangestus-projects.vercel.app"}><p className='bg-white w-1/3 mx-auto'>ersa ridho fangestu</p></Link></p>
          </form>
        </div>
      ) : (
        <Window />
      )}
    </>
  );
};

export default Login;
