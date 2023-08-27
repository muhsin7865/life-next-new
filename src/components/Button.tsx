import { useCartActions } from "@/hooks/useCartActions";
import { RootState } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, buttonVariants } from "./ui/button";
import { Icon } from "./ui/icons";
import { Typography } from "./ui/typography";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { toast } from "./ui/toast";
import { useModal } from "./ui/modalcontext";
import getFrequentlyBroughtTogetherData from "@/lib/frequentlyBroughtTogether";

export const BrandsButton = ({
  selectedBrands,
  brandName,
  filterSet,
}: {
  selectedBrands: any;
  brandName: any;
  filterSet: any;
}) => {
  const [isInverted, setIsInverted] = useState(false);
  const brandsArray = selectedBrands
    .filter((filter: any) => filter.type === "brands")
    .map((filter: any) => filter.value);

  const preSelectedBrands = () => {
    brandsArray.push(brandName.toLowerCase().replace(/[\s&]+/g, "-"));
    return brandsArray.toString();
  };

  return (
    <div
      onClick={() => {
        setIsInverted(!isInverted);
        isInverted
          ? filterSet("brands", "")
          : filterSet("brands", preSelectedBrands());
      }}
      className={` ${
        isInverted ? "!bg-blue-500 !text-white " : " "
      } cursor-pointer text-blue-500 border border-blue-500 px-2 py-1 text-center my-1 mr-2 rounded-full hover:bg-blue-100 inline-block text-xs`}
    >
      {brandName}
    </div>
  );
};

