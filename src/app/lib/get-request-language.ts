import { cookies } from "next/headers";

import {
  LANGUAGE_COOKIE_NAME,
  normalizeLanguage,
} from "@/i18n/config";
import type { LanguageCode } from "@/types/localization";

export async function getRequestLanguage(): Promise<LanguageCode> {
  const cookieStore = await cookies();

  return normalizeLanguage(
    cookieStore.get(LANGUAGE_COOKIE_NAME)?.value,
  );
}
