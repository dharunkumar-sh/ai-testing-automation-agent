"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import EmptyWorkspace from "./EmptyWorkspace";
import { useRouter } from "next/navigation";
import axios from "axios";
import RepoDialog from "./RepoDialog";

function WorkspaceBody() {
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const [isGithubConnected, setIsGithubConnected] = useState(false);

  useEffect(() => {
    checkGithubConnection();
  }, []);

  const checkGithubConnection = async () => {
    try {
      const result = await axios.get("/api/token");
      setIsGithubConnected(result.data.connected ?? false);
    } catch (error) {
      console.error("Failed to check GitHub connection:", error);
    }
  };

  const onAddRepo = async () => {
    router.push("/api/github");
  };
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
          {!isGithubConnected ? (
            <Button onClick={onAddRepo}>Setup</Button>
          ) : (
            <RepoDialog
              setRefreshPage={(refresh: boolean) => console.log(refresh)}
            />
          )}
        </div>
      </Card>
      <Card className="mt-10">
        <CardContent>
          <EmptyWorkspace />
        </CardContent>
      </Card>
    </div>
  );
}

export default WorkspaceBody;
