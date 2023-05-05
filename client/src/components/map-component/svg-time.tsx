import * as React from "react";

function SvgContactTime(props: React.SVGProps<SVGSVGElement>) {
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
        d="M7 0C3.14 0 0 3.14 0 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 13.067A6.073 6.073 0 01.933 7 6.074 6.074 0 017 .933 6.073 6.073 0 0113.066 7 6.073 6.073 0 017 13.067z"
        fill="#0C78ED"
      />
      <path
        d="M10.466 6.493h-3V2.526a.467.467 0 10-.933 0v4.9h3.933a.466.466 0 100-.933z"
        fill="#0C78ED"
      />
    </svg>
  );
}

export default SvgContactTime;
