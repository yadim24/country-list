/* eslint-disable @next/next/no-img-element */
"use client";

import { CSSProperties, FC, useEffect, useState } from "react";
import { TransitionStatus } from "react-transition-group";
import { CountriesDTO } from "../../lib/types";
import { CountryListItem } from "./CountryListItem";

const duration1 = 500;

const defaultStyle1 = {
  transition: `transform ${duration1}ms ease-in-out`,
};

const transitionStyles1: Partial<Record<TransitionStatus, CSSProperties>> = {
  entering: { transform: "translateX(100%)" },
  entered: { transform: "translateX(100%)" },
  exiting: { transform: "none" },
  exited: { transform: "none" },
};

const duration2 = 800;

const defaultStyle2 = {
  transition: `transform ${duration2}ms ease-in-out`,
};

const transitionStyles2: Partial<Record<TransitionStatus, CSSProperties>> = {
  entering: { transform: "translateY(-32px)" },
  entered: { transform: "translateY(-32px)" },
  exiting: { transform: "none" },
  exited: { transform: "none" },
};

type Props = {
  countryList: CountriesDTO;
};

export const CountryList: FC<Props> = ({ countryList }) => {
  const [countries, setCountries] = useState(countryList);
  const [deletedIndex, setDeletedIndex] = useState(-1);
  const [finished, setFinished] = useState(false);

  // const handleClick = (): void => {
  useEffect(() => {
    if (finished) {
      const newList = countries.filter((_country, i) => i !== deletedIndex);
      console.log("Debug ~ newList:", newList.length);
      setCountries(newList);
      setDeletedIndex(-1);
      setFinished(false);
      // console.log("Debug ~ deletedIndex:", deletedIndexRef.current);
    }
  }, [finished]);

  return (
    <ol className="mx-auto px-2 max-w-[700px] overflow-hidden">
      {countries.map((country, i) => (
        <CountryListItem
          key={country.iso_code3}
          defaultStyle={i > deletedIndex ? defaultStyle2 : defaultStyle1}
          transitionStyles={
            i > deletedIndex ? transitionStyles2 : transitionStyles1
          }
          country={country}
          countryIndex={i}
          deletedIndex={deletedIndex}
          finished={finished}
          duration={i > deletedIndex ? duration2 : duration1}
          setFinished={() => setFinished(true)}
          setDeletedIndex={() => setDeletedIndex(i)}
          // handleClick={handleClick}
        />
      ))}
    </ol>
  );
};
