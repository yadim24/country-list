"use client";

import { CountryDTO } from "@/app/lib/types";
import { motion } from "motion/react";
import Image from "next/image";
import { FC } from "react";
import { Button } from "../Button";

type Props = {
  country: CountryDTO;
  handleClick: () => void;
};

export const CountryListItem: FC<Props> = ({ country, handleClick }) => {
  return (
    <motion.li
      key={country.iso_code3}
      className="grid grid-cols-[80px_100px_480px_20px] items-center mb-2"
      initial={{ transform: "translateY(100%)" }}
      animate={{ transform: "0" }}
      exit={{ transform: "translateX(100%)" }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      layout
    >
      {country.flag_url ? (
        <Image
          src={`https:${country.flag_url}`}
          alt=""
          width={22}
          height={14}
        />
      ) : (
        <div className="w-9 h-6" />
      )}
      <p className="w-10 ml-1">{country.iso_code3}</p>
      <p className="w-[424px]">{country.name_ru}</p>
      <Button handleClick={handleClick} />
    </motion.li>
  );
};
