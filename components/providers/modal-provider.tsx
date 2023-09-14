"use client";
// Cả server component và use client component đều được render theo kiểu server-side-rendering
// Nhưng use client component còn đồng thời render theo kiểu client-side-rendering
// Đây là nguyên nhân gây ra Hydration error khi mà 1 state render trên server, 1 state khác lại được
// render trên client
// Modal thường gặp vấn đề này vì nó dùng useEffect để render
// Ta phải làm sao để Modal chỉ render ở client side để thoát khỏi lỗi này

import CreateServerModal from "@/components/modals/create-server-modal";

import { FC, useEffect, useState } from "react";
import InviteModal from "../modals/invite-modal";
import EditServerModal from "../modals/edit-server-modal";
import MembersModal from "../modals/members-modal";

interface Props {}

const ModalProvider: FC<Props> = (props): JSX.Element | null => {
  // Xử lý lỗi Hydration
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
    </>
  );
};

export default ModalProvider;
