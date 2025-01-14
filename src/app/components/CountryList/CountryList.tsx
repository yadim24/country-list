/* eslint-disable @next/next/no-img-element */
"use client";

import { FC, useRef, useState } from "react";
import { CountriesDTO } from "../../lib/types";
import { CountryListItem } from "./CountryListItem";

type Props = {
  countryList: CountriesDTO;
};

export const CountryList: FC<Props> = ({ countryList }) => {
  const [countries, setCountries] = useState(countryList);
  const deletedIndexRef = useRef(countryList.length);

  const handleClick = (index: number): void => {
    deletedIndexRef.current = index;
    const newList = countries.filter((_country, i) => i !== index);
    setCountries(newList);
    console.log("Debug ~ deletedIndex:", deletedIndexRef.current);
  };

  return (
    <ol className="mx-auto px-2 max-w-[700px] overflow-hidden">
      {countries.map((country, i) => (
        <CountryListItem
          key={country.iso_code3}
          country={country}
          inPropUp={i >= deletedIndexRef.current}
          handleClick={() => handleClick(i)}
        />
      ))}
    </ol>
  );
};
