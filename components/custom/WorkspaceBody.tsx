"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import EmptyWorkspace from "./EmptyWorkspace";

const WorkspaceBody = () => {
  const { userDetail } = useContext(UserDetailContext);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-medium">Workspace</h2>
        <h2 className="text-blue-800 bg-blue-200 p-2 rounded-lg">
          Remaining Credits: {userDetail?.credits ?? 0}
        </h2>
      </div>
      <Card className="mt-5 flex justify-between items-center p-4 border rounded">
        <div className="flex gap-5 items-center">
          <Image src={"/github.png"} alt="github" width={40} height={40} />
          <h2 className="text-lg">Connect GitHub & Add Repo</h2>
        </div>
        <div>
          <Button> Install</Button>
        </div>
      </Card>
      <Card className="mt-10">
        <CardContent>
          <EmptyWorkspace />
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceBody;
