import Image from "next/image";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";
import { ProductsSkeleton, SugesstionsSkeleton } from "./skeletons";
import { Icon } from "./ui/icons";

export default function LgSearchSuggestions({
  searchData,
  searchSuggestions,
  close,
}: {
  searchData: any;
  searchSuggestions: any;
  close: any;
}) {
  return (
    <div className="shadow-xl px-3  bg-white  rounded-t-0 rounded-b-md z-50 border-t-1 border-muted">
      {searchData.results[1] ? (
        <>
          <div className="mb-5 group-search sticky top-0 bg-white pt-4">
            {searchData?.results[1]?.hits[0] ? (
              <>
                <Typography variant={"primary"} size={"sm"} bold={"semibold"}>
                  SUGGESTIONS
                </Typography>
                <div className="flex my-2 flex-wrap  group-search">
                  {searchData.results[1].hits
                    .slice(0, 10)
                    .map((sug_data: any) => (
                      <Button
                        size={"sm"}
                        iconLeft={
                          <Icon sizes={"sm"} type="trendingIcon" className="ltr:mr-2 rtl:ml-2 text-slate-400"/>
                        }
                    
                        rounded={"lg"}
                        onClick={() => {
                          searchSuggestions(sug_data.query, false, "search");
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
          <div className="text-gray-600 group-search overflow-y-auto search-suggestion-height">
            <Typography variant={"primary"} bold={"semibold"} size={"sm"}>
              PRODUCTS
            </Typography>

            {searchData.results[0].hits[0] ? (
              searchData.results[0].hits.map((pro_data: any) => (
                <Button
                  variant={"productsListBtn"}
                  onClick={() => {
                    searchSuggestions(pro_data.slug, false, "products");
                    close();
                  }}
                  className="p-2 rounded-lg   group-search hover:bg-gray-100 group w-full h-16 cursor-pointer  flex justify-between"
                >
                  <span className="flex space-x-3 rtl:space-x-reverse items-center">
                    <Image
                      src={
                        pro_data.images
                          ? pro_data.images.featured_image
                          : "/images/default-product-image.png"
                      }
                      height={50}
                      width={50}
                      alt={pro_data.title}
                      className="border-2 rounded border-muted"
                    ></Image>
                    <Typography size={"sm"}>{pro_data.title} </Typography>
                  </span>
                  <Icon
                    sizes={"sm"}
                    type="rightTopIcon"
                    className="text-slate-300  group-hover:text-slate-500"
                  />
                </Button>
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
                <Button iconLeft={true} iconType="chatIcon">
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
            <Typography variant={"primary"} size={"sm"} bold={"semibold"}>
              SUGGESTIONS
            </Typography>

            <div className="flex  flex-wrap">
              <SugesstionsSkeleton noOfSuggestions={5} />
            </div>
            <div className="group-search text-xs text-gray-600 space-y-3">
              <Typography variant={"primary"} bold={"semibold"} size={"sm"}>
                PRODUCTS
              </Typography>

              <ProductsSkeleton noOfSuggestions={10} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
