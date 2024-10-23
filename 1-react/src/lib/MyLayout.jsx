import React from "react";
import Dialog from "../components/Dialog";
import Backdrop from "../components/Backdrop";
import { getComponentName } from "./utils";
import ReactDom from "react-dom";

export const layoutContext = React.createContext({});
layoutContext.displayName = "LayoutContext";

export const Layout = ({ children }) => {
  const [dialog, setDialog] = React.useState();

  const value = {
    dialog,
    setDialog,
  };

  return (
    <layoutContext.Provider value={value}>{children}</layoutContext.Provider>
  );
};

export const useDialog = () => {
  const { dialog, setDialog } = React.useContext(layoutContext);

  const openDialog = (dialog) => setDialog(dialog);
  const closeDialog = () => setDialog(null);
  const startLoading = (message) => openDialog(<Dialog>{message}</Dialog>);
  const finishLoading = closeDialog;

  return { dialog, openDialog, closeDialog, startLoading, finishLoading };
};

export const DialogContainer = () => {
  const { dialog } = useDialog();
  return (
    dialog &&
    ReactDom.createPortal(
      <Backdrop>{dialog}</Backdrop>,
      document.querySelector("#dialog")
    )
  );
};
