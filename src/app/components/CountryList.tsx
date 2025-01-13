/* eslint-disable @next/next/no-img-element */
"use client";

import { FC, useState } from "react";
import { CountriesDTO } from "../lib/types";
import { Button } from "./Button";

type Props = {
  countryList: CountriesDTO;
};

export const CountryList: FC<Props> = ({ countryList }) => {
  const [countries, setCountries] = useState(countryList);
  const handleClick = (id: string): void => {
    const newList = countries.filter((country) => country.iso_code3 !== id);
    setCountries(newList);
  };

  return (
    <ol className="px-8">
      {countries.map((country) => (
        <li
          key={country.iso_code3}
          className="grid grid-cols-[80px_100px_480px_20px] mb-2"
        >
          {country.flag_url ? (
            <div className="flex items-center">
              <img src={`https:${country.flag_url}`} alt={country.iso_code3} />
            </div>
          ) : (
            <div className="w-9 h-6" />
          )}
          <p className="w-10 ml-1">{country.iso_code3}</p>
          <p className="w-[424px]">{country.name_ru}</p>
          <Button handleClick={() => handleClick(country.iso_code3)} />
        </li>
      ))}
    </ol>
  );
};
