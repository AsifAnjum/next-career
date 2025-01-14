"use client";

import { useEffect } from "react";
import { Button } from "./button";

const PrimaryModal = ({
  message,
  className,
  setShowModal,
}: {
  message: string;
  className?: string | undefined;
  setShowModal: (value: boolean) => void;
}) => {
  useEffect(() => {
    // Automatically show modal when the component is mounted
    const modal = document.getElementById("primary_modal");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }

    // Close the modal when the component is unmounted
    return () => {
      const modal = document.getElementById("primary_modal");
      if (modal) {
        (modal as HTMLDialogElement).close();
      }
    };
  }, [setShowModal]);
  return (
    <dialog
      id="primary_modal"
      className={` bg-black border border-slate-200 text-white rounded-lg p-5`}
    >
      <div className="">
        {/* Close button inside the modal */}

        {/* <Button
          variant="outline"
          size="icon"
          onClick={() => setShowModal(false)}
          className="absolute rounded-full bg-transparent border-white hover:bg-white hover:text-black right-2 top-2"
        >
          ✕
        </Button> */}

        <p className={` ${className} p-3 text-xl  font-semibold`}>{message}</p>
      </div>
      {/* Add the modal-backdrop to allow closing by clicking outside */}

      <Button
        variant="primaryOutline"
        onClick={() => setShowModal(false)}
        type="submit"
      >
        close
      </Button>
    </dialog>
  );
};

export default PrimaryModal;
