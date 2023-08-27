import Navbar from "./navbar"
import Footer from "./footer"
import React from "react"
import { Providers } from "../redux/providers"
import { FC } from "react"

interface layoutProps {
  children: any
  data: any,
  brands_data: any,
  isArabic: boolean,
  lang: string,
  langData: any
}

export const Layout: FC<layoutProps> = ({ children, data, brands_data, isArabic, lang }) => {

  return (
    <Providers>

      <section className="py-0" >
        <Navbar data={data} brands_data={brands_data} isArabic={isArabic} lang={lang}  />
        <main>{children}</main>
        <Footer  />
      </section>
    </Providers>
  )
}


