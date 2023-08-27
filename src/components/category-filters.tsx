import * as Accordion from "@radix-ui/react-accordion";
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "./accordion-radix";

import { BrandsButton } from "./Button";
import { useEffect, useState } from "react";
import getCategoryData from "@/lib/getCategoryData";
import { Icon } from "./ui/icons";
import { Checkbox } from "./ui/checkbox";
import { Typography } from "./ui/typography";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Slider } from "./ui/slider";

const FiltersSection = ({
  brandsData,
  selectedBrands,
  filterSet,
  filterPath
}: {
  brandsData: any;
  selectedBrands: any;
  filterSet: any;
  filterPath:string
}) => {
  const [catData, setCatData] = useState({
    data: [{}],
  });
  useEffect(() => {
    getCategoryData().then((cat_data) => {
      setCatData(cat_data);
    });
  }, []);
  const rangeSliderValueChange = (newValue: number[]) => {
    setRangeSliderValue([newValue[0], newValue[1]]);
  };
  function slugify(text: any) {
    if (text) {
      return text.toLowerCase().replace(/[\/\s&]+/g, "-");
    } else {
      return "";
    }
  }
  const router = useRouter();
  function generatePath(slug: string) {
    router.push(`/products?categories=${slug}`);
  }

  const [rangeSliderValue, setRangeSliderValue] = useState([50]);
  const [checkedCat, setCheckedCat] = useState<any>({
    item: null,
    checkedState: false,
  });


  return (
    <div className="hidden lg:block  top-40">
      {catData.data[1] ? (
        <>
          <Accordion.Root
            className=""
            type="single"
            defaultValue="item-1"
            collapsible
          >
            <AccordionItem className="border-y" value="item-1">
              <AccordionTrigger className="py-4">
                <Icon
                  type="chevronRightIcon"
                  className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                />
                Category
              </AccordionTrigger>

              {catData.data.map((item: any) => (
                <AccordionContent className="">
                  <Accordion.Root className="" type="single" collapsible>
                    <AccordionItem className="" value="item-1">
                      <div
                        className={`rounded-lg flex justify-between p-2 items-center ${
                          checkedCat && checkedCat.item != null
                            ? checkedCat.item === item.name
                              ? "bg-blue-100"
                              : "bg-slate-50"
                            : "bg-slate-50"
                        }`}
                      >
                        <Checkbox 
                          id="terms"
                          checked={
                            checkedCat
                              ? checkedCat.item === item.name
                                ? checkedCat.checkedState
                                : false
                              : false
                          }
                          onClick={() => {
                            generatePath(slugify(item.name));

                            setCheckedCat((prevState: any) =>
                              prevState && prevState.item === item.name
                                ? null
                                : {
                                    item: item.name,
                                    checkedState: true,
                                  }
                            );
                          }}
                        />
                        <AccordionTrigger className="">
                        <Typography size={"sm"}>{item.name}</Typography> 

                          <Icon
                            type="chevronRightIcon"
                            sizes={"sm"}
                            className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                          />
                        </AccordionTrigger>
                      </div>

                      {item.children.map((child: any) => (
                        <AccordionContent className="">
                          <Accordion.Root
                            className=""
                            type="single"
                            collapsible
                          >
                            <AccordionItem className="" value="item-1">
                              <div
                                className={` rounded-lg flex justify-between p-2 ml-4 items-center ${
                                  checkedCat && checkedCat.item != null
                                    ? checkedCat.item === item.name ||
                                      checkedCat.item.includes(child.name)
                                      ? "bg-blue-100"
                                      : "bg-slate-100"
                                    : "bg-slate-100"
                                }`}
                              >
                                <Checkbox
                                  id="terms"
                                  checked={
                                    checkedCat
                                      ? checkedCat.item === child.name
                                        ? checkedCat.checkedState
                                        : checkedCat.item === item.name
                                        ? checkedCat.checkedState
                                        : false
                                      : false
                                  }
                                  onClick={() => {
                                    generatePath(child.slug);

                                    setCheckedCat((prevState: any) =>
                                      prevState && prevState.item === item.name
                                        ? {
                                            item: child.name,
                                            checkedState: true,
                                          }
                                        : prevState &&
                                          prevState.item === child.name
                                        ? null
                                        : {
                                            item: child.name,
                                            checkedState: true,
                                          }
                                    );
                                  }}
                                />
                                <AccordionTrigger className="">
                        <Typography size={"sm"}>{child.name}</Typography> 

                                  <Icon
                                    type="chevronRightIcon"
                                    sizes={"sm"}
                                    className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                                  />
                                </AccordionTrigger>
                              </div>

                              {child.sections.map((sec_data: any) => (
                                <AccordionContent className="ml-7">
                                  <div
                                    className={` rounded-lg flex space-x-4 p-2 ml-4 items-center ${
                                      checkedCat && checkedCat.item != null
                                        ? checkedCat.item === item.name ||
                                          checkedCat.item.includes(
                                            child.name
                                          ) ||
                                          checkedCat.item.includes(
                                            sec_data.name
                                          )
                                          ? "bg-blue-100"
                                          : "bg-slate-100"
                                        : "bg-slate-100"
                                    }`}
                                  >
                                    <Checkbox
                                      id="terms"
                                      checked={
                                        checkedCat
                                          ? checkedCat.item === sec_data.name
                                            ? checkedCat.checkedState
                                            : checkedCat.item === child.name
                                            ? checkedCat.checkedState
                                            : checkedCat.item === item.name
                                            ? checkedCat.checkedState
                                            : false
                                          : false
                                      }
                                      onClick={() => {
                                        generatePath(slugify(sec_data.name));

                                        setCheckedCat((prevState: any) =>
                                          prevState &&
                                          prevState.item === item.name
                                            ? {
                                                item: sec_data.name,
                                                checkedState: true,
                                              }
                                            : prevState &&
                                              prevState.item === child.name
                                            ? {
                                                item: sec_data.name,
                                                checkedState: true,
                                              }
                                            : prevState &&
                                              prevState.item === sec_data.name
                                            ? null
                                            : {
                                                item: sec_data.name,
                                                checkedState: true,
                                              }
                                        );
                                      }}
                                    />
                                    <Typography lineClamp={"one"} size={"sm"}>
                                      {" "}
                                      {sec_data.name}
                                    </Typography>
                                  </div>
                                </AccordionContent>
                              ))}
                            </AccordionItem>
                          </Accordion.Root>
                        </AccordionContent>
                      ))}
                    </AccordionItem>
                  </Accordion.Root>
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion.Root>
          {brandsData ? (
            <Accordion.Root
              className=""
              type="single"
              defaultValue="item-1"
              collapsible
            >
              <AccordionItem className="border-b" value="item-1">
                <AccordionTrigger className="py-4">
                  <Icon
                    type="chevronRightIcon"
                    className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                  />
                  Brands
                </AccordionTrigger>
                <AccordionContent>
                  {brandsData.map((brand: any) =>
                    brand.featured === true ? (
                      <BrandsButton
                        selectedBrands={selectedBrands}
                        brandName={brand.name}
                        filterSet={filterSet}
                      />
                    ) : null
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion.Root>
          ) : null}
        </>
      ) : null}

      <Accordion.Root
        className=""
        type="single"
        defaultValue="item-1"
        collapsible
      >
        <AccordionItem className="border-b" value="item-1">
          <AccordionTrigger className="py-4">
            <Icon
              type="chevronRightIcon"
              className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
            />
            Price
          </AccordionTrigger>

          <AccordionContent>
            <div className="justify-between flex items-center">
              <div>
                Range: AED {rangeSliderValue[0]} — AED {rangeSliderValue[1]}
              </div>
              <Button
                onClick={() => {
                  filterSet("min_price", rangeSliderValue[0].toFixed(2));
                }}
                variant={"normal"}
                rounded={"full"}
                size={"sm"}
              >
                Filter
              </Button>
            </div>
            <Slider
              defaultValue={[0, 9999]}
              onValueChange={rangeSliderValueChange}
              max={9999}
              step={100}
              className={cn("w-full py-4")}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion.Root>
    </div>
  );
};

export { FiltersSection };
