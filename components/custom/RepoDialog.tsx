"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { Input } from "../ui/input";
import { UserDetailContext } from "@/context/UserDetailContext";

type Repo = {
  id: number;
  name: string;
  full_name: string;
  private_: boolean;
  html_url: string;
  description: string;
  language: string;
  updated_at: string;
  default_branch: string;
  owner: string;
};

const RepoDialog = ({
  setRefreshPage,
}: {
  setRefreshPage: (refresh: boolean) => void;
}) => {
  const [repoList, setRepoList] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { userDetail } = useContext(UserDetailContext);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    GetRepoList();
  }, []);

  const GetRepoList = async () => {
    const result = await axios.get("/api/github/repos");
    setRepoList(result.data);
    console.log(result.data);
  };

  const filteredRepoList = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    if (!q) return repoList;

    return repoList.filter((r) => r.full_name.toLowerCase().includes(q));
  }, [searchTerm, repoList]);

  const SaveRepoToDB = async () => {
    if (!selectedRepo) return;

    const result = await axios.post("/api/user-repo", {
      repoId: selectedRepo.id,
      name: selectedRepo.id,
      full_name: selectedRepo.full_name,
      private_: selectedRepo.private_,
      html_url: selectedRepo.html_url,
      description: selectedRepo.description,
      userId: userDetail?.id,
      owner: selectedRepo.owner,
    });

    console.log(result.data);
    setIsOpen(false);
    setRefreshPage(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button>+ Add Repo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Repository</DialogTitle>
          <DialogDescription>
            Search and select one of your GitHub repositoies
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Repo List */}
          <ul className="max-h-60 overflow-y-auto border rounded-xl mt-4 hide-scrollbar">
            {filteredRepoList.map((repo) => (
              <li
                key={repo.id}
                className={`p-4 border-b hover:bg-gray-200 cursor-pointer ${
                  selectedRepo?.id === repo.id ? "bg-gray-200" : null
                }`}
                onClick={() => setSelectedRepo(repo)}
              >
                {repo.full_name}
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter className="flex gap-5">
          <DialogClose className="cursor-pointer">Cancel</DialogClose>
          <Button type="submit" disabled={!selectedRepo} onClick={() => SaveRepoToDB()}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RepoDialog;
