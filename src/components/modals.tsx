"use client";

import { useEffect, useState } from "react";

import CreateWorkspaceModal from "@/features/workspaces/components/create-workspace-modal";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // only render modals when mounted to preven hydration errors
  if (!mounted) return null;

  return (
    <>
      <CreateWorkspaceModal />
    </>
  );
};
