import { useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const pathname = useLocation().pathname;

  const crumbsArray = [
    "",
    ...pathname.split("/").filter(crumb => crumb !== ""),
  ];

  return (
    <div className='breadcrumbs'>
      {crumbsArray.map((crumb, index) => (
        <div
          className={`crumb ${index === crumbsArray.length - 1 ? "last" : ""}`}
          key={crumb}
        >
          {index === 0 ? (
            <span>Home</span>
          ) : (
            <span>{crumb.charAt(0).toUpperCase() + crumb.slice(1)}</span>
          )}
          {index !== crumbsArray.length - 1 && (
            <div className='crumb-arrow'>
              <svg className='icon'>
                <use href='#svg-icon-angle-right'></use>
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
