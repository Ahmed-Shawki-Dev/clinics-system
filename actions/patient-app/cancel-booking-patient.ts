"use server";

import { fetchApi } from "@/lib/fetchApi";
import { revalidatePath } from "next/cache";
import { BaseApiResponse } from "../../types/api";
import { IBooking } from "../../types/booking";

export async function cancelBookingAction(
  bookingId: string,
  reason: string,
  tenantSlug: string,
): Promise<BaseApiResponse<IBooking>> {
  const result = await fetchApi<IBooking>(
    `/api/clinic/bookings/${bookingId}/cancel`,
    {
      method: "PUT",
      authType: "patient",
      body: JSON.stringify({ reason }),
      tenantSlug,
    },
  );

  if (result.success) {
    // 👈 دي اللي بتخلي الصفحة السيرفر تتحدث أوتوماتيك
    revalidatePath(`/${tenantSlug}/patient/bookings`);
  }

  return result;
}
