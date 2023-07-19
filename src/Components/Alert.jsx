import React,{ useContext} from "react";
import noteContext from "../Context/Notes/noteContext";
function Alert() {
    const context = useContext(noteContext);
    const {alert} = context;
  return (
    <>
      <div class="bg-white text-center py-2 lg:px-4">
        <div
          class={`p-2 bg-${alert.color}-500 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex`}
          role="alert"
        >
          <span class="font-semibold mr-2 text-left flex-auto">
            {alert.message}
          </span>
        </div>
      </div>
    </>
  );
}

export default Alert;
