"use client";

import { AnimatePresence } from "motion/react";
import { FC, useState } from "react";
import { CountriesDTO } from "../../lib/types";
import { CountryListItem } from "./CountryListItem";

type Props = {
  countryList: CountriesDTO;
};

export const CountryList: FC<Props> = ({ countryList }) => {
  const [countries, setCountries] = useState(countryList);

  const handleClick = (index: number): void => {
    const newList = countries.filter((_country, i) => i !== index);
    setCountries(newList);
  };

  return (
    <ol className="mx-auto px-2 max-w-[700px] overflow-hidden">
      <AnimatePresence>
        {countries.map((country, i) => (
          <CountryListItem
            key={country.iso_code3}
            country={country}
            handleClick={() => handleClick(i)}
          />
        ))}
      </AnimatePresence>
    </ol>
  );
};
