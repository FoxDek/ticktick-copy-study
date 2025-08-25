import { cva } from "class-variance-authority";

const loaderContent = cva("loaderContentbg-opacity-70 flex flex-col gap-4 items-center justify-center my-auto h-full");
const loaderSpinner = cva("loaderSpinner w-12 h-12 border-4 border-t-transparent rounded-full animate-spin");
const loaderText = cva("loaderText text-gray-600 font-medium");

function Loader({ spinnerColor }) {
  return (
    <div className={loaderContent()}>
      <div className={loaderSpinner({ className: spinnerColor })}></div>
      <p className={loaderText()}>
      Loading...

      </p>
    </div>
  );
}

export default Loader;
