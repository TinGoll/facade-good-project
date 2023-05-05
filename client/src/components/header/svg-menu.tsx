import * as React from "react";

function SvgMenu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={21}
      height={14}
      viewBox="0 0 21 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={21} height={2} rx={1} fill="#fff" />
      <rect y={6} width={21} height={2} rx={1} fill="#fff" />
      <rect y={12} width={21} height={2} rx={1} fill="#fff" />
    </svg>
  );
}

export default SvgMenu;
