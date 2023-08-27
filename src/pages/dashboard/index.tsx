import { RadioBtnGroup } from "@/components/Button";

import {  useEffect, useState } from "react";
import { SideBarMenuTranstion, TransitionComp } from "@/components/ui/transition";
import { signOut, useSession } from "next-auth/react";
import { useModal } from "@/components/ui/modalcontext";
import { Icon, IconProps } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Typography, typographyVariants } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import Image from "next/image";
export default function DashboardPage({}) {
  const [dashBoardVisibility, setDashBoardVisibility] = useState(true);
  const [ordersVisibility, setOrdersVisibility] = useState(false);
  const [returnOrdersVisibility, setreturnOrdersVisibility] = useState(false);
  const [addressesVisibility, setAddressesVisibility] = useState(false);
  const [accountDetails, setaccountDetailsVisibility] = useState(false);
  const [walletDetails, setWalletVisibility] = useState(false);
  const [appointments, setappointments] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [chatWithUs, setChatWithUs] = useState(false);
  const [Logout, setLogOut] = useState(false);
  const [Prescription, setPrescription] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const { data: session } = useSession();
  const { setSheetOpen, setModalFixedState } = useModal();

  useEffect(() => {
    setModalFixedState(true);

    !session ? setSheetOpen(true) : setSheetOpen(false);
  }, [session]);

  const setMenuItemVisiblity = (menuName: string, setVisibility: boolean) => {
    if (setVisibility) {
      setMenuItemVisiblity(selectedMenu, false);
      setSelectedMenu(menuName);
    }

    switch (menuName) {
      case "dashboard":
        setDashBoardVisibility(setVisibility);
        break;

      case "orders":
        setOrdersVisibility(setVisibility);
        break;

      case "returnOrders":
        setreturnOrdersVisibility(setVisibility);
        break;

      case "prescrpition":
        setPrescription(setVisibility);
        break;

      case "addresses":
        setAddressesVisibility(setVisibility);
        break;

      case "accountDetails":
        setaccountDetailsVisibility(setVisibility);
        break;

      case "wallet":
        setWalletVisibility(setVisibility);
        break;

      case "appointments":
        setappointments(setVisibility);
        break;

      case "wishlist":
        setWishlist(setVisibility);
        break;

      case "chatWithUs":
        setChatWithUs(setVisibility);
        break;

      case "Logout":
        signOut();
        break;
    }
  };
  interface menuItemProps {
    id: string;
    name: string;
    onClick: () => void;
    iconType: IconProps["type"];
  }

  const menuItems: menuItemProps[] = [
    {
      id: "dashboard",
      name: "Dashboard",
      onClick: () => {
        setMenuItemVisiblity("dashboard", true);
      },
      iconType: "homeIconMenu",
    },
    {
      id: "orders",
      name: "Orders",
      onClick: () => {
        setMenuItemVisiblity("orders", true);
      },
      iconType: "ordersIcon",
    },
    {
      id: "returnOrders",
      name: "Return Orders",
      onClick: () => {
        setMenuItemVisiblity("returnOrders", true);
      },
      iconType: "returnOrdersIcon",
    },
    {
      id: "prescrpition",
      name: "Prescrpition",
      onClick: () => {
        setMenuItemVisiblity("prescrpition", true);
      },
      iconType: "prescriptionIcon",
    },
    {
      id: "addresses",
      name: "Addresses",
      onClick: () => {
        setMenuItemVisiblity("addresses", true);
      },
      iconType: "addressesIcon",
    },
    {
      id: "accountDetails",
      name: "Account Details",
      onClick: () => {
        setMenuItemVisiblity("accountDetails", true);
      },
      iconType: "accountDetailsIcon",
    },
    {
      id: "wallet",
      name: "Wallet",
      onClick: () => {
        setMenuItemVisiblity("wallet", true);
      },
      iconType: "walletIcon",
    },
    {
      id: "appointments",
      name: "Appointments",
      onClick: () => {
        setMenuItemVisiblity("appointments", true);
      },
      iconType: "appointmentsIcon",
    },
    {
      id: "wishlist",
      name: "Wishlist",
      onClick: () => {
        setMenuItemVisiblity("wishlist", true);
      },
      iconType: "wishlistIcon",
    },
    {
      id: "chatWithUs",
      name: "Chat With Us",
      onClick: () => {
        setMenuItemVisiblity("chatWithUs", true);
      },
      iconType: "chatWithUsIcon",
    },
    {
      id: "Logout",
      name: "Log Out",
      onClick: () => {
        setMenuItemVisiblity("Logout", true);
      },
      iconType: "LogoutIcon",
    },
  ];
  const [sideBarShrink, setsidebarShrinked] = useState(false);

  const genders = ["male", "female", "others"];
  return session && session.token ? (
    <div className="container-page min-h-fit flex sm:space-x-10 space-x-0 pt-5 rtl:space-x-reverse">
      <div
        id="separator-sidebar"
        className=" px-1 rounded-md relative py-3"
      >
        <SideBarMenuTranstion isOpen={sideBarShrink} setIsClosed={setsidebarShrinked}>
 
        <ul className="space-y-2 font-medium bg-white  rounded-lg sm:w-60 sm:shadow-md sm:border border-muted sm:p-3 px-2 shadow-none">
         <Image src="https://www.lifepharmacy.com/images/logo.svg" height={200} width={200} alt="home" className="pb-3"/>
         
          {menuItems.map((menuItem, indx) => (
            <li>
              <Button
                onClick={() => menuItem.onClick()}
                variant={selectedMenu ===menuItem.id ? "default":"outline"}
                className={ "w-full border-none justify-start"}
              >
                <Icon type={menuItem.iconType} />
                <Typography className={"mx-3 "}>
                  {menuItem.name}
                </Typography>
              </Button>
            </li>
          ))}
      
        </ul>
        </SideBarMenuTranstion>

      
        <Button
          onClick={() => setsidebarShrinked(!sideBarShrink)}
          size={"sm"}
          className="absolute -left-3 w-8 h-11 top-0 bottom-0 h my-auto sm:hidden block"
        >
          <Icon type="chevronRightIcon" />
        </Button>
      </div>
      <div className="w-full">
        {dashBoardVisibility ? (
          <TransitionComp setTransition={dashBoardVisibility}>
            <div className="py-4 w-full space-y-3 ">
              <div className="w-full py-5 px-3 rounded-lg border-muted border text-sm space-y-4">
                <div className="flex space-x-2 flex-wrap rtl:space-x-reverse">
                  <Typography>Hello</Typography>
                  <Typography bold={"bold"}>
                    {session && session.user ? session?.user.name : "User"} !
                  </Typography>
                </div>

                <Typography size={"xs"}>
                  From your account dashboard you can view your recent orders,
                  manage your shipping and billing addresses, and edit your
                  account details.
                </Typography>
              </div>
              <Typography size={"lg"} bold={"bold"}>
                Recent Purchases
              </Typography>

              <div className="w-full py-5 px-3 rounded-lg border-muted border  space-y-4 sm:text-sm text-xs">
                <Typography size={"sm"}>
                  <i>You don't have any product yet!</i>
                </Typography>
              </div>
            </div>
          </TransitionComp>
        ) : null}

        {ordersVisibility ? (
          <TransitionComp setTransition={ordersVisibility}>
            <div className="py-4 w-full space-y-4 sm:text-sm text-xs">
              <Typography size={"sm"}>
                <i>No order has been made yet.</i>
              </Typography>
              <Button
                variant={"outline"}
                iconRight={<Icon type="chevronRightIcon" sizes={"sm"} />}
              >
                GO SHOP
              </Button>
            </div>
          </TransitionComp>
        ) : null}

        {returnOrdersVisibility ? (
          <TransitionComp setTransition={returnOrdersVisibility}>
            <div className="py-4 w-full space-y-4 sm:text-sm text-xs">
              <Typography size={"sm"}>
                <i>No return order has been made yet.</i>
              </Typography>
              <Button
                variant={"outline"}
                iconRight={<Icon type="chevronRightIcon" sizes={"sm"} />}
              >
                GO SHOP
              </Button>
            </div>
          </TransitionComp>
        ) : null}

        {Prescription ? (
          <TransitionComp setTransition={Prescription}>
            <div className="py-4 w-full space-y-5 ">
              <div className="space-y-3">
                <Typography size={"lg"} bold={"bold"}>
                  Prescriptions
                </Typography>
                <Typography size={"sm"}>
                  <i>No prescription has been made yet.</i>
                </Typography>
              </div>
              <Button variant={"outline"} iconRight={<Icon type="plusIcon" />}>
                ADD PRESCRIPTION
              </Button>
            </div>
          </TransitionComp>
        ) : null}

        {addressesVisibility ? (
          <TransitionComp setTransition={addressesVisibility}>
            <div className="py-4 w-full space-y-5">
              <div className="space-y-3">
                <Typography size="sm">
                  The following addresses will be used on the checkout page by
                  default.
                </Typography>
                <div className="flex space-x-2 items-center rtl:space-x-reverse">
                  <Icon type="locationPinIcon" sizes={"sm"} />
                  <Typography variant={"lifeText"} bold={"bold"}>
                    Addresses
                  </Typography>
                </div>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-3">
                {session.token.addresses.length > 0
                  ? session.token.addresses.map((addr: any) => (
                      <div className="border-muted border shadow-md rounded-lg px-4 py-3 space-y-4 h-full flex flex-col justify-between ">
                        <div className="space-y-2">
                          <Typography
                            size={"sm"}
                            bold={"bold"}
                            variant={"lifeText"}
                          >
                            {addr.type}
                          </Typography>
                          <div className="w-full bg-[#dee2e6] mx-auto h-[1px]"></div>
                          <div>
                            <Typography
                              size={"xs"}
                              bold={"semibold"}
                              className="mb-2"
                            >
                              {addr.name}
                            </Typography>
                            <Typography size={"xs"}>
                              {addr.google_address}
                            </Typography>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <Button
                            variant={"white"}
                            size={"sm"}
                            className={typographyVariants({
                              variant: "primary",
                              size: "sm",
                            })}
                          >
                            Edit
                          </Button>

                          <Button
                            variant={"white"}
                            size={"xs"}
                            className={typographyVariants({
                              variant: "danger",
                              size: "sm",
                            })}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  : null}
                <Button variant={"outline"} iconLeft={true} iconType="editIcon">
                  New Address
                </Button>
              </div>
            </div>
          </TransitionComp>
        ) : null}

        {accountDetails ? (
          <TransitionComp setTransition={accountDetails}>
            <div className=" w-full px-4 py-5 border border-muted rounded-lg h-fit">
              <form className="space-y-6 mb-4">
                <div className="w-full space-y-2">
                  <Typography requiredField={true}>Full Name</Typography>
                  <Input
                    sizes={"sm"}
                    type="text"
                    name="state"
                    defaultValue={session.token.name ? session.token.name : ""}
                    onBlur={(e) => {
                      e.target.value === ""
                        ? e.target.classList.add("border-red-500")
                        : e.target.classList.remove("border-red-500");
                    }}
                    placeholder="Full Name *"
                    required
                  />
                  <Typography size={"xs"}>
                    Here is shown your first and last name.
                  </Typography>
                </div>

                <div className="w-full space-y-2">
                  <Typography requiredField={true}>
                    {session.token.email ? "Email Address" : "Phone Number"}
                  </Typography>
                  <Input
                    sizes={"sm"}
                    type="text"
                    name="state"
                    defaultValue={
                      session.token.email
                        ? session.token.email
                        : session.token.phone
                    }
                    onBlur={(e) => {
                      e.target.value === ""
                        ? e.target.classList.add("border-red-500")
                        : e.target.classList.remove("border-red-500");
                    }}
                    placeholder={
                      session.token.email ? "Email Address *" : "Phone Number *"
                    }
                    required
                  />
                </div>

                <div className="w-full space-y-2">
                  <Typography size={"sm"}>Gender (optional)</Typography>
                  <ul className="flex flex-wrap">
                    {genders.map((item) => (
                      <li>
                        <RadioBtnGroup id={item} value={item} name="gender" />
                      </li>
                    ))}
                  </ul>
                </div>
              </form>
              <Button
                size={"lg"}
                iconRight={<Icon type="chevronRightIcon" sizes={"sm"} />}
              >
                SAVE CHANGES
              </Button>
            </div>
          </TransitionComp>
        ) : null}

        {walletDetails ? (
          <TransitionComp setTransition={walletDetails}>
            <div className="space-y-3 w-full ">
              <div className="bg-[#f4f7ff] p-3 rounded-lg w-full space-x-1 rtl:space-x-reverse sm:text-sm text-xs">
                <Typography bold={"bold"}>Wallet Balance: </Typography>
                <Typography variant={"lifeText"} size={"sm"} bold={"semibold"}>
                  AED {session?.token.wallet_balance}.00
                </Typography>
              </div>
              <div className="border border-muted rounded-lg p-5 space-y-3">
                <Typography size={"sm"}>
                  <i>No transactions has been made yet.</i>
                </Typography>
                <Button
                  variant={"outline"}
                  iconRight={<Icon type="chevronRightIcon" sizes={"sm"} />}
                >
                  GO SHOP
                </Button>
              </div>
            </div>
          </TransitionComp>
        ) : null}

        {appointments ? (
          <TransitionComp setTransition={appointments}>
            <div className="py-4 w-full  flex sm:flex-row flex-col justify-between ">
              <div className="space-y-5">
                <div className="space-y-5">
                  <Typography bold={"bold"} size={"lg"}>
                    Appointments
                  </Typography>
                  <Typography size={"sm"}>
                    No appointment has been made yet.
                  </Typography>
                </div>
                <Button
                  size={"lg"}
                  iconRight={<Icon type="chevronRightIcon" />}
                >
                  BOOK HOME PCR TEST
                </Button>
              </div>
              <Button
                variant={"outline"}
                iconLeft={true}
                iconType="plusIcon"
                className="h-fit"
              >
                Add an Appointment
              </Button>
            </div>
          </TransitionComp>
        ) : null}
      </div>
    </div>
  ) : (
    <div className="h-[500px] w-full bg-white"></div>
  );
}
