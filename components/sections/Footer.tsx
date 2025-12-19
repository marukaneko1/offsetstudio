import Container from "@/components/ui/Container";
import Divider from "@/components/ui/Divider";

export default function Footer() {
  return (
    <footer className="py-12">
      <Container>
        <Divider className="mb-8" />
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Email */}
          <a
            href="mailto:hello@offsetstudio.com"
            className="text-white/70 transition-colors hover:text-white"
          >
            hello@offsetstudio.com
          </a>

          {/* Center: Design in Framer */}
          <div className="text-sm text-white/60">
            Design in Framer
          </div>

          {/* Right: Copyright */}
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} Offset Studio. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}

