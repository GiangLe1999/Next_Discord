"use client";

import { ServerWithMemberAndProfile } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { FC } from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";

const dropdown_item_classes = "px-3 py-2 text-sm cursor-pointer";

interface Props {
  server: ServerWithMemberAndProfile;
  role?: MemberRole;
}

const ServerHeader: FC<Props> = ({ server, role }): JSX.Element => {
  const isAdmin = role === MemberRole.ADMIN;
  const { onOpen } = useModal();

  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      {/* asChild dùng để lồng 1 button bên trong 1 button*/}
      {/* Nếu không có asChild việc 1 button lồng 1 button sẽ gây ra warning */}
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {/* Chỉ Moderator mới được phép mời người khác vào Server */}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className={cn(
              "text-indigo-600 dark:text-indigo-400",
              dropdown_item_classes
            )}
          >
            Invite People
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server })}
            className={dropdown_item_classes}
          >
            Server Settings
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { server })}
            className={dropdown_item_classes}
          >
            Manage Members
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem className={dropdown_item_classes}>
            Create Channel
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isModerator && <DropdownMenuSeparator />}

        {isAdmin && (
          <DropdownMenuItem
            className={cn("text-rose-500", dropdown_item_classes)}
          >
            Delete Server
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {!isAdmin && (
          <DropdownMenuItem
            className={cn("text-rose-500", dropdown_item_classes)}
          >
            Leave Server
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
