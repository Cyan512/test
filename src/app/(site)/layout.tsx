import { Footer } from "@/src/components/footer";
import { Header } from "@/src/components/header";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}