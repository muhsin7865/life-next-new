import Image from "next/image";

// import { removeFromCart } from "../redux/cart.slice";
import { useState } from "react";
import { useCartActions } from "@/hooks/useCartActions";
import { Icon } from "./ui/icons";
import { Button, buttonVariants } from "./ui/button";
import { Typography, typographyVariants } from "./ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "./ui/toast";
export function CommandDemo({
  cartItems,
  subTotal,
}: {
  cartItems: any;
  subTotal: any;
}) {
  return (
    <div>
      <div className="overflow-y-auto h-[17rem]">
        {cartItems.map((cartItem: any) => (
          <CartItem cartItem={cartItem} />
        ))}
      </div>
      <div className="py-3">
        <div
          className={cn(
            typographyVariants({ size: "sm" }),
            "flex justify-between text-black items-center"
          )}
        >
          <div className="">
            TOTAL{"  "} <span>(WITHOUT SHIPPING)</span>{" "}
          </div>
          AED {subTotal}
        </div>
      </div>
      <div className="flex justify-between text-white space-x-3">
        <Link
          href="/cart"
          className={
            "rounded-md w-full " + buttonVariants({ variant: "default" })
          }
        >
          CART
        </Link>
        <Link
          href="/checkout"
          className={
            "rounded-md w-full " + buttonVariants({ variant: "outline" })
          }
        >
          CHECK OUT
        </Link>
      </div>
    </div>
  );
}

const CartItem = ({ cartItem }: { cartItem: any }) => {
  // const dispatch = useDispatch();
  const { updateCart } = useCartActions();

  const [timeOutRemoveFromCart, setimeOutRemoveFromCart] = useState<any>(null);
  const [cartLoadingState, setCartLoadingState] = useState<any>(null);
  const removedFromCart = () => {
    toast({
      title: "Sucess",
      message: "Updated Cart Details",
      type: "success",
    });
  };

  const cartInit: any = {
    action: "",
    data: {
      items: [
        // {
        //     id: "a6c1a3e7-caea-4845-94ca-a49de40f18c0",
        //     qty: 1
        // }
      ],
      address_id: null,
    },
  };

  const clearCartState = () => {
    cartInit.data.items = [];
    cartInit.action = "";
  };

  const deleteCartItem = () => {
    cartInit.data.items.push({ id: cartItem.id, qty: 0 });
    setCartLoadingState(true);
    removedFromCart();
    clearTimeout(timeOutRemoveFromCart);
    const timeout = setTimeout(() => {
      updateCart(cartInit);
      clearCartState();
      setTimeout(() => {
        setCartLoadingState(false);
      }, 2700);
    }, 500);
    setimeOutRemoveFromCart(timeout);
  };

  return (
    <Button variant={"productsListBtn"} className="relative shadow-sm">
      <Image
        src={
          cartItem.featured_image
            ? cartItem.featured_image
            : "/images/default-product-image.png"
        }
        height={50}
        width={50}
        alt={cartItem.title}
        className="mr-2 max-w-[50px] max-h-[50px] rounded-lg"
      />
      <Typography lineClamp={"two"} size={"sm"}>
        {cartItem.title}
      </Typography>
      <Button
        variant={"normal"}
        onClick={() => {
          deleteCartItem();
        }}
        className="absolute right-3 p-0.5 h-fit"
        size={"xs"}
        rounded={"full"}
      >
        <Icon type="crossIcon" sizes={"xs"} />
      </Button>
      {cartLoadingState ? (
        <div className="absolute inset-0 bg-red-300 opacity-80 flex justify-center items-center">
          <Icon type="refreshIcon" className="animate-spin" sizes={"lg"} />
        </div>
      ) : null}
    </Button>
  );
};

export default CartItem;
