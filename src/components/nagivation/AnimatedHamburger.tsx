import { MotionProps, motion } from "framer-motion";

// MotionProps & d: any
const Path = (
  props: MotionProps & { d?: string; theme?: "dark" | "light" }
) => (
  <motion.path
    fill="transparent"
    strokeWidth="1.5"
    stroke={props.theme === "dark" ? "hsl(0, 0%, 18%)" : "hsl(0, 0%, 100%)"}
    strokeLinecap="round"
    {...props}
  />
);

const transition = {
  duration: 0.1,
  stiffness: 420,
  damping: 16,
  type: "spring",
};

export const MenuToggle = ({
  toggle,
  isOpen,
  theme,
}: {
  toggle: () => void;
  isOpen: boolean;
  theme?: "dark" | "light";
}) => (
  <button onClick={toggle}>
    <svg width="25" height="25" viewBox="0 0 25 25">
      <Path
        animate={isOpen ? "open" : "closed"}
        initial={false}
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5", transition },
          open: { d: "M 3 16.5 L 17 2.5", transition },
        }}
        theme={theme}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        animate={isOpen ? "open" : "closed"}
        initial={false}
        variants={{
          closed: { opacity: 1, transition },
          open: { opacity: 0, transition },
        }}
        theme={theme}
      />
      <Path
        animate={isOpen ? "open" : "closed"}
        initial={false}
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346", transition },
          open: { d: "M 3 2.5 L 17 16.346", transition },
        }}
        theme={theme}
      />
    </svg>
  </button>
);

export default MenuToggle;
