import * as React from "react";

function SvgPaginationRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={10}
      height={18}
      viewBox="0 0 10 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.875 9a.81.81 0 01-.238.574L1.512 17.7a.812.812 0 11-1.149-1.148L7.913 9 .364 1.45A.812.812 0 111.512.3l8.125 8.126A.81.81 0 019.875 9z"
        fill="#394C60"
      />
    </svg>
  );
}

export default SvgPaginationRight;
