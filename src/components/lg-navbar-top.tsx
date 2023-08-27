import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useLanguage } from "@/hooks/useLanguage"
import { Typography } from "./ui/typography"
const NavbarBottom = ({ locationOnClickHandle, AddressDataIndex }: { locationOnClickHandle: any, AddressDataIndex: any }) => {
  const { data: session } = useSession()
  const { t } = useLanguage()

  function displayedAddress(displayAddressData: any) {
    if (displayAddressData) {
      if ((displayAddressData?.google_address).length > 30) {
        return displayAddressData?.google_address.substring(0, 30) + '...'
      }
      else {
        return displayAddressData?.google_address
      }
    }
    else {
      return ""
    }

  }


  return (
    <>
   <div></div>
    </>
  )
}

export default NavbarBottom