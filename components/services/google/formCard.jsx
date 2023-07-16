"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

import { Button } from "@/components/ui/button";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const asyncLocalStorage = {
  setItem(key, value) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },
  getItem(key) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  },
  removeItem(key) {
    return Promise.resolve().then(function () {
      localStorage.removeItem(key);
    });
  },
};

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
  const [rowSelection, setRowSelection] = useState({});

  const [tokenNameError, setTokenNameError] = useState("");
  const [clientIdError, setClientIdError] = useState("");
  const [clientSecretError, setClientSecretError] = useState("");
  const [scopeError, setScopeError] = useState("");

  const handleTokenNameError = (msg) => setTokenNameError(msg);
  const handleClientIdError = (msg) => setClientIdError(msg);
  const handleClientSecretError = (msg) => setClientSecretError(msg);
  const handleScopeError = (msg) => setScopeError(msg);

  const handleTokenNameChange = (e) => {
    setTokenName(e.target.value);
    handleTokenNameError("");
  };
  const handleClientIdChange = (e) => {
    setClientId(e.target.value);
    handleClientIdError("");
  };
  const handleClientSecretChange = (e) => {
    setClientSecret(e.target.value);
    handleClientSecretError("");
  };

  const handleRowSelectionChange = (newSelection) => {
    setRowSelection(newSelection);
    handleScopeError("");
  };

  const [openSubmitLoading, setOpenSubmitLoading] = useState(false);
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);

  const toggleSubmitDialog = () => setOpenSubmitDialog(!openSubmitDialog);

  const [authUrl, setAuthUrl] = useState("");
  const [authUrlOpened, setAuthUrlOpened] = useState(false);

  const handleAuthUrlChange = (e) => setAuthUrl(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tokenName === "") return handleTokenNameError("Token name is required.");
    if (clientId === "") return handleClientIdError("Client ID is required.");
    const domainRegex = new RegExp(/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/);
    if (!domainRegex.test(clientId)) return handleClientIdError("Client ID must be a domain.");
    if (clientSecret === "") return handleClientSecretError("Client secret is required.");
    if (Object.keys(rowSelection).length === 0)
      return handleScopeError("Please select at least one scope.");

    const selectedScopes = Object.keys(rowSelection).map((index) => data[index].id);

    const body = {
      name: tokenName,
      clientId: clientId,
      clientSecret: clientSecret,
      scopes: selectedScopes,
    };

    setOpenSubmitLoading(true);
    const response = await axios.post("/api/google/authurl", body);
    setOpenSubmitLoading(false);

    setAuthUrl(response.data.authUrl);
    toggleSubmitDialog();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    router.back();
  };

  const [authCode, setAuthCode] = useState("");

  useEffect(() => {
    if (authUrlOpened) {
      const checkLocalStorage = async () => {
        const value = await asyncLocalStorage.getItem("gdriveCode");

        if (value) {
          setAuthCode(value);
          await asyncLocalStorage.removeItem("gdriveCode");
          return;
        }
        setTimeout(checkLocalStorage, 1000);
      };

      checkLocalStorage();
    } else {
      localStorage.removeItem("gdriveCode");
    }
  }, [authUrlOpened]);

  const [copyToClipboardText, setCopyToClipboardText] = useState("Copy to Clipboard");

  const handleCopyAuthCodeToClipboard = () => {
    navigator.clipboard.writeText(authCode);

    setCopyToClipboardText("Copied! ✅");
    setTimeout(() => setCopyToClipboardText("Copy to Clipboard"), 3000);
  };

  const openUrlInNewTab = () => {
    setAuthUrlOpened(true);
    window.open(authUrl, "_blank", "noopener noreferrer");
  };

  return (
    <>
      <Card className="h-[80%] w-[100%] flex flex-col justify-center overflow-hidden">
        <CardHeader>
          <Image
            className="pb-5"
            src="/images/services/google-logo-9834.png"
            width={100}
            height={50}
            alt="google-logo"
          />
          <CardTitle>Create Token</CardTitle>
          <CardDescription>Generate your Google API token in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Token Name</Label>
                <Input
                  id="tokenName"
                  type="text"
                  value={tokenName}
                  onChange={handleTokenNameChange}
                  error={tokenNameError !== ""}
                />
                {tokenNameError !== "" && <p className="text-red-500 text-sm">{tokenNameError}</p>}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Client ID</Label>
                <Input
                  id="clientId"
                  tyoe="text"
                  placeholder="Client ID of your project"
                  value={clientId}
                  onChange={handleClientIdChange}
                  error={clientIdError !== ""}
                />
                {clientIdError !== "" && <p className="text-red-500 text-sm">{clientIdError}</p>}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Client Secret</Label>
                <Input
                  id="clientSecret"
                  type="password"
                  placeholder="Client Secret of your project"
                  value={clientSecret}
                  onChange={handleClientSecretChange}
                  error={clientSecretError !== ""}
                />
                {clientSecretError !== "" && (
                  <p className="text-red-500 text-sm">{clientSecretError}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="datatable">Scopes</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={scopeError ? "destructive" : "outline"}>Select Scopes</Button>
                  </DialogTrigger>
                  <DialogContent className="md:max-w-[500px] md:max-h-[535px] sm:max-w-[100%] sm:max-h-[90%]">
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
                        onRowSelectionChange={handleRowSelectionChange}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                {scopeError !== "" && <p className="text-red-500 text-sm">{scopeError}</p>}
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

      <Dialog open={openSubmitLoading} onOpenChange={setOpenSubmitLoading}>
        <DialogContent className="md:max-w-[500px] sm:overflow-y-scroll sm:max-w-[100%] sm:max-h-[90%]">
          <DialogHeader>
            <DialogTitle>Loading</DialogTitle>
            <DialogDescription>
              Please wait while we generate your auth link. This may take a while.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openSubmitDialog} onOpenChange={setOpenSubmitDialog}>
        <DialogContent className="md:max-w-[500px] sm:overflow-y-scroll sm:max-w-[100%] sm:max-h-[90%]">
          <DialogHeader>
            <DialogTitle>
              Generate auth details for <span className="font-bold">{tokenName}</span>
            </DialogTitle>
            <DialogDescription>
              Complete the following steps to generate auth details for your project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!authCode ? (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Auth Url</Label>
                  <Input
                    id="authUrl"
                    type="text"
                    placeholder="Auth URL of your project"
                    value={authUrl}
                    onChange={handleAuthUrlChange}
                  />
                  <p className="text-gray-500 text-sm">
                    Changing the auth url will invalidate the previous API details.
                  </p>
                </div>

                <Button onClick={openUrlInNewTab}>Open link in new tab</Button>
              </>
            ) : (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Copy the code</Label>
                <Input
                  id="authUrl"
                  type="password"
                  placeholder="Auth URL of your project"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  disabled={true}
                />
                <p className="text-gray-500 text-sm">
                  The code will be automatically added here when you complete the auth flow.
                </p>
                <Button onClick={handleCopyAuthCodeToClipboard} disabled={!authCode}>
                  {copyToClipboardText}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
