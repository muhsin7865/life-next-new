import ModalContainer from "./ui/modal-container";
import { FC } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";
import { ProductsSkeleton, SugesstionsSkeleton } from "./skeletons";
import { Icon } from "./ui/icons";
import { Input } from "./ui/input";

interface SmSearchBoxModalProps {
  showModal: any;
  setCloseModal: any;
  isArabic: boolean;
  queryData: string;
  setQueryData: any;
  searchButtonOnMouseEnter: any;
  SearchLoadingState: boolean;
  searchClosebtn: boolean;
  searchData: any;
  searchBoxClear: any;
  searchSuggestions: any;
}

export const SmSearchBoxModal: FC<SmSearchBoxModalProps> = ({
  searchClosebtn,
  showModal,
  setCloseModal,
  isArabic,
  queryData,
  setQueryData,
  searchButtonOnMouseEnter,
  SearchLoadingState,
  searchData,
  searchBoxClear,
  searchSuggestions,
}) => {
  const { t } = useLanguage();

  return (
    <ModalContainer
      showModal={showModal}
      setCloseModal={setCloseModal}
      size={"full"}
      fullModal={true}
      className="!rounded-none"
    >
      <div className="relative  w-full scale-100 transform opacity-100 transition-all ">
        <div className="relative bg-white w-full  p-2 px-3">
          <div className="flex w-full py-2 items-center space-x-4 rtl:space-x-reverse">
            <Icon
              type="chevronLeftIcon"
              className="text-black"
              onClick={() => {
                setCloseModal(false);
              }}
            />

     

            <Input
              id="sm-searchbox"
              defaultValue={queryData}
              ref={(input) => input && input.focus()}
              onChange={(e) => {
                searchButtonOnMouseEnter(e.target.value, "", true);
              }}
              placeholder="Search for products..."
              variant={"smallSearch"}
              sizes={"sm"}
              
              iconLeft={
                <Icon type="searchIcon" variant={"inputIconLeft"} sizes={"sm"}/>
              }
              iconRight={
                SearchLoadingState ? (
                  <Icon
                    type="loadingIcon"
                    sizes={"sm"}
                   animation={"spin"}
                   variant={"inputIconRight"}
                  />
                ) : (
                  <Icon variant={"inputIconRight"} type="crossIcon" onClick={() => searchBoxClear()} />
                )
              }
              rounded={"full"}
              className="border-none"
            />
          </div>

          <div className=" px-3 scale-100 absolute top-15 right-0 left-0 bg-white rounded-t-0 rounded-b-md">
            {searchData.results[1] ? (
              <>
                <div className="mb-2 group-search sticky top-0 bg-white">
                  {searchData?.results[1]?.hits[0] ? (
                    <>
                      <Typography size={"sm"} variant={"primary"}>
                        SUGGESTIONS
                      </Typography>
                      <div className="flex my-2 flex-wrap  group-search">
                        {searchData.results[1].hits
                          .slice(0, 10)
                          .map((sug_data: any) => (
                            <Button
                              size={"sm"}
                              rounded={"full"}
                              onClick={() => {
                                searchSuggestions(
                                  sug_data.query,
                                  true,
                                  "search"
                                );
                              }}
                              variant={"normal"}
                              className="mr-2 mb-2"
                            >
                              {sug_data.query}
                            </Button>
                          ))}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="text-gray-600 group-search overflow-y-auto search-suggestion-height py-3">
                  <Typography size={"sm"} variant={"primary"}>
                    PRODUCTS
                  </Typography>

                  {searchData.results[0].hits[0] ? (
                    searchData.results[0].hits.map((pro_data: any) => (
                      <>
                          <Button variant={"productsListBtn"}
                          onClick={() => {
                            searchSuggestions(pro_data.slug, true, "products");
                          }}
                          className="p-2 rounded-lg flex  group-search hover:bg-gray-100 w-full h-fit cursor-pointer space-x-3 rtl:space-x-reverse items-center"
                        >
                          <Image
                            src={
                              pro_data.images
                                ? pro_data.images.featured_image
                                : "/images/default-product-image.png"
                            }
                            height={45}
                            width={45}
                            alt={pro_data.title}
                            className="border-2 rounded border-muted"
                          ></Image>
                          <Typography size={"sm"} variant={"lifeText"}>
                            {pro_data.title}{" "}
                          </Typography>
                        </Button>
                        <hr className=" h-[1px] w-10/12 ml-auto" />
                      </>
                    ))
                  ) : (
                    <div className="mx-auto w-fit p-2 flex flex-col space-y-3">
                      <Image
                        src="/images/no-products-found.png"
                        alt="no-search-results"
                        width={150}
                        height={150}
                      />
                      <Typography size={"sm"} variant={"ghost"}>
                        Oops! Products Not Found
                      </Typography>
                      <Button size={"sm"} iconLeft={true} iconType="chatIcon">
                        {" "}
                        Chat With Us
                      </Button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div role="status" className="max-w-full animate-pulse">
                <div className="group-search mb-5 pt-4 space-y-2">
                  <Typography size={"sm"} variant={"primary"}>
                    SUGGESTIONS
                  </Typography>
                  <div className="flex  flex-wrap">
                    <SugesstionsSkeleton noOfSuggestions={5} />
                  </div>
                  <div className="group-search text-xs text-gray-600 space-y-3">
                    <Typography size={"sm"} variant={"primary"}>
                      PRODUCTS
                    </Typography>
                    <ProductsSkeleton noOfSuggestions={10} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
