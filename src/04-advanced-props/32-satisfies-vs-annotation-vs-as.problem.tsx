import { ComponentProps } from "react";
import { Equal, Expect } from "../helpers/type-utils";

const buttonProps = {
  type: "button",
  // This should be erroring! Why isn't it?
  illegalProperty: "I AM ILLEGAL",
};

<>
  <button {...buttonProps}>Click Me!</button>
</>;

const buttonPropType = buttonProps.type;

type test = Expect<Equal<typeof buttonPropType, "button">>;
