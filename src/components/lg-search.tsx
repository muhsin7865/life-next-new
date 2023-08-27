import { Combobox, Menu } from "@headlessui/react";
import { useLanguage } from "@/hooks/useLanguage";
import { Input } from "./ui/input";
import { typographyVariants } from "./ui/typography";
import { LgSearchMenuTransition } from "./ui/transition";
import { cn } from "@/lib/utils";
import LgSearchSuggestions from "./lg-search-suggestions";
import { useModal } from "./ui/modalcontext";
import { Icon } from "./ui/icons";
import { useState } from "react";

export default function LgSearch({
  SearchLoadingState,
  searchSuggestions,
  searchButtonOnClick,
  searchData,
  queryData,
  searchButtonOnMouseEnter,
}: {
  SearchLoadingState: any;
  queryData: any;
  searchSuggestions: any;
  searchData: any;
  searchButtonOnMouseEnter: any;
  searchButtonOnClick: any;
}) {
  const { t } = useLanguage();

  const { searchBoxClear } = useModal();
  const [open, setOpen] = useState(false)

  return (
    <Combobox  value={null} onBlur={()=>setOpen(false)}  as="div" className="w-full relative">
   
          <Combobox.Button className="w-full">
            <Input
              type="text"
              id="lg-searchbox"
              autoFocus={true}
              iconLeft={
                <Icon
               sizes={"sm"}
               className="text-slate-500"
                
                  type="searchIcon"
                  variant={"inputIconLeft"}
                />
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
                  open && (
                    <Icon
                      sizes={"sm"}
                      variant={"inputIconRight"}
                      onClick={() => searchBoxClear()}
                      type="crossIcon"
                    />
                  )
                )
              }
              onClick={() => searchButtonOnClick(true)}
              onChange={(e) => {
                searchButtonOnMouseEnter((e.target as HTMLInputElement).value);
              }}
              className={cn(
                typographyVariants({ size: "sm", bold: "light" }),
                `${open ? "rounded-2xl rounded-b-none" : "rounded-full"}`
              )}
              onKeyDown={(e) =>
                e.key === "Enter"
                  ? searchSuggestions(
                      (e.target as HTMLInputElement).value,
                      false,
                      "search"
                    )
                  : null
              }
              defaultValue={queryData}
              placeholder={t.navbar.searchbox_text}
            />
          </Combobox.Button>
          <LgSearchMenuTransition>
            <Combobox.Options className="absolute right-0 z-30  left-0 bg-white rounded-lg rounded-t-none border-t w-full ">
              <LgSearchSuggestions
                searchSuggestions={searchSuggestions}
                searchData={searchData}
                close={()=>null}
              />
            </Combobox.Options>
            </LgSearchMenuTransition>
      
    </Combobox>
  );
}
