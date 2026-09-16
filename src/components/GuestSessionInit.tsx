"use client";

import { useEffect } from "react";

import { createGuestSession } from "@/lib/auth/actions";

export default function GuestSessionInit() {
  useEffect(() => {
    void createGuestSession();
  }, []);

  return null;
}
