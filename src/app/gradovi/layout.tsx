import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Development po Gradovima | NextPixel',
  description: 'Profesionalna izrada web stranica i aplikacija u Banja Luci, Sarajevu, Beogradu, Zagrebu i drugim gradovima regiona.',
};

export default function GradoviLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}