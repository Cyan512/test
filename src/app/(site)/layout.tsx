export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <header>
                este es el header
            </header>
            <main>{children}</main>
            <footer>
                este es el footer
            </footer>
        </>
    );
}