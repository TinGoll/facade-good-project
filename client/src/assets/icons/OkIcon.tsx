import * as React from "react";

function OkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
      <path d="M12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707-1.414-1.414z"></path>
    </svg>
  );
}

export default OkIcon;
