import * as React from "react";

function SvgArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={21}
      height={11}
      viewBox="0 0 21 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.861 5.836L16.09 10.61a.477.477 0 11-.673-.673l3.956-3.961H.477a.477.477 0 010-.955h18.895l-3.956-3.956a.477.477 0 11.673-.673l4.772 4.773a.477.477 0 010 .672z"
        fill="#000"
      />
    </svg>
  );
}

export default SvgArrowRight;
