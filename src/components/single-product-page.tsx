import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import AddtoCartMobileview from "./add-cart-mobile-view";
import ProductsSlider from "./products-slider";
import BreadCrumb from "./breadcrumb";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCartActions } from "@/hooks/useCartActions";
import { Button, buttonVariants } from "./ui/button";
import { Typography, typographyVariants } from "./ui/typography";
import { cn } from "@/lib/utils";
import { AddOrEditCartBtn, ProductPricesData } from "./Button";
import { Icon } from "./ui/icons";
import { CategoriesSection, FeatureSection } from "./feature-section";
import {
  ProductBestSellerBadge,
  ProductOfferBadge,
  ProductRatingBadge,
} from "./ui/badge";
import { toast } from "./ui/toast";
import ProductImage from "./proImg-gallery";

const SingleProductsContent = ({
  pro_data,
  relatedProductsData,
}: {
  pro_data: any;
  relatedProductsData: any;
}) => {
  const cartItems = useSelector((state: RootState) => state.cart);

  const cartItemsData = cartItems.cart.cart_data
    ? cartItems.cart.cart_data.items
    : [];

  const getProductQuantity = (productId: any) => {
    const productItem = cartItemsData?.find((item: any) =>
      item.items[0].id === productId ? item.items[0].qty : null
    );
    return productItem ? productItem.items[0].qty : 1;
  };
  const { createCart } = useCartActions();

  const [readMorClick, setReadMoreCLick] = useState(false);

  const [wishListItem, setWishlistedItem] = useState(false);
  const [proQty, setProQty] = useState<any>(1);
  const [cartItemsAddTimeoutState, setCartItemsAddTimeout] =
    useState<any>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  useEffect(() => {
    setProQty(getProductQuantity(pro_data.id));
  }, []);
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

  const addedToCart = () => {
    debugger;
    clearTimeout(cartItemsAddTimeoutState);

    const timeout = setTimeout(() => {
      debugger;
      cartInit.data.items.push({ id: pro_data.id, qty: proQty });
      createCart(cartInit);
      clearCartState();
    }, 800);

    setCartItemsAddTimeout(timeout);
    toast({
      title: "Sucess",
      message: "Item Added to the cart",
      type: "success",
    });
  };

  const swiperRef = useRef<SwiperType>();

  return (
    <div className="container-page  md:text-sm sm:text-xs bg-white  ">
      <BreadCrumb menuData={["Products", pro_data.title]} type={"products"} />
      <div>
        <div className="mx-auto  grid grid-cols-12 gap-x-5 my-2 ">
          {pro_data && (
            <>
              <div className="flex md:col-span-4 min-[570px]:col-span-6 col-span-full border-2 border-muted rounded-lg shadow-md p-2 h-fit lg:flex-row md:flex-col-reverse">
                <div className=" w-full  relative  bg-bottom col-span-full ">
                  <ProductImage
                    galleryImages={
                      pro_data.images.gallery_images.length > 1
                        ? pro_data.images.gallery_images
                        : [pro_data.images.featured_image]
                    }
                  />

                  {/* <ProductOfferBadge offersData={pro_data.offers} /> */}

                  <ProductBestSellerBadge proLabelData={pro_data.label} />
                  <div className="absolute right-3 bottom-2 space-y-5 z-10">
                    {wishListItem ? (
                      <svg
                        onClick={() => setWishlistedItem(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-6 h-6 fill-blue-950"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => setWishlistedItem(true)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-6 h-6 fill-blue-950"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                      </svg>
                    )}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-6 h-6 fill-blue-950"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className=" pt-6 lg:mt-0 md:col-span-5  min-[570px]:col-span-6 col-span-full">
                <Typography variant={"lifeText"} bold={"semibold"} size={"lg"}>
                  {pro_data.title}
                </Typography>
                <ProductRatingBadge
                  productRating={pro_data.rating}
                  isProductPage={true}
                />

                <CategoriesSection categoriesData={pro_data.categories} />
                <div className="flex justify-between py-4">
                  <Button
                  variant={"outline"}
                    rounded={"full"}
                    size={"xs"}
                    className="flex space-x-2 rtl:space-x-reverse"
                  >
                    <Typography size={"sm"} className="mx-1">
                      Brand:{" "}
                    </Typography>
                    <Link
                      href={`/${pro_data.brand.brand_url}`}
                      
                    >
                      {pro_data.brand.name}
                    </Link>
                  </Button>
                  <div className="flex  items-center">
                    <Typography size={"xs"}>SKU: </Typography>
                    <Typography
                      variant={"lifeText"}
                      size={"xs"}
                      className="mx-1"
                    >
                      {pro_data.sku}
                    </Typography>
                  </div>
                </div>
                <div className="relative md:block hidden mb-10">
                  <div
                    className={cn(
                      typographyVariants({ variant: "paragraph", size: "sm" }),
                      ` h-[8rem]  ${
                        readMorClick
                          ? "from-white to-gray-200 overflow-y-auto"
                          : " overflow-y-hidden bg-gradient-to-b "
                      }`
                    )}
                    dangerouslySetInnerHTML={{
                      __html: pro_data.short_description,
                    }}
                  />
                  {readMorClick === false ? (
                    <div
                      className={`absolute -bottom-6 left-0 right-0 text-center ${
                        readMorClick
                          ? ""
                          : "bg-gradient-to-b from-transparent to-white "
                      } pt-16`}
                    >
                      <Button
                        onClick={() => setReadMoreCLick(true)}
                        variant={"primaryLink"}
                        size={"sm"}
                      >
                        Read More
                      </Button>
                    </div>
                  ) : null}
                </div>
                <div className="border-muted border rounded-lg mt-6">
                  <div className="flex  items-center p-2  border-b-2 border-gray-100 justify-between">
                    <ProductPricesData
                      productPrices={pro_data.prices}
                      isSingleProductPage={true}
                    />
                    <div className="flex  items-center   ">
                      <Image
                        className="my-auto"
                        data-v-11f2193b=""
                        src="https://www.lifepharmacy.com/images/express-nr.svg"
                        width={20}
                        height={22}
                        alt={"delivery-spped"}
                      />
                      <Typography size={"xs"} className="mx-2">
                        1-3 HOURS
                      </Typography>
                    </div>
                  </div>
                  <div className=" justify-center h-fit p-3 bg-gray  min-[570px]:flex hidden ">
                    <AddOrEditCartBtn
                      proId={pro_data.id}
                      setLoadingState={setLoadingState}
                      loadingState={false}
                      isSingleProductPage={true}
                    />

                    <Button
                      className="w-full mx-3"
                      rounded={"full"}
                      onClick={() => addedToCart()}
                    >
                      <span className="flex items-center">
                        {loadingState ? (
                          <Icon
                            type="addToCartIcon"
                            className="mx-1 animate-exitToRight duration-1000 ease-in-out "
                          />
                        ) : (
                          <>
                            <Icon type="addToCartIcon" className="mx-1  " />
                            <span> Add to Cart</span>
                          </>
                        )}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

          <FeatureSection />
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-3 gap-y-3">
          <div>
            <img
              src="https://lifeadmin-app.s3.me-south-1.amazonaws.com/mobile-app/homescreen/Product%20page%20banner/ppb-1.gif"
              className="w-full"
            />
          </div>
          <div>
            <img
              src="https://lifeadmin-app.s3.me-south-1.amazonaws.com/mobile-app/homescreen/Product%20page%20banner/ppb-2.gif"
              className="w-full"
            />
          </div>
        </div>
        <div className="py-6 px-4 border border-muted">
          <h5 className="text-life-2 md:text-xl text-base font-semibold mb-2">
            Overview
          </h5>
          <div
            dangerouslySetInnerHTML={{ __html: pro_data.short_description }}
            className={cn(
              typographyVariants({ variant: "paragraph" }),
              " px-3 leading-relaxed "
            )}
          />
        </div>
        <div className="py-6 px-4 border-x border-muted">
          <h5 className="text-life-2  md:text-xl text-base font-semibold mb-2 details-sec">
            Details
          </h5>
          <div
            dangerouslySetInnerHTML={{ __html: pro_data.description }}
            className={cn(
              typographyVariants({ variant: "paragraph" }),
              " px-3 leading-relaxed "
            )}
          />
        </div>
        <div className="py-6 px-4 border border-muted">
          <h5 className="text-life-2 md:text-xl text-base font-semibold mb-2">
            More Info
          </h5>
          <div className="text-gray-500 text-xs">SKU: {pro_data.sku}</div>
        </div>

        <div className="lg:flex justify-around my-5 border-b border-muted py-6">
          <div className="lg:w-3/12 w-full lg:px-0 px-6">
            <div className="text-center">
              <Typography
                size={"xl"}
                variant={"primary"}
                bold={"bold"}
                className="p-2"
                alignment={"horizontalCenter"}
              >
                Product Rating
              </Typography>
              <Typography
                bold={"bold"}
                size={"xl"}
                alignment={"horizontalCenter"}
              >
                {pro_data.rating}
                <span className="text-gray-600">/5</span>
              </Typography>
              <div className="lg:w-1/2 w-1/4 mx-auto flex justify-around">
                {Array(5).fill(
                  <Icon type="starIcon" className="fill-amber-500" />
                )}
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-center py-3">
                Based on {pro_data.number_of_reviews} Ratings
              </div>
              {Array(5)
                .fill(null)
                .map((i, indx: number) => (
                  <div
                    className="bg-yellow-400 h-3 rounded-full block mb-1"
                    style={{ width: indx * 75 }}
                  ></div>
                ))}
            </div>
          </div>

          <div className="lg:w-7/12 w-full py-3  px-2 ">
            <div className="flex justify-between items-center mb-2">
              <Typography bold={"bold"} size={"xl"} className="mb-3">
                Reviews{" "}
              </Typography>
              <div className="flex space-x-2 h-fit">
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="fill-white"
                >
                  <Icon
                    type="chevronLeftIcon"
                    className="text-white bg-orange-500 p-1"
                  />
                </button>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="fill-white"
                >
                  <Icon
                    type="chevronLeftIcon"
                    className="text-white bg-orange-500 p-1 -rotate-180"
                  />
                </button>
              </div>
            </div>
            <Swiper
              slidesPerView={1}
              pagination={true}
              spaceBetween={10}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {Array(2).fill(
                <SwiperSlide>
                  <div className="space-y-3">
                    <div className="flex justify-start py-4  bg-slate-100  rounded-lg px-4 w-full">
                      <div className="w-full">
                        <div className="flex justify-between">
                          <Typography bold={"bold"} className="">
                            Jaspreet singh
                          </Typography>
                          <div className="text-gray-400 sm:text-sm text-xs ">
                            Feb 21,2023
                          </div>
                        </div>
                        <div className=" w-1/2 flex justify-start py-2">
                          {Array(5).fill(
                            <Icon
                              type="starIcon"
                              className="fill-amber-500"
                              sizes={"sm"}
                            />
                          )}
                        </div>
                        <div className=" my-2 ">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Reprehenderit iste fugit sunt eaque suscipit
                          beatae qui aliquid, commodi magni fugiat accusamus,
                          architecto incidunt nisi enim. Beatae at et corrupti
                          eos!
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </div>
      </div>

      <Typography bold={"bold"} size={"xl"} alignment={"horizontalCenter"}>
        Related Products
      </Typography>

      {relatedProductsData ? (
        <ProductsSlider proData={relatedProductsData} />
      ) : null}

      <AddtoCartMobileview
        addedToCart={addedToCart}
        salePrice={pro_data.sale_price}
        filterPrice={pro_data.filter_price}
        proQty={proQty}
        setProQty={setProQty}
      />
    </div>
  );
};

export default SingleProductsContent;
