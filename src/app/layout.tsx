// app/layout.js
'use client';

import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>   
          <Toaster position="top-center" />
          {children}
      </body>
    </html>
  );
}