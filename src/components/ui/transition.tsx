import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { RadioGroup } from "@headlessui/react";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { Button } from "./button";
import { Icon } from "./icons";
const TransitionComp = ({
  setTransition,
  children,
}: {
  setTransition: any;
  children: any;
}) => {
  const [isShowing, setIsShowing] = useState(setTransition);

  return (
    <Transition
      appear
      show={isShowing}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Transition.Child
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {children}
      </Transition.Child>
    </Transition>
  );
};

const LgSearchMenuTransition = ({ children }: { children: any }) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {children}
    </Transition>
  );
};

const SideBarMenuTranstion = ({
  children,
  isOpen,
  IsSideBarMenu,
  setIsClosed,
}: {
  children: any;
  isOpen: any;
  IsSideBarMenu?:boolean;
  setIsClosed: any;
}) => {
  const { width } = useWindowDimensions();

  return (
    width < 575 || IsSideBarMenu?
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsClosed}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`fixed inset-0   ${IsSideBarMenu ? "":"bg-black bg-opacity-25"}`} />
        </Transition.Child>

        <div className="fixed inset-y-0  overflow-y-auto   mx-auto">
          <div className="flex min-h-full items-center relative justify-center  text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 "
              enterFrom="opacity-0 scale-95 -translate-x-1/2 "
              enterTo="opacity-100 scale-100 translate-x-1/2"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="fixed inset-y-0 w-[calc(50vh-160px)] transform  pt-5 overflow-hidden bg-white text-left align-middle shadow-xl transition-all">
                
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
    :<div>{children}</div>
  );
};

export { TransitionComp, LgSearchMenuTransition, SideBarMenuTranstion };
