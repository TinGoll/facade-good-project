import * as React from "react";

function SvgPaginationLeft(props: React.SVGProps<SVGSVGElement>) {
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
        d="M.125 9c0 .208.08.416.238.574L8.488 17.7a.812.812 0 101.149-1.148L2.087 9l7.55-7.55A.812.812 0 108.488.3L.363 8.427A.81.81 0 00.125 9z"
        fill="#394C60"
      />
    </svg>
  );
}

export default SvgPaginationLeft;
