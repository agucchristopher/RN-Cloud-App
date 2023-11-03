import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";

import { createClient } from "@supabase/supabase-js";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Initialize the Supabase client
export const supabase = createClient(
  "https://glvroebvmwmpfrmvyjpn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdnJvZWJ2bXdtcGZybXZ5anBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMDAxOTgsImV4cCI6MjAxNDU3NjE5OH0.lMEzwMqsFfWTS_6oN_iQ-KwnQhyc__qh1zyWrCncKL0",
  {
    auth: {
      storage: AsyncStorage,
      detectSessionInUrl: false,
    },
  }
);
