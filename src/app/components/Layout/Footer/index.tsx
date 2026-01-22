"use client";

import { FooterLinkType } from "@/app/types/footerlinks";
import { getDataPath } from "@/app/utils/paths";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../Header/Logo";

const Footer = () => {
  const [footerlink, SetFooterlink] = useState<FooterLinkType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        SetFooterlink(data.FooterLinkData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <footer>
      <div className="container py-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          {/* CLOUMN-1 */}
          <div className="flex flex-col gap-5">
            <div className="flex gap-4">
              <Link href="https://instagram.com/qalbihusain" target="_blank">
                <Icon
                  icon="tabler:brand-instagram"
                  width={45}
                  height={45}
                  className="text-darkblue dark:text-white bg-darkmode/5 dark:bg-white/10 rounded-lg p-2 hover:text-primary dark:hover:text-primary duration-300"
                />
              </Link>
              <Link href="https://linkedin.com/in/qalbi-husaini" target="_blank">
                <Icon
                  icon="tabler:brand-linkedin"
                  width={45}
                  height={45}
                  className="text-darkblue dark:text-white bg-darkmode/5 dark:bg-white/10 rounded-lg p-2 hover:text-primary dark:hover:text-primary duration-300"
                />
              </Link>
              <Link href="https://github.com/husainq" target="_blank">
                <Icon
                  icon="tabler:brand-github"
                  width={45}
                  height={45}
                  className="text-darkblue dark:text-white bg-darkmode/5 dark:bg-white/10 rounded-lg p-2 hover:text-primary dark:hover:text-primary duration-300"
                />
              </Link>
            </div>
          </div>
          {/* CLOUMN-2 */}
          <div className="flex flex-col gap-5">
            <div className="flex gap-2">
              <Icon
                icon={"tabler:map-pin"}
                width={22}
                height={22}
                className="text-lightgrey"
              />
              <p className="text-base font-normal text-offwhite">
                Pekanbaru, Riau, Indonesia
              </p>
            </div>
            <div className="flex gap-2">
              <Icon
                icon={"tabler:phone"}
                width={22}
                height={22}
                className="text-lightgrey"
              />
                <p className="text-base font-normal text-offwhite hover:text-primary dark:hover:text-primary">
                  0823-8712-8176
                </p>
            </div>
            <div className="flex gap-2">
              <Icon
                icon={"tabler:mail"}
                width={22}
                height={22}
                className="text-lightgrey"
              />
                <p className="text-base font-normal text-offwhite hover:text-primary dark:hover:text-primary lowercase">
                  qalbihusaini27@gmail.com
                </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
