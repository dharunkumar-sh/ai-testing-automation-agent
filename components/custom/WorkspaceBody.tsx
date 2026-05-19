"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import EmptyWorkspace from "./EmptyWorkspace";
import axios from "axios";
import RepoDialog, { Repo } from "./RepoDialog";
import UserRepoList from "./UserRepoList";

export type UserRepo = {
  id: number;
  repoId: number;
  name: string;
  fullName: string;
  private: boolean;
  html_url: string;
  description: string;
  userId: number;
  owner: string;
  updatedAt: string;
  language: string;
  defaultBranch: string | null;
};

function WorkspaceBody() {
  const { userDetail } = useContext(UserDetailContext);
  const [isGithubConnected, setIsGithubConnected] = useState(false);
  const [userRepoList, setUserRepoList] = useState<UserRepo[]>([]);

  useEffect(() => {
    userDetail && GetUserAddedRepoList();
  }, [userDetail]);

  useEffect(() => {
    GetGithubUserToken();
  }, []);

  const GetGithubUserToken = async () => {
    const result = await axios.get("/api/github/token");
    const connected = Boolean(result.data.connected);
    setIsGithubConnected(connected);
    if (connected && userDetail) {
      GetUserAddedRepoList();
    }
  };

  const onAddRepo = async () => {
    window.location.href = "/api/github";
  };

  const GetUserAddedRepoList = async () => {
    const result = await axios.get("/api/user-repo?userId=" + userDetail?.id);
    setUserRepoList(result.data);
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
            <RepoDialog setRefreshPage={() => GetUserAddedRepoList()} />
          )}
        </div>
      </Card>
      {!userRepoList ? (
        <Card className="mt-10">
          <CardContent>
            <EmptyWorkspace />
          </CardContent>
        </Card>
      ) : (
        <UserRepoList repoList={userRepoList} />
      )}
    </div>
  );
}

export default WorkspaceBody;
