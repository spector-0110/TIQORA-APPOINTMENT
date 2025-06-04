"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

export function NavbarMain() {
  const navItems = [
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact-us",
    },
  ];
  const handleScroll = (e, link) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(link);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full md-20">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody  visible={true}>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="primary" href={'https://hospital.tempus.vatsa.works'} target={'_blank'}>Explore Now</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav visible={true} >
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              // <a
              //   key={`mobile-link-${idx}`}
              //   href={item.link}
              //   onClick={(e) => {
              //     e.preventDefault();
              //     setIsMobileMenuOpen(false);
              //     item.onClick?.();
              //   }}
              //   className="relative text-neutral-300">
              //   <span className="block">{item.name}</span>
              // </a>
              <button
                key={`nav-button-${idx}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.onClick) {
                    item.onClick();
                  } else {
                    handleScroll(e, item.link);
                  }
                }}
                className="relative px-4 py-2 text-neutral-200 hover:text-neutral-100 transition-colors duration-300"
              >
                <span className="relative z-20">{item.name}</span>
              </button>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                href={'https://hospital.tempus.vatsa.works'}
                target={'_blank'}
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* Navbar */}
    </div>
  );
}
