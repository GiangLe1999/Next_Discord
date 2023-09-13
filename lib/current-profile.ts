import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  // Tìm profile trong database tương ứng với user hiện tại
  const profile = await db.profile.findUnique({ where: { userId } });

  return profile;
};
