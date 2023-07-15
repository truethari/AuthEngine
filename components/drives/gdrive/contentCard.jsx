import React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContentCard() {
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
            <p>
              <span className="font-semibold">Step 1:</span> Go to{" "}
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
