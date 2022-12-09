import { render } from "@testing-library/react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { Fragment } from "react";

export default function Table({ data = [], columns = [] }) {
  return (
    <div className="h-full w-full border rounded overflow-hidden flex flex-col">
      {data.length ? (
        <Fragment>
          <div className="flex-1 relative w-full">
            <div className="absolute top-0 left-0 w-full h-full">
              <OverlayScrollbarsComponent
                className="w-full h-full"
                options={{ scrollbars: { autoHide: "scroll" } }}
                defer
              >
                <table className="min-w-full table">
                  <thead>
                    <tr>
                      {columns.map(({ containerClassName, label }, index) => (
                        <th key={`${index}`} className={containerClassName}>
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={`${index}`}>
                        {columns.map(
                          ({ increment, data, className, render }, indexx) => (
                            <td key={`${indexx}`} className={className}>
                              {increment
                                ? index + 1
                                : data
                                ? row[data]
                                : render
                                ? render(row)
                                : null}
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </OverlayScrollbarsComponent>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          Belum ada data
        </div>
      )}
    </div>
  );
}
