import Link from 'next/link';
import Image from 'next/image';
import { UserButton} from '@clerk/nextjs';
import { useState, useEffect } from 'react';


const Nav = () => {
  
    const [userId, setUserId] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch('/api/example');
            if (response.ok) {
              const data = await response.json();
            //   console.log(data);
              setUserId(data.userId); // Assuming the response has a key 'userId'
            } else {
              console.error('Failed to fetch user data');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);
    // console.log(data);
  return (
    <nav className='flex-between w-[90%] mb-8 pt-3 mx-8'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>BottyRead</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        <div className='flex gap-3 md:gap-5'>
          {userId && (
            <Link href='/notetaking' className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-full text-sm px-5 py-2 text-center me-2.5 mb-1'>
              Notes
            </Link>
          )}
          {!userId && (
            <>
              <Link
                type='button'
                href='sign-in'
                className='text-blue-500 hover:text-black mr-4 '
              >
                Sign In
              </Link>
              <Link
                href='sign-up'
                className='text-blue-500 hover:text-black mr-4 '
              >
                Sign Up
              </Link>
            </>
          )}
          {userId && (
            <div className='ml-auto'>
              <UserButton afterSignOutUrl='/' />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {userId && (
          <Link href='/notetaking' className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-full text-sm px-5 py-2 text-center me-2.5 mb-1'>
            Notes
          </Link>
        )}
        {!userId && (
          <>
            <Link
              type='button'
              href='sign-in'
              className='text-blue-500 hover:text-black mr-4 '
            >
              Sign In
            </Link>
            <Link
              href='sign-up'
              className='text-blue-500 hover:text-black mr-4 '
            >
              Sign Up
            </Link>
          </>
        )}
        {userId && (
          <div className='ml-auto'>
            <UserButton afterSignOutUrl='/' />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
