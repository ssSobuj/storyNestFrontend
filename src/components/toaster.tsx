"use client";

import * as React from "react";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-0 right-0 z-[100] flex flex-col gap-2 p-4 sm:max-w-[420px]">
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <p className="font-medium">{title}</p>}
            {description && <p className="text-sm opacity-90">{description}</p>}
          </div>
          {action}
        </Toast>
      ))}
    </div>
  );
}
