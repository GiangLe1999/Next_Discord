import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { NextPage } from "next";
import { redirect } from "next/navigation";

interface Props {
  params: { inviteCode: string };
}

const page: NextPage<Props> = async ({ params }) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  if (!params) return redirect("/");

  //   Nếu người dùng hiện tại đã là 1 member của server rồi
  // Redirect người dùng về server
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: { some: { profileId: profile.id } },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: { inviteCode: params.inviteCode },
    data: { members: { create: [{ profileId: profile.id }] } },
  });

  // Sau khi thêm người dùng vào members của server xong
  // Redirect người dùng về server page
  if (server) return redirect(`/servers/${server.id}`);

  return null;
};

export default page;
