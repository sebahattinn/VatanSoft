import React from "react";
import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorScreenProps {
  message: string;
  title?: string;
}

export default function ErrorScreen({
  message,
  title = "Uygulama Başlatılamadı",
}: ErrorScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>

        <div className="text-sm text-muted-foreground text-center space-y-2">
          <p>
            Lütfen teknik destek ile iletişime geçin veya{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              .env
            </code>{" "}
            dosyanızı kontrol edin.
          </p>
          <div className="flex gap-2 justify-center mt-4">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Sayfayı Yenile
            </Button>
            <Button variant="default" onClick={() => window.history.back()}>
              Geri Dön
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
