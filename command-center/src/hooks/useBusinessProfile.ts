import { useCallback, useEffect, useState } from "react";
import type { BusinessProfile } from "../types";
import { loadJson, saveJson } from "../lib/storage";

const STORAGE_KEY = "business.v1";

const DEFAULT_PROFILE: BusinessProfile = {
  companyName: "Your Construction Business",
  tagline: "Quality construction, on time.",
  address: "Address line 1, City, Province",
  phone: "+63 9XX XXX XXXX",
  email: "you@example.ph",
  tin: "",
  paymentInstructions:
    "Payable to [Company Name]. Bank: [Bank Name], Account: [Number]. GCash: [Number].",
};

export function useBusinessProfile() {
  const [profile, setProfile] = useState<BusinessProfile>(() =>
    loadJson<BusinessProfile>(STORAGE_KEY, DEFAULT_PROFILE)
  );

  useEffect(() => {
    saveJson(STORAGE_KEY, profile);
  }, [profile]);

  const updateProfile = useCallback((next: BusinessProfile) => {
    setProfile(next);
  }, []);

  return { profile, updateProfile };
}
