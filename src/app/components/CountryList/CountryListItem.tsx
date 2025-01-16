"use client";

import { CountryDTO } from "@/app/lib/types";
import Image from "next/image";
import { CSSProperties, FC, useRef } from "react";
import { Transition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";
import { Button } from "../Button";

const duration1 = 800;

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
  // entering: { transform: "none" },
  // entered: { transform: "none" },
  // exiting: { transform: "translateY(-32px)" },
  // exited: { transform: "translateY(-32px)" },
};

const duration3 = 400;

const defaultStyle3 = {
  transition: `transform ${duration1}ms ease-in-out`,
};

const transitionStyles3: Partial<Record<TransitionStatus, CSSProperties>> = {
  entering: { transform: "translateX(100%)" },
  entered: { transform: "translateX(100%)" },
  exiting: { transform: "translateX(100%)" },
  exited: { transform: "translateX(100%)" },
};

const duration4 = 400;

const defaultStyle4 = {
  transition: `transform ${duration2}ms ease-in-out`,
};

const transitionStyles4: Partial<Record<TransitionStatus, CSSProperties>> = {
  // entering: { transform: "translateY(-32px)" },
  // entered: { transform: "translateY(-32px)" },
  // exiting: { transform: "none" },
  // exited: { transform: "none" },
  entering: { transform: "none" },
  entered: { transform: "none" },
  exiting: { transform: "none" },
  exited: { transform: "none" },
};

type DefaultStyle = {
  transition: string;
};

type Props = {
  // defaultStyle: DefaultStyle;
  // transitionStyles: Partial<Record<TransitionStatus, CSSProperties>>;
  country: CountryDTO;
  countryIndex: number;
  deletedIndex: number;
  finished: boolean;
  // duration: number;
  setFinished: () => void;
  setDeletedIndex: () => void;
  handleClick: () => void;
};

export const CountryListItem: FC<Props> = ({
  // defaultStyle,
  // transitionStyles,
  country,
  countryIndex,
  deletedIndex,
  finished,
  // duration,
  setFinished,
  setDeletedIndex,
  handleClick,
}) => {
  const nodeRef = useRef(null);
  // const [inPropDelete, setInPropDelete] = useState(false);

  const currentTransition = (): [
    DefaultStyle,
    Partial<Record<TransitionStatus, CSSProperties>>,
    number,
  ] => {
    if (!finished && deletedIndex !== -1 && countryIndex > deletedIndex)
      return [defaultStyle2, transitionStyles2, duration2];

    if (finished && deletedIndex === countryIndex)
      return [defaultStyle3, transitionStyles3, duration3];

    if (finished && deletedIndex !== -1 && countryIndex > deletedIndex)
      return [defaultStyle4, transitionStyles4, duration4];

    return [defaultStyle1, transitionStyles1, duration1];
  };

  const [defaultStyle, transitionStyles, duration] = currentTransition();
  // console.log("Debug ~ duration:", duration);
  // console.log("Debug ~ transitionStyles:", transitionStyles);
  console.log(
    "Debug ~ in:",
    !finished && deletedIndex !== -1 && countryIndex >= deletedIndex,
  );

  const handleFinish = (): void => {
    setFinished();
    handleClick();
  };

  return (
    <Transition
      nodeRef={nodeRef}
      in={!finished && deletedIndex !== -1 && countryIndex >= deletedIndex}
      timeout={duration}
      onEntered={setFinished}
      onExited={handleClick}
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
