"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import EmptyWorkspace from "./EmptyWorkspace";
import { useRouter } from "next/navigation";
import axios from "axios";

function WorkspaceBody() {
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    GetGithubUserToken();
  }, []);

  const GetGithubUserToken = async () => {
    const result = await axios.get("/api/github/token");
    console.log(result.data.token);
    setToken(result.data.token);
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
          {!token ? (
            <Button onClick={onAddRepo}>Setup</Button>
          ) : (
            <Button>+ Add Repo</Button>
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
