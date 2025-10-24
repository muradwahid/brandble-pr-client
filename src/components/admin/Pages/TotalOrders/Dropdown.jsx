const Dropdown = ({ active, onClick, items = ["asc", "dsc"],ref, className }) => {
  return (
    <div className={`absolute top-[30px] w-full left-0 bg-white group-hover:visible border border-[#DCDEDF] py-1 px-1.5 rounded-sm ${className}`} ref={ref}>
      <div>
        {items.map((item, index) => (
          <p
            key={index}
            className={`text-[#878C91] text-sm capitalize py-1 mb-0.5 hover:bg-[#F6F7F7] transition-all cursor-pointer duration-200 px-1 rounded-sm ${
              active == item ? "bg-[#F6F7F7]" : ""
            } `}
            onClick={() => onClick(item)}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
