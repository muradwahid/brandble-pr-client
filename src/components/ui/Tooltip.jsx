const Tooltip = ({ className, children }) => {
  return (
    <div
      className={`z-50 invisible group-hover:visible tooltipContainer absolute ${className} transition-all duration-200`}
    >
      <div className="tooltipContent text-center w-full">{children}</div>
    </div>
  );
};

export default Tooltip;

// child invisible group-hover:visible
