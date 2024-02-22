import React from "react";

type SpinnerProviderPropsType = {
  children: React.ReactNode;
  isSpinning: boolean;
  hideContent?: boolean;
  transparentBackground?: boolean;
  variant?: "sm" | "md" | "lg";
};
export default function SpinnerProvider({
  children,
  isSpinning,
  hideContent = false,
  transparentBackground = false,
  variant = "md",
}: SpinnerProviderPropsType) {
  const child = React.Children.only(children) as React.ReactElement;

  return React.cloneElement(child, {
    style: { position: "relative", ...(child.props.style || {}) },
    children: (
      <>
        {!(hideContent && isSpinning) && child.props.children}
        {isSpinning && (
          <div
            className={`spinner-container ${
              transparentBackground ? "transparent" : ""
            }`}
          >
            <div className={`spinner ${variant}`}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </>
    ),
  });
}
