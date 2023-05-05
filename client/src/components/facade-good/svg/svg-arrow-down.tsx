import * as React from "react";

function SvgArrowDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={28}
      viewBox="0 0 16 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.449 27.815l6.363-6.364a.636.636 0 10-.897-.897L8.633 25.83V.636a.636.636 0 00-1.272 0V25.83l-5.276-5.276a.636.636 0 10-.897.898l6.363 6.363a.636.636 0 00.898 0z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgArrowDown;
