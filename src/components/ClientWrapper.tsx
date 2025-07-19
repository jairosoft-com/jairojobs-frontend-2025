'use client';

// Client-side wrapper component
export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
