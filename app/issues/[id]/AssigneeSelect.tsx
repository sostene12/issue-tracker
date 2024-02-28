"use client";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Skeleton from '@/app/components/Skeleton';

const AssigneeSelect = ({issue}:{issue:Issue}) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 100, //60 seconds
    retry:3 
  });

  if(isLoading) return <Skeleton />

  if(error) return null;


  return (
    <>
    <Select.Root defaultValue={issue.assignedToUserId || ""} onValueChange={ async (userId) => {
      try {
        await axios.patch(`/api/issues/${issue.id}`, { assignedToUserId: userId || null });
      } catch (error) {
        toast.error('Changes could not be saved.')
      }
    }  }>
      <Select.Trigger aria-placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
    <Toaster />
    </>
  );
};

export default AssigneeSelect;
