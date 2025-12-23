import Container from "@/components/ui/Container";
import Divider from "@/components/ui/Divider";

export default function Footer() {
  return (
    <footer className="py-12">
      <Container>
        <Divider className="mb-8" />
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Copyright */}
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} Offset Studio. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}



