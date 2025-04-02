import React from 'react';
import { MouseEnterProvider, CardContainer, CardBody, CardItem } from '../components/ui/3d-card';

export const Home = () => {
    return (
      <MouseEnterProvider>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-10 py-10">
          {/* Student Card */}
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white text-center w-full"
              >
                For Students
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center mx-auto"
              >
                Log into an existing account or sign up as a student to apply!
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="students"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-20 w-full">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="http://localhost:3000/register"
                  className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-xs font-bold text-black"
                >
                  Signup
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="a"
                  href="http://localhost:3000/login"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  Login
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
  
          {/* Admin Card */}
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white text-center w-full"
              >
                For Admins
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center mx-auto"
              >
                Manage university accounts and oversee student applications.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src="http://localhost:3001/uploads/EEC_Lecturer.jpg"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="admins"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-20 w-full">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="http://localhost:3000/admin-register"
                  className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-xs font-bold text-black"
                >
                  Signup
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="a"
                  href="http://localhost:3000/admin-login"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  Login
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </MouseEnterProvider>
    );
};  