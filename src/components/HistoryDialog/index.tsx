"use client";

import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { atom, useAtom } from "jotai";
import HistoryView from "./View";

const historyAtom = atom<boolean>(false);
export function useHistoryDialog() {
  return useAtom(historyAtom);
}

export default function HistoryDialog() {
  const [open, setOpen] = useHistoryDialog();

  return (
    <Dialog.Root
      lazyMount
      unmountOnExit
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      scrollBehavior="inside"
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(15px)" />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="1rem">
            <Dialog.Header>
              <Dialog.Title>History</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <HistoryView />
            </Dialog.Body>
            {/* <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.ActionTrigger>
            <Button>Save</Button>
          </Dialog.Footer> */}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
