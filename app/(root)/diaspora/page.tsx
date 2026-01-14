import { Metadata } from "next";
import { DiasporaHero, DiasporaPageContent } from "@/components";
import { mockDiasporaPosts } from "@/data/mockDiaspora";

export const metadata: Metadata = {
  title: "Ghana Diaspora Hub | Ghana Notice Board",
  description:
    "Connect with Ghanaians worldwide. Immigration updates, embassy notices, diaspora events, investment opportunities, and success stories from the Ghana community abroad.",
  keywords: [
    "Ghana diaspora",
    "Ghanaians abroad",
    "immigration updates",
    "embassy notices",
    "diaspora events",
    "investment opportunities Ghana",
    "Ghana UK",
    "Ghana USA",
    "Ghana community",
    "diaspora networking",
  ],
  openGraph: {
    title: "Ghana Diaspora Hub | Ghana Notice Board",
    description:
      "Connect with Ghanaians worldwide. Updates, events, and opportunities for the diaspora.",
    images: [{ url: "/og-diaspora.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghana Diaspora Hub | Ghana Notice Board",
    description:
      "Connect with Ghanaians worldwide. Updates, events, and opportunities.",
    images: ["/og-diaspora.jpg"],
  },
};

const DiasporaPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <DiasporaHero />

      {/* Content Section */}
      <DiasporaPageContent initialPosts={mockDiasporaPosts} />
    </main>
  );
};

export default DiasporaPage;