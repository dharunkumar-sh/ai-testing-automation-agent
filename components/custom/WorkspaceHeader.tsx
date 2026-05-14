import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const WorkspaceHeader = () => {
  return (
    <div className="flex w-full justify-between p-4">
      <Image src={"/logo.svg"} width={150} height={28} alt={"logo"} />

      <ul className="flex gap-5 text-xl">
        <li className="hover:text-blue-600 cursor-pointer">Workspace</li>
        <li className="hover:text-blue-600 cursor-pointer">Pricing</li>
        <li className="hover:text-blue-600 cursor-pointer">Support</li>
      </ul>
      <UserButton />
    </div>
  );
};

export default WorkspaceHeader;
