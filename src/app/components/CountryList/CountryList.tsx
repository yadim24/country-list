/* eslint-disable @next/next/no-img-element */
"use client";

import { FC, useState } from "react";
import { CountriesDTO } from "../../lib/types";
import { CountryListItem } from "./CountryListItem";

// const duration1 = 800;

// const defaultStyle1 = {
//   transition: `transform ${duration1}ms ease-in-out`,
// };

// const transitionStyles1: Partial<Record<TransitionStatus, CSSProperties>> = {
//   entering: { transform: "translateX(100%)" },
//   entered: { transform: "translateX(100%)" },
//   exiting: { transform: "none" },
//   exited: { transform: "none" },
// };

// const duration2 = 800;

// const defaultStyle2 = {
//   transition: `transform ${duration2}ms ease-in-out`,
// };

// const transitionStyles2: Partial<Record<TransitionStatus, CSSProperties>> = {
//   // entering: { transform: "translateY(-32px)" },
//   // entered: { transform: "translateY(-32px)" },
//   // exiting: { transform: "none" },
//   // exited: { transform: "none" },
//   entering: { transform: "none" },
//   entered: { transform: "none" },
//   exiting: { transform: "translateY(-32px)" },
//   exited: { transform: "translateY(-32px)" },
// };

// const duration3 = 400;

// const defaultStyle3 = {
//   transition: `transform ${duration1}ms ease-in-out`,
// };

// const transitionStyles3: Partial<Record<TransitionStatus, CSSProperties>> = {
//   entering: { transform: "translateX(100%)" },
//   entered: { transform: "translateX(100%)" },
//   exiting: { transform: "translateX(100%)" },
//   exited: { transform: "translateX(100%)" },
// };

// const duration4 = 400;

// const defaultStyle4 = {
//   transition: `transform ${duration2}ms ease-in-out`,
// };

// const transitionStyles4: Partial<Record<TransitionStatus, CSSProperties>> = {
//   // entering: { transform: "translateY(-32px)" },
//   // entered: { transform: "translateY(-32px)" },
//   // exiting: { transform: "none" },
//   // exited: { transform: "none" },
//   entering: { transform: "none" },
//   entered: { transform: "none" },
//   exiting: { transform: "none" },
//   exited: { transform: "none" },
// };

// type DefaultStyle = {
//   transition: string;
// };

type Props = {
  countryList: CountriesDTO;
};

export const CountryList: FC<Props> = ({ countryList }) => {
  const [countries, setCountries] = useState(countryList);
  console.log("Debug ~ countries:", countries.length);
  const [deletedIndex, setDeletedIndex] = useState(-1);
  const [finished, setFinished] = useState(false);

  //   const currentTransition = (index: number): [
  //   DefaultStyle,
  //   Partial<Record<TransitionStatus, CSSProperties>>,
  //   number,
  // ] => {
  //   if (!finished && deletedIndex !== -1 && index > deletedIndex)
  //     return [defaultStyle2, transitionStyles2, duration2];

  //   if (finished && deletedIndex !== index)
  //     return [defaultStyle3, transitionStyles3, duration3];

  //   if (finished && deletedIndex !== -1 && index > deletedIndex)
  //     return [defaultStyle4, transitionStyles4, duration4];

  //   return [defaultStyle1, transitionStyles1, duration1];
  // };

  // const [defaultStyle, transitionStyles, duration] = currentTransition();

  const handleClick = (): void => {
    // useEffect(() => {
    // if (finished) {
    const newList = countries.filter((_country, i) => i !== deletedIndex);
    // console.log("Debug ~ newList:", newList.length);
    setCountries(newList);
    setDeletedIndex(-1);
    // setFinished(false);
    // console.log("Debug ~ deletedIndex:", deletedIndexRef.current);
    // }
  };

  return (
    <ol className="mx-auto px-2 max-w-[700px] overflow-hidden">
      {countries.map((country, i) => (
        <CountryListItem
          key={country.iso_code3}
          // defaultStyle={
          //   deletedIndex !== -1 && i > deletedIndex
          //     ? defaultStyle2
          //     : defaultStyle1
          // }
          // transitionStyles={
          //   deletedIndex !== -1 && i > deletedIndex
          //     ? transitionStyles2
          //     : transitionStyles1
          // }
          country={country}
          countryIndex={i}
          deletedIndex={deletedIndex}
          finished={finished}
          // duration={i > deletedIndex ? duration2 : duration1}
          setFinished={() => setFinished(true)}
          setDeletedIndex={() => setDeletedIndex(i)}
          handleClick={handleClick}
        />
      ))}
    </ol>
  );
};
