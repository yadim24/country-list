import { CountryDTO } from "@/app/lib/types";
import { CSSProperties, FC, useRef, useState } from "react";
import { Transition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";
import { Button } from "../Button";

const duration = 700;

// const defaultStyle = {
//   transition: `transform ${duration}ms ease-in-out`,
//   transform: "translateX(0)",
// };

// const transitionStyles: Partial<Record<TransitionStatus, CSSProperties>> = {
//   entering: { transform: "translateX(100%)" },
//   entered: { transform: "translateX(100%)" },
// };

const defaultStyle1 = {
  transition: `transformX ${duration}ms ease-in-out`,
};

const transitionStyles1: Partial<Record<TransitionStatus, CSSProperties>> = {
  entering: { transform: "translateX(100%)" },
  entered: { transform: "translateX(100%)" },
};

const defaultStyle2 = {
  transition: `transformY ${duration}ms ease-in-out`,
};

const transitionStyles2: Partial<Record<TransitionStatus, CSSProperties>> = {
  entering: { transform: "translateY(-100%)" },
  entered: { transform: "translateY(-100%)" },
  // exiting: { transform: "translateY(-100%)" },
  // exited: { transform: "translateY(-100%)" },
};

type Props = {
  country: CountryDTO;
  inPropUp: boolean;
  handleClick: () => void;
};

export const CountryListItem: FC<Props> = ({
  country,
  inPropUp,
  handleClick,
}) => {
  // console.log("Debug ~ inPropUp:", inPropUp);
  const nodeRef = useRef(null);
  const [inPropDelete, setInPropDelete] = useState(false);
  const defaultStyle = inPropUp ? defaultStyle2 : defaultStyle1;
  const transitionStyles = inPropUp ? transitionStyles2 : transitionStyles1;

  return (
    <Transition
      nodeRef={nodeRef}
      in={inPropDelete || inPropUp}
      timeout={duration}
      {...(inPropDelete && { onEntered: handleClick })}
    >
      {(state) => (
        <li
          key={country.iso_code3}
          ref={nodeRef}
          className="grid grid-cols-[80px_100px_480px_20px] mb-2"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
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
          <Button handleClick={() => setInPropDelete(true)} />
        </li>
      )}
    </Transition>
  );
};
