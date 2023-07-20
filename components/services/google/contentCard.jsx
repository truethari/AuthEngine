"use client";

import React, { useState, useEffect } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContentCard() {
  const [host, setHost] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    setHost(url.origin);
  }, []);

  return (
    <Card className="w-[100%]">
      <CardHeader>
        <CardTitle>How to</CardTitle>
        <CardDescription>
          How to get Google Client ID and Client Secret and select what is the suitable scope to
          your project
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[500px] overflow-y-scroll">
        <form>
          <div className="grid w-full items-center gap-4">
            <span className="font-semibold">
              Step 1: Set up a Project in the Google Cloud Platform (GCP) Console
            </span>
            <ul>
              <li>
                1. Go to the GCP Console (console.cloud.google.com) and create a new project or
                select an existing project.
              </li>
              <li>2. Make sure you have the necessary permissions to manage the project.</li>
            </ul>
            <span className="font-semibold">Step 2: Enable the Google Identity API</span>
            <ul>
              <li>1. In the GCP Console, go to the &quot;APIs & Services&quot; section.</li>
              <li>2. Click on &quot;Library&quot; in the left sidebar.</li>
              <li>
                3. Search for any API and select the searched API. For example: Google Drive API
              </li>
              <li>4. Click on the &quot;Enable&quot; button to enable the API.</li>
            </ul>

            <span className="font-semibold">Step 3: Create OAuth 2.0 Client Credentials</span>
            <ul>
              <li>1. In the GCP Console, go to the &quot;APIs & Services&quot; section.</li>
              <li>2. Click on &quot;Credentials&quot; in the left sidebar.</li>
              <li>
                3. Click on the &quot;Create Credentials&quot; button and select &quot;OAuth client
                ID&quot; from the dropdown menu.
              </li>
              <li>4. Select the &quot;Web Application&quot; type or any based on your use case.</li>
              <li>
                5. (Important) Enter a name for your OAuth client and specify the authorized
                JavaScript origins or redirect URIs as follows.
                <div className="p-4">
                  <div className="font-semibold text-lime-600"> Origin: {host}</div>
                  <div className="font-semibold text-lime-600">
                    Redirect URI: {host}/api/google/oauth/callback
                  </div>
                </div>
              </li>
              <li>
                6. Click on the &quot;Create&quot; button to generate the client ID and client
                secret.
              </li>
              <li>
                7. Take note of the client ID and client secret, as you will need them in your
                application&apos;s code.
              </li>
              <li>8. Copy the client ID and client secret to the form above.</li>
            </ul>

            <span className="font-semibold">Step 4: Configure OAuth 2.0 Scopes (optional)</span>
            <ul>
              <li>1. In the GCP Console, go to the &quot;APIs & Services&quot; section.</li>
              <li>2. Click on &quot;Credentials&quot; in the left sidebar.</li>
              <li>3. Find your OAuth client credentials and click on the pencil icon to edit.</li>
              <li>
                4. Under the &quot;OAuth consent screen&quot; tab, you can configure the OAuth
                scopes required by your application.
              </li>
              <li>
                5. Click on the &quot;Add or Remove Scopes&quot; button to select the desired
                scopes.
              </li>
              <li>6. Save your changes.</li>
            </ul>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
