"use client";;
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Link from "next/link";


import React, { useRef, useState } from "react";


export const Navbar = ({
  children,
  className
}) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("fixed inset-x-0 md-10 z-40 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child)}
    </motion.div>
  );
};

export const NavBody = ({
  children,
  className,
  visible
}) => {
  return (
    <motion.div
      animate={{
        // backdropFilter: visible ? "blur(1000px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "60%" : "100%",
        y: visible ? 10 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 py-2 md:flex",
        visible && "bg-white/95 backdrop-blur-md border border-white/20",
        className
      )}>
      {children}
    </motion.div>
  );
};

export const NavItems = ({
  items,
  className,
  onItemClick
}) => {
  const [hovered, setHovered] = useState(null);

  const handleScroll = (e, link) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(link);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      if (onItemClick) onItemClick();
    }
  };

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-gray-700 transition duration-200 hover:text-gray-900 md:flex md:space-x-2",
        className
      )}>
      {items.map((item, idx) => (
        <button
          key={`nav-button-${idx}`}
          onMouseEnter={() => setHovered(idx)}
          onClick={(e) => {
            e.preventDefault();
            if (item.onClick) {
              item.onClick();
            } else {
              handleScroll(e, item.link);
            }
          }}
          className="relative px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-300"
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-blue-50 border border-blue-100"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </button>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({
  children,
  className,
  visible
}) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "8px" : "2rem",
        y: visible ? 10 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center self-start justify-between rounded-full px-0 py-2 md:hidden text-gray-700",
        visible && "bg-white/95 backdrop-blur-md border border-white/20",
        className
      )}>
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className
}) => {
  return (
    <div
      className={cn("flex w-full flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white/95 backdrop-blur-md border border-white/20 px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] text-gray-700",
            className
          )}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick
}) => {
  return isOpen ? (
    <IconX className="text-gray-700" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-gray-700" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="/"
      className="relative z-20 h-12 w-12 *:hover:opacity-40 transition-opacity duration-500 bg-neutral rounded-lg">
      <img
        style={{ backgroundColor: 'white' }}
        src="/Tiqora1.png"
        alt="Tiqora Logo"
        className="h-12 w-12 object-cover *:hover:opacity-40 transition-opacity duration-500 rounded-lg"
      />
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  target,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 hover:from-blue-600 hover:to-blue-700 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_4px_14px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)]",
    secondary: "bg-transparent shadow-none text-gray-700 hover:text-gray-900",
    dark: "bg-gray-800 text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      target={target}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}>
      {children}
    </Tag>
  );
};
