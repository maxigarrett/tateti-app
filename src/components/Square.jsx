export const Square = ({ children, updateBoard, idx, isSelected }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  // console.log(children);
  const handelClick = () => {
    updateBoard(idx);
  };

  return (
    <div className={className} onClick={handelClick}>
      {children}
    </div>
  );
};
