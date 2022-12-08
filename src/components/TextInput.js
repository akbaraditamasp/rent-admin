const { forwardRef } = require("react");

const TextInput = forwardRef(
  ({ containerClassName, className, label, left, ...props }, ref) => {
    return (
      <div className={containerClassName}>
        {label && <label>{label}</label>}
        <div className="h-12 rounded border w-full flex items-center relative">
          <input
            ref={ref}
            className={
              "absolute top-0 left-0 w-full h-full py-2 " +
              (left ? "pl-10 pr-3" : "px-3") +
              " rounded " +
              className
            }
            {...props}
          />
          {left && (
            <div className="w-10 h-full relative flex items-center justify-center">
              {left}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default TextInput;