export const ShopNowButton = ({
  classNames,
  children,
  onClick,
}: {
  children: any;
  classNames: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={
        "btn-primary sm:text-base text-sm sm:py-3 py-2 sm:px-7 px-5 " +
        classNames
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const DeliverInstructionsBtn = ({ instr }: { instr: any }) => {
  const [instrSelected, setInstrSelected] = useState(false);
  return (
    <button
      onClick={() => setInstrSelected(!instrSelected)}
      className={`border  p-2 rounded-lg ${
        instrSelected ? " bg-blue-200" : "border-muted"
      }`}
    >
      <Image
        src={instrSelected ? instr.icon_selected : instr.icon_unselected}
        height={50}
        width={50}
        alt="del-ins"
        className="mx-auto"
      />
      <Typography size={"xs"}>{instr.instruction}</Typography>
    </button>
  );
};

export const AddOrEditCartBtn = ({
  proId,
  setLoadingState,
  loadingState,
  isSingleProductPage,
}: {
  proId: string;
  setLoadingState: any;
  loadingState: boolean;
  isSingleProductPage: boolean;
}) => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const { locale } = useLanguage();
  const [cartItemsAddTimeoutState, setCartItemsAddTimeout] =
    useState<any>(null);
  const [cartItemsUpdateTimeoutState, setCartItemsUpdateAddTimeout] =
    useState<any>(null);
  const [addBtnLoadingState, setAddBtnLoadingState] = useState<boolean>(false);
  const [loadingFinished, setLoadingFinished] = useState<boolean>(false);
  const cartItemsData = cartItems.cart.cart_data
    ? cartItems.cart.cart_data.items
    : [];
  const [addedToCartClicked, addedToCartState] = useState(false);

  const getProductQuantity = (productId: any) => {
    const productItem = cartItemsData?.find((item: any) =>
      item.items[0].id === productId ? item.items[0].qty : null
    );
    return productItem ? productItem.items[0].qty : 0;
  };
  const { setOrderSucessSheetState, setFrequentlyBroughtData } = useModal();
  const { createCart, updateCart } = useCartActions();

  const cartInit: any = {
    action: "",
    data: {
      items: [],
      address_id: null,
    },
  };

  const clearCartState = () => {
    cartInit.data.items = [];
    cartInit.action = "";
  };
  const getFrequentlyBroughtData = () => {
    getFrequentlyBroughtTogetherData(proId, locale).then((res) => {
      debugger;
      setFrequentlyBroughtData([
        { proData: res.data.products },
        { proId: proId },
      ]);
    });
  };
  useEffect(() => {
    setProQty(getProductQuantity(proId));
  }, []);
  const [proQty, setProQty] = useState<any>(0);

  const addedToCart = () => {
    setProQty(1);
    setLoadingState(true);
    addedToCartState(true);
    setAddBtnLoadingState(true);
    clearTimeout(cartItemsAddTimeoutState);
    getFrequentlyBroughtData();
    const timeout = setTimeout(() => {
      cartInit.data.items.push({ id: proId, qty: 1 });
      createCart(cartInit);
      setTimeout(() => {
        setLoadingState(false);
      }, 2500);
      setAddBtnLoadingState(false);
      setLoadingFinished(true);
      clearCartState();
    }, 800);

    setCartItemsAddTimeout(timeout);
    toast({
      title: "Sucess",
      message: "Item Added to the cart",
      type: "success",
    });
  };

  const itemExists = () => {
    return cartItemsData?.some((item: any) => item.items[0].id === proId);
  };

  const updateCartQuantity = (updatedQty: number) => {
    setProQty(updatedQty);
    getFrequentlyBroughtData();

    setLoadingState(true);
    addedToCartState(true);

    clearTimeout(cartItemsUpdateTimeoutState);

    const timeout = setTimeout(() => {
      cartInit.data.items.push({ id: proId, qty: updatedQty });
      updateCart(cartInit);
      setLoadingState(false);
      clearCartState();
    }, 1500);

    setCartItemsUpdateAddTimeout(timeout);
    toast({
      title: "Sucess",
      message: "Updated Cart Details",
      type: "success",
    });
  };

  return (proQty > 0 && itemExists()) ||
    loadingFinished ||
    isSingleProductPage ? (
    <div className="flex items-center">
      <Button
        rounded={"full"}
        onClick={() => {
          proQty > 1 || !isSingleProductPage
            ? updateCartQuantity(proQty - 1)
            : null;
        }}
        variant={"ghost"}
        className={`!px-1  ${
          isSingleProductPage
            ? "sm:h-[35px] sm:w-[35px] h-[30px] w-[30px]"
            : "sm:h-[27px] sm:w-[27px] h-[27px] w-[27px]"
        }`}
      >
        <Icon type={proQty > 1 ? "minusIcon" : "trashIcon"} sizes={"sm"} />
      </Button>
      <Typography size={"sm"} className="sm:px-2 px-2 flex items-center">
        {isSingleProductPage && proQty === 0 ? 1 : proQty}
      </Typography>
      <Button
        disableBtn={loadingState}
        onClick={() => {
          updateCartQuantity(proQty + 1);
        }}
        rounded={"full"}
        className={`!px-1  ${
          isSingleProductPage
            ? "sm:h-[35px] sm:w-[35px] h-[30px] w-[30px]"
            : "sm:h-[27px] sm:w-[27px] h-[27px] w-[27px]"
        }`}
      >
        <Icon
          type={"plusIcon"}
          sizes={"sm"}
          variant={"default"}
          iconIsLoading={loadingState}
        />
      </Button>
    </div>
  ) : (
    <Button
      rounded={"full"}
      iconLeft={true}
      className="py-0.5 px-3"
      iconType="addToCartIcon"
      isLoading={addBtnLoadingState}
      onClick={() => {
        addedToCart();
      }}
    >
      ADD
    </Button>
  );
};

export const ProductPricesData = ({
  productPrices,
  isSingleProductPage,
}: {
  productPrices: any;
  isSingleProductPage: boolean;
}) => {
  const { currency } = useLanguage();

  const offerPrice = productPrices[0].price.offer_price;
  const regularPrice = productPrices[0].price.regular_price;
  return (
    <div className="flex justify-between">
      {productPrices ? (
        offerPrice != regularPrice ? (
          <div className="flex space-x-2 rtl:space-x-reverse items-center">
            <Typography
              bold={"bold"}
              size={isSingleProductPage ? "xl" : "lg"}
              variant={"danger"}
              whitespace={"nowrap"}
              className=""
            >
              {" "}
              <Typography size={isSingleProductPage ? "sm" : "sm"} type="span">
                {currency}
              </Typography>{" "}
              {offerPrice}
            </Typography>
            <Typography
              size={"sm"}
              bold={"bold"}
              variant={"primary"}
              whitespace={"nowrap"}
              className="line-through"
            >
              {" "}
              <Typography size={"xs"} type="span">
                {currency}
              </Typography>{" "}
              {regularPrice}
            </Typography>
          </div>
        ) : (
          <Typography
            size={isSingleProductPage ? "xl" : "lg"}
            bold={"bold"}
            variant={"primary"}
            whitespace={"nowrap"}
          >
            {" "}
            <Typography size={isSingleProductPage ? "sm" : "sm"} type="span">
              {currency}
            </Typography>{" "}
            {regularPrice}
          </Typography>
        )
      ) : null}
    </div>
  );
};

export const RadioBtnGroup = ({
  id,
  value,
  name,
}: {
  id: string;
  value: string;
  name: string;
}) => {
  return (
    <>
      <input type="radio" className="hidden peer" id={id} name={name} />
      <label
        htmlFor={id}
        className={cn(
          buttonVariants({ variant: "primaryRadioCheck" }),
          "mb-2 mr-2"
        )}
      >
        {value}
      </label>
    </>
  );
};

export const SelectedFlagCountry = ({
  setLanguageModal,
}: {
  setLanguageModal: any;
}) => {
  const { selectedLanguage, selectedflag } = useLanguage();

  return (
    <button
      onClick={() => {
        setLanguageModal(true);
      }}
      className="flex flex-col justify-between md:pl-5 pl-0 "
    >
      <Image
        src={selectedflag}
        className="w-8 h-8 rounded-lg mx-auto"
        height={100}
        width={100}
        alt="selectedFlag"
      />
      <Typography size={"sm"}>{selectedLanguage}</Typography>
    </button>
  );
};
