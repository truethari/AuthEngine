"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/common/datatable";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "scope",
    header: "Scope",
  },
];

const data = [
  {
    id: "https://www.googleapis.com/auth/calendar",
    scope: "calendar",
  },
  {
    id: "https://www.googleapis.com/auth/drive",
    scope: "drive",
  },
  {
    id: "https://www.googleapis.com/auth/gmail.readonly",
    scope: "gmail.readonly",
  },
  {
    id: "https://www.googleapis.com/auth/youtube",
    scope: "youtube",
  },
  {
    id: "https://www.googleapis.com/auth/contacts.readonly",
    scope: "contacts.readonly",
  },
  {
    id: "https://www.googleapis.com/auth/admin.directory.user.readonly",
    scope: "admin.directory.user.readonly",
  },
  {
    id: "https://www.googleapis.com/auth/spreadsheets",
    scope: "spreadsheets",
  },
  {
    id: "https://www.googleapis.com/auth/cloud-platform",
    scope: "cloud-platform",
  },
  {
    id: "https://www.googleapis.com/auth/books",
    scope: "books",
  },
  {
    id: "https://www.googleapis.com/auth/fitness.activity.read",
    scope: "fitness.activity.read",
  },
  {
    id: "https://www.googleapis.com/auth/tasks",
    scope: "tasks",
  },
  {
    id: "https://www.googleapis.com/auth/photoslibrary",
    scope: "photoslibrary",
  },
  {
    id: "https://www.googleapis.com/auth/analytics.readonly",
    scope: "analytics.readonly",
  },
  {
    id: "https://www.googleapis.com/auth/adsense.readonly",
    scope: "adsense.readonly",
  },
  {
    id: "https://www.googleapis.com/auth/androidpublisher",
    scope: "androidpublisher",
  },
  {
    id: "https://www.googleapis.com/auth/bigquery",
    scope: "bigquery",
  },
  {
    id: "https://www.googleapis.com/auth/firebase.messaging",
    scope: "firebase.messaging",
  },
];

export default function FormCard() {
  const router = useRouter();

  const [tokenName, setTokenName] = useState(`gdrive-${Date.now()}`);
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [rowSelection, setRowSelection] = React.useState({});

  const handleTokenNameChange = (e) => setTokenName(e.target.value);
  const handleClientIdChange = (e) => setClientId(e.target.value);
  const handleClientSecretChange = (e) => setClientSecret(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedScopes = Object.keys(rowSelection).map((index) => data[index].id);

    const body = {
      name: tokenName,
      clientId: clientId,
      clientSecret: clientSecret,
      scopes: selectedScopes,
    };

    console.log(body);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <Card className="h-[80%] w-[100%] flex flex-col justify-center">
      <CardHeader>
        <CardTitle>Create Token</CardTitle>
        <CardDescription>Generate your Google API token in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Token Name</Label>
              <Input id="name" value={tokenName} onChange={handleTokenNameChange} />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Client ID</Label>
              <Input
                id="name"
                placeholder="Client ID of your project"
                value={clientId}
                onChange={handleClientIdChange}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Client Secret</Label>
              <Input
                id="name"
                placeholder="Client Secret of your project"
                value={clientSecret}
                onChange={handleClientSecretChange}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="datatable">Scopes</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Select Scopes</Button>
                </DialogTrigger>
                <DialogContent className="md:max-w-[500px] sm:max-h-[500px] sm:overflow-y-scroll sm:max-w-[100%] sm:max-h-[90%]">
                  <DialogHeader>
                    <DialogTitle>Select API Scopes</DialogTitle>
                    <DialogDescription>
                      Select scopes here. Click close button when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <DataTable
                      id="datatable"
                      columns={columns}
                      data={data}
                      rowSelection={rowSelection}
                      onRowSelectionChange={setRowSelection}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
