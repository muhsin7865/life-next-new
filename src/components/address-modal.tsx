import ModalContainer from "./ui/modal-container";
import React, { useEffect, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { signIn, useSession } from "next-auth/react";
import { useModal } from "./ui/modalcontext";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";
import { Icon } from "./ui/icons";
import { useForm } from "react-hook-form";
import getSessionDataAddress from "@/lib/getSessionAddress";
import { Input, inputVariants } from "./ui/input";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdownMenu";
import { useLanguage } from "@/hooks/useLanguage";
const AddressModal = () => {
  const [addnewAddressFormVisibility, setaddnewAddressFormVisibility] =
    useState(false);
  const [addNewAddressClick, setAddNewAddressClick] = useState(true);
  const { data: session } = useSession();
  const [countriesData, setCountriesData] = useState<any>(null);
  const { countries, currentCountry } = useLanguage();

  const deliveryOptions = ["Home", "Other"];
  const [deliverToTypes, setDeliverTo] = useState("Home");

  const [selectedCountry, setCountrySelected] = useState<any>(currentCountry);
  const {
    setaddNewAddress,
    addNewAddress,
    setAddressDataIndex,
    AddressDataIndex,
    availableAddresses,
    setavailableAddresses,
    selectedCountryData,
    setSelectedCountryData,
    setCountriesDrawerState,
    setFormData,
    formDataInitState,
  } = useModal();

  const addressFormOnSubmit = (data: any): void => {
    debugger;
    saveAddresstoDb({
      ...formDataInitState,
      ...data,
      ...{
        phone: "+" + selectedCountryData[0].callingCodes + getValues("phone"),
      },
    });
  };

  function saveAddresstoDb(formDatas: any) {
    debugger;
    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDatas),
    };
    fetch(
      "https://prodapp.lifepharmacy.com/api/user/save-address",
      requestOptions
    )
      .then((response) => {
        debugger;
        if (response.ok) {
          setAddressDataIndex(0);
          setaddNewAddress(false);
          setaddnewAddressFormVisibility(false);
          setFormData(formDataInitState);
        } else {
          throw new Error("Request failed");
        }
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error while fetching search data", error));
  }

  function setCloseModal() {
    setaddNewAddress(false);
    setaddnewAddressFormVisibility(false);
  }

  const [addressData, setAddressData] = useState<any>(null);

  useEffect(() => {
    session?
    getSessionDataAddress(session?.token.token).then((res) => {
      setAddressData(res.data.addresses);
    })
    :null
  }, [addnewAddressFormVisibility]);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v2/region/Asia?fields=name,alpha2Code,callingCodes"
    )
      .then((res) => res.json())
      .then((countriesData) => {
        setCountriesData(countriesData);
        const selectedCountriesDatas = countriesData.filter(
          (countryData: any) => countryData.alpha2Code === "AE"
        );
        setSelectedCountryData(selectedCountriesDatas);
      });
  }, []);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <ModalContainer
      size={"lg"}
      showModal={session && addNewAddress ? true : false}
      setCloseModal={setCloseModal}
    >
      {addNewAddressClick && session?.token.addresses.length === 0 ? (
        <div className=" bg-white rounded-lg shadow  overflow-y-auto no-scrollbar min-h-fit  max-h-[calc(80vh-1rem)] ">
          <div className="px-6 py-3 space-y-6">
            <img
              src="https://www.lifepharmacy.com/images/map.svg"
              alt=""
              className="w-36"
            />

            <div className="py-5">
              <h5 className="text-indigo-800 font-bold pb-1">
                You have no saved Addresses
              </h5>
              <p className="text-gray-400 text-sm py-1">
                Start by adding a new address
              </p>
            </div>
          </div>
          <div className="flex items-center px-5 pb-2 space-x-2 border-t border-gray-200 rounded-b  sticky bottom-0">
            <button
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full px-5 py-2.5 text-center text-xs"
              onClick={() => {
                setAddNewAddressClick(false);
                setaddnewAddressFormVisibility(true);
              }}
            >
              ADD NEW ADDRESS
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {addnewAddressFormVisibility ? (
        <div className="relative   rounded-lg  overflow-y-auto no-scrollbar bg-white">
          <div className="flex">
            <div className=" flex items-center space-x-3 rtl:space-x-reverse">
              <Button 
              rounded={"full"}
              
              variant={"closeBtn"} size={"xs"}>
              <Icon
                onClick={() => {
                  // setaddNewAddress(false)
                  setaddnewAddressFormVisibility(false);
                  setAddNewAddressClick(true);
                  setavailableAddresses(true);
                }}
                type="chevronLeftIcon"
                
              />
              </Button>
     

              <Typography size={"lg"} variant={"lifeText"} bold={"bold"}>
                Your Address
              </Typography>
            </div>
            <Button
              variant={"closeBtn"}
  
              size={"xs"}
              rounded={"full"}
              onClick={() => setCloseModal()}
            >
              <Icon type="crossIcon" />
            </Button>
          </div>

          <div className=" pt-3 bg-white">
            <form
              className="space-y-3"
              onSubmit={handleSubmit(addressFormOnSubmit)}
            >
              <div className="space-y-2">
                <Button variant={"default"} size={"xs"} rounded={"full"}>
                  PERSONAL DETAILS
                </Button>
                <Input
                  sizes={"sm"}
                  {...register("name", {
                    required: true,
                  })}
                  className={`${
                    errors.name?.type === "required" ? "border-red-500" : ""
                  }`}
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                />
                {errors.name?.type === "required" && (
                  <Typography variant={"danger"} size={"xs"}>
                    First Name is Required
                  </Typography>
                )}
              </div>
              <div className="space-y-2">
                <Typography>
                  Enter your mobile number{" "}
                  <span className="text-red-500">*</span>
                </Typography>

                <Input
                  sizes={"xs"}
                  {...register("phone", {
                    required: true,
                    validate: (value) =>
                      isValidPhoneNumber(
                        "+" + selectedCountryData[0].callingCodes + value
                      ),
                  })}
                  className={`font-semibold !text-lg ${
                    errors.phone?.type === "validate" ? "border-red-500" : ""
                  }`}
                  buttonLeft={
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setCountriesDrawerState(true);
                      }}
                      variant={"normal"}
                      position={"inputLeftBtn"}
                    >
                      {selectedCountryData ? (
                        <>
                          {" "}
                          <Image
                            src={`https://hatscripts.github.io/circle-flags/flags/${selectedCountryData[0].alpha2Code.toLowerCase()}.svg`}
                            width="50"
                            height="50"
                            className={`sm:w-6 sm:h-6 h-6 w-6`}
                            alt={countriesData[0].name}
                          />
                          <Typography
                            className="px-2"
                            bold={"bold"}
                            size={"lg"}
                          >
                            {" "}
                            +{selectedCountryData[0].callingCodes}
                          </Typography>
                        </>
                      ) : null}
                    </Button>
                  }
                />
                {errors.phone?.type === "required" && (
                  <Typography variant={"danger"} size={"xs"}>
                    Phone Number is Required
                  </Typography>
                )}
              </div>
              <div className="space-y-2">
                <Button variant={"default"} size={"xs"} rounded={"full"}>
                  ADDRESS DETAILS
                </Button>

                <Input
                  sizes={"sm"}
                  {...register("type", { value: deliverToTypes })}
                  buttonLeft={
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="rounded-r-none">
                        <Button variant={"normal"} size={"sm"}>
                          <Icon type="homeIconMenu" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" forceMount>
                        {deliveryOptions.map((opt) => (
                          <DropdownMenuItem onClick={() => setDeliverTo(opt)}>
                            <span> {opt}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  }
                  className="rounded-l-none"
                  value={deliverToTypes}
                />
              </div>
              <div className="flex space-x-6 ">
                <Input
                  {...register("state", { required: true })}
                  sizes={"sm"}
                  className={`${
                    errors.emirates?.type === "required" ? "border-red-500" : ""
                  }`}
                  placeholder="Emirates *"
                  required
                />

                <Input
                  sizes={"sm"}
                  {...register("city", { required: true })}
                  placeholder="City *"
                  required
                />
              </div>

              <Input
                {...register("street_address", { required: true })}
                sizes={"sm"}
                className={`${
                  errors.street_address?.type === "required"
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Street Address *"
                required
              />

              <div className="flex space-x-6">
                <Input
                  {...register("flat_number", { required: true })}
                  sizes={"sm"}
                  className={`${
                    errors.flatorVilla?.type === "required"
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Flat / Villa *"
                  required
                />
                <Input
                  {...register("building", { required: true })}
                  sizes={"sm"}
                  className={`${
                    errors.building?.type === "required" ? "border-red-500" : ""
                  }`}
                  placeholder="Building *"
                  required
                />
              </div>

              <div className="flex ">
                <Input
                  {...register("country", { value: selectedCountry })}
                  sizes={"sm"}
                  buttonLeft={
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="rounded-r-none">
                        <Button variant={"normal"} size={"sm"}>
                          {/* <span className="mx-2"> {selectedFilter.text}</span> */}
                          {/* <Icon type="chevronBottomIcon" size={"sm"} /> */}
                          <Typography size={"sm"}>Country</Typography>
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" forceMount>
                        {countries.map((countryData) => (
                          <DropdownMenuItem
                            onClick={() =>
                              setCountrySelected(countryData.country)
                            }
                          >
                            <span> {countryData.country}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  }
                  className="rounded-l-none"
                  value={selectedCountry}
                />
              </div>
              <textarea
                {...register("additional_info", { required: false })}
                rows={2}
                placeholder="Additional information (eg. Area, Landmark)"
                className={inputVariants({ variant: "default" })}
              ></textarea>

              <div className="sticky bottom-2 border-0 rounded-lg">
                <Button type="submit" className="w-full">
                  SAVE ADDRESS
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      {addressData && addressData.length > 0 && availableAddresses ? (
        <div className=" overflow-y-auto overflow-x-hidden  no-scrollbar  min-h-fit  max-h-[calc(80vh-1rem)]">
          <div className="w-full flex justify-between pb-2 items-center">
            <div className="flex space-x-2 items-center">
              <Icon type="locationPinIcon" sizes={"sm"} />
              <Typography size={"lg"} bold={"bold"} variant={"lifeText"}>
                Addresses
              </Typography>
            </div>

            <Button
              size={"sm"}
              onClick={() => {
                setavailableAddresses(false);
                setaddnewAddressFormVisibility(true);
              }}
            >
              Add New Address
            </Button>
          </div>
          <RadioGroup value={AddressDataIndex} onChange={setAddressDataIndex}>
            <div className="rounded-lg p-3 bg-slate-50 border-2 border-muted">
              <div className="rounded-full p-1 px-2 bg-violet-100">
                <Typography size={"xs"} bold={"bold"}>
                  AVAILABLE ADDRESSES
                </Typography>
              </div>
              {addressData.map((addr: any, indx: number) => (
                <RadioGroup.Option
                  key={addr.id}
                  value={addr}
                  className={({ active, checked }) =>
                    ` ${active ? "" : ""}
                  ${checked ? " bg-opacity-75 " : "bg-slate-50"}
                    relative flex cursor-pointer p-2 ${
                      indx != addressData.length - 1
                        ? " border-muted border-b-2 focus:outline-none"
                        : ""
                    }`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full  justify-between">
                        <div className="flex items-center">
                          <div className="text-sm flex space-x-7">
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${checked ? "" : ""}`}
                            >
                              <div className="flex space-x-3 items-start">
                                <input
                                  type="radio"
                                  name=""
                                  id=""
                                  checked={checked}
                                />
                                <table className="table-auto">
                                  <tbody>
                                    <tr>
                                      <td className="table-data ">
                                        <Typography size={"xs"}>
                                          NAME
                                        </Typography>
                                      </td>
                                      <td className="table-data">
                                        <Typography
                                          size={"xs"}
                                          bold={"semibold"}
                                        >
                                          {" "}
                                          {addr.name}
                                        </Typography>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-data">
                                        <Typography size={"xs"}>
                                          ADDRESS
                                        </Typography>
                                      </td>
                                      <td className="table-data">
                                        <Typography
                                          size={"xs"}
                                          bold={"semibold"}
                                          lineClamp={"one"}
                                        >
                                          {" "}
                                          {addr.google_address}
                                        </Typography>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-data">
                                        <Typography size={"xs"}>
                                          PHONE
                                        </Typography>
                                      </td>
                                      <td className="table-data">
                                        <Typography
                                          size={"xs"}
                                          bold={"semibold"}
                                        >
                                          {" "}
                                          {addr.phone}
                                        </Typography>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {
                          <Button
                            variant={"closeBtn"}
                            className="shrink-0 text-life cursor-pointer p-0"
                            onClick={() => {
                              setValue("name", addr.name);
                              setValue("phone", addr.phone);
                              setValue("type", addr.type);
                              setValue("state", addr.state);
                              setValue("city", addr.city);
                              setValue("street_address", addr.street_address);
                              setValue("flat_number", addr.flat_number);
                              setValue("building", addr.building);
                              setValue("country", addr.country);
                              setValue("additional_info", addr.additional_info);
                              setavailableAddresses(false);
                              setaddnewAddressFormVisibility(true);
                            }}
                          >
                            <Icon type="editIcon" sizes={"xs"} />
                          </Button>
                        }
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>

          <div className="w-full bg-white pt-3 sticky bottom-0">
            <Button
              className="w-full"
              onClick={() => {
                setaddNewAddress(false);
                setaddnewAddressFormVisibility(false);
              }}
            >
              CONFIRM ADDRESS
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </ModalContainer>
  );
};

export default AddressModal;
