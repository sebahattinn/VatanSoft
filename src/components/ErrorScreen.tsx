import React from "react";

interface ErrorScreenProps {
  message: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message }) => {
  return (
    <div className="flex h-screen items-center justify-center text-red-800 px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-3xl font-bold mb-4">Uygulama Başlatılamadı</h1>
        <p className="mb-2 text-lg">{message}</p>
        <p className="text-sm text-red-600">
          Lütfen teknik destek ile iletişime geçin veya <code>.env</code>{" "}
          dosyanızı kontrol edin.
        </p>
      </div>
    </div>
  );
};

export default ErrorScreen;
