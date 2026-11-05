
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type Event = {
  _id: string;
};

type DeleteEventDialogProps = {
  data: Event;
};

const handleDeleteEvent = async ({ data }: DeleteEventDialogProps) => {
  // JWT client components
  const token = await getTokenFromClient()
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/upcoming-events/${data._id}`,
    {
      method: "DELETE",
      headers:{
        authorization: `Bearer ${token}`,
      }
      
    }
  );

  const result = await res.json();

  if (res.ok) {
    toast.success("Event deleted successfully!");
    window.location.reload();
  } else {
    toast.error(result.message || "Failed to delete event.");
  }
};

const DeleteEventDialog = ({ data }: DeleteEventDialogProps) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <button
              type="button"
              className="flex h-8 items-center justify-center gap-1 rounded-sm bg-[#fbe9e5] px-2.5 text-[11px] font-medium text-[#a64e3d] transition-colors hover:bg-[#f5d8d1] dark:bg-[#422a25] dark:text-[#e99b87] dark:hover:bg-[#55352e]"
            >
              <Trash2 className="size-3.5" />
              Delete
            </button>
          }
        />

        <AlertDialogContent className="max-w-md rounded-lg border border-[#e5ebe4] bg-[#faf8f5] p-6 dark:border-[#405345] dark:bg-[#17251c]">
          <AlertDialogHeader className="gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-[#fbe9e5] dark:bg-[#422a25]">
              <Trash2 className="size-5 text-[#b4533d] dark:text-[#e99b87]" />
            </div>

            <AlertDialogTitle className="text-lg font-bold text-[#1a4332] dark:text-[#edf4ed]">
              Delete This Event?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm leading-6 text-[#5c665e] dark:text-[#aab9ad]">
              Are you sure you want to permanently delete this event from CIVORA?
              This action cannot be undone, and the event will be removed from
              the event listings.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-3 flex-row justify-end gap-2">
            <AlertDialogCancel className="h-10 rounded-sm border-[#dce6dc] bg-[#e5eee5] px-5 text-xs font-medium text-[#435c49] hover:bg-[#dce8dc] hover:text-[#234635] dark:border-[#405345] dark:bg-[#263a2d] dark:text-[#c2cec4] dark:hover:bg-[#344d3b] dark:hover:text-[#edf4ed]">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              className="h-10 rounded-sm bg-[#b4533d] px-5 text-xs font-medium text-white hover:bg-[#963e2d] dark:bg-[#a64e3d] dark:hover:bg-[#c15f3c]"
              onClick={() => handleDeleteEvent({ data })}
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteEventDialog;
