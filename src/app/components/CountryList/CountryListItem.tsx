"use client";

import { CountryDTO } from "@/app/lib/types";
import Image from "next/image";
import { CSSProperties, FC, useRef } from "react";
import { Transition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";
import { Button } from "../Button";

// const duration = 1000;

// const defaultStyle = {
//   transition: `transform ${duration}ms ease-in-out`,
// };

// const transitionStyles: Partial<Record<TransitionStatus, CSSProperties>> = {
//   entering: { transform: "none" },
//   entered: { transform: "translateX(100%)" },
//   exiting: { transform: "none" },
//   exited: { transform: "translateY(32px)" },
// };

// const duration1 = 600;

// const defaultStyle1 = {
//   transition: `transformX ${duration1}ms ease-in-out`,
// };

// const transitionStyles1: Partial<Record<TransitionStatus, CSSProperties>> = {
//   entering: { transform: "none" },
//   entered: { transform: "translateX(100%)" },
// };

// const duration2 = 600;

// const defaultStyle2 = {
//   transition: `transformY ${duration2}ms ease-in-out`,
// };

// const transitionStyles2: Partial<Record<TransitionStatus, CSSProperties>> = {
//   entering: { transform: "none" },
//   entered: { transform: "translateY(-32px)" },
// };

type DefaultStyle = {
  transition: string;
};

type Props = {
  defaultStyle: DefaultStyle;
  transitionStyles: Partial<Record<TransitionStatus, CSSProperties>>;
  country: CountryDTO;
  countryIndex: number;
  deletedIndex: number;
  finished: boolean;
  duration: number;
  setFinished: () => void;
  setDeletedIndex: () => void;
  // handleClick: () => void;
};

export const CountryListItem: FC<Props> = ({
  defaultStyle,
  transitionStyles,
  country,
  countryIndex,
  deletedIndex,
  finished,
  duration,
  setFinished,
  setDeletedIndex,
  // handleClick,
}) => {
  const nodeRef = useRef(null);
  // const [inPropDelete, setInPropDelete] = useState(false);

  // const currentTransition = (): [
  //   DefaultStyle,
  //   Partial<Record<TransitionStatus, CSSProperties>>,
  //   number,
  // ] => {
  //   if (countryIndex > deletedIndex)
  //     return [defaultStyle2, transitionStyles2, duration2];

  //   return [defaultStyle1, transitionStyles1, duration1];
  // };

  // const [defaultStyle, transitionStyles, duration] = currentTransition();
  // console.log("Debug ~ duration:", duration);
  // console.log("Debug ~ transitionStyles:", transitionStyles);
  // console.log("Debug ~ defaultStyle:", defaultStyle);

  return (
    <Transition
      nodeRef={nodeRef}
      in={deletedIndex !== -1 && countryIndex >= deletedIndex}
      timeout={duration}
      onEntered={setFinished}
    >
      {(state) => (
        <li
          key={country.iso_code3}
          ref={nodeRef}
          className="grid grid-cols-[80px_100px_480px_20px] items-center mb-2"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
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
          <Button handleClick={() => setDeletedIndex()} />
        </li>
      )}
    </Transition>
  );
};
