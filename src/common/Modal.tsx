// import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type ModalComponentProps = {
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: string;
  modalText: string;
};

export function ModalComponent({
  modalIsOpen,
  setIsOpen,
  modalData,
  modalText,
}: ModalComponentProps) {
  //   const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  console.log({ modalData });

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <div style={{ height: "100%", width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              width: "90%",
              zIndex: 20,
            }}
          >
            <button
              style={{
                fontSize: "1.1em",
                width: "5em",
                height: "100%",
              }}
              onClick={closeModal}
            >
              X
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              height: "3em",
            }}
          >
            {/* <button
              style={{ border: "1px solid red", width: "5em", height: "100%" }}
              onClick={closeModal}
            >
              x
            </button> */}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {modalData && modalData != "images/null" ? (
              <img src={modalData} />
            ) : null}
            {modalData === "images/null" ? (
              <video playsInline controls style={{ width: "20%" }}>
                <source
                  src={"/images/3195394-uhd_3840_2160_25fps.mp4"}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
          <div style={{ textAlign: "center" }}>
            {modalText ? <p>{modalText}</p> : null}
          </div>
        </div>
      </Modal>
    </div>
  );
}
