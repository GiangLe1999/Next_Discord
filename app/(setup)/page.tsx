import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import InitialModal from "@/components/modals/initial-modal";

const SetupPage = async () => {
  const profile = await initialProfile();

  // Trong tất cả các server, lấy ra server đầu tiên mà user thuộc về
  // Tức là profile id của user là 1 trong các element thuộc mảng profileId của server
  const server = await db.server.findFirst({
    where: { members: { some: { profileId: profile.id } } },
  });

  // Nếu user thực sự nằm trong 1 server nào thì chuyển hướng tới server đó
  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  // Còn nếu user không nằm trong bất cứ server nào thì hiển thị nút Create Server
  return <InitialModal />;
};

export default SetupPage;
