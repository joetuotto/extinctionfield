"use client";

import { useEffect, useRef } from "react";

interface ClaimRefProps {
  claimId: string;
  children: React.ReactNode;
  className?: string;
}

export function ClaimRef({ claimId, children, className }: ClaimRefProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.dataset.claimId = claimId;
    }
  }, [claimId]);

  return (
    <span
      ref={ref}
      data-claim-id={claimId}
      data-claim-ref=""
      className={className}
    >
      {children}
    </span>
  );
}
