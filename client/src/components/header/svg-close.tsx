import * as React from "react";

function SvgClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.717 7.011L.267 1.56A.906.906 0 111.548.277L7 5.73 12.451.277a.906.906 0 111.283 1.283L8.283 7.01l5.45 5.452a.906.906 0 11-1.282 1.283l-5.45-5.452-5.452 5.451a.905.905 0 01-1.283 0 .906.906 0 010-1.282L5.717 7.01z"
        fill="#F1B84A"
      />
    </svg>
  );
}

export default SvgClose;
