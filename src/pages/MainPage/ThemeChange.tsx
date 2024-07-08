import { useThemeStore } from "@/state/themeStore";
import { useState } from "react";
import themes from "@/data/themes.json";

type Props = {};

export function ThemeChange({}: Props) {
  const { theme, setTheme } = useThemeStore();

  const [themeSelectActive, setThemeSelectActive] = useState(false);

  const paintIcon = (
    <svg
      fill={theme.mainText}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24px"
      height="24px"
      viewBox="0 0 31.87 31.87"
      xmlSpace="preserve"
      stroke="#000000"
      transform="rotate(0)"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M24.893,6.205c-1.95-3.218-5.202-5.542-9.127-6.088C8.672-0.866,2.746,4.439,1.066,11.698 c-2.123,9.183,0.275,12.399,4.726,12.532c0.817-0.74,1.83-1.322,2.945-1.666L24.893,6.205z M11.796,5.603 c0.241-1.737,1.846-2.95,3.583-2.709s2.95,1.847,2.709,3.583s-1.846,2.95-3.583,2.709C12.768,8.943,11.556,7.341,11.796,5.603z M5.237,9.045C5.415,7.759,6.605,6.858,7.892,7.04C9.181,7.216,10.079,8.404,9.9,9.693C9.722,10.98,8.531,11.881,7.244,11.7 C5.957,11.523,5.059,10.335,5.237,9.045z M5.902,19.607c-1.288-0.178-2.188-1.365-2.008-2.655 c0.179-1.285,1.369-2.187,2.656-2.005c1.286,0.177,2.187,1.365,2.007,2.653C8.378,18.89,7.189,19.788,5.902,19.607z"></path>{" "}
            <path d="M19.325,21.314l0.324-0.41L31.588,5.342c-0.025-0.255-0.161-0.612-0.609-1.018c-0.885-0.798-1.467-0.407-1.467-0.407 L15.634,17.33l-0.355,0.342L19.325,21.314z"></path>{" "}
            <path d="M14.531,26.638l0.342-0.383l3.733-4.156l-4.071-3.623l-3.707,4.133l-0.343,0.384L14.531,26.638z M12.307,22.386 l1.855-2.104c0.172-0.194,0.468-0.216,0.663-0.042l0.239,0.211c0.093,0.082,0.149,0.195,0.158,0.32 c0.007,0.127-0.034,0.248-0.117,0.342l-1.856,2.104c-0.172,0.193-0.468,0.216-0.663,0.04l-0.237-0.209 c-0.095-0.083-0.15-0.195-0.159-0.32C12.183,22.603,12.225,22.479,12.307,22.386z"></path>{" "}
            <path d="M13.44,27.736L13.44,27.736c0-0.002,0.211-0.336,0.244-0.401l-3.792-3.431c-0.086,0.016-0.167,0.035-0.253,0.054 c-0.009,0.002-0.015,0.005-0.023,0.007c-3.064,0.724-6.078,4.013-3.046,7.7c0.14,0.169,0.366,0.243,0.579,0.188 s0.375-0.229,0.415-0.441c0.088-0.486,0.263-1.018,0.671-1.403C9.167,29.125,11.779,30.549,13.44,27.736z M9.735,28.662 c-0.763,0.029-1.551,0.06-2.152,0.629C7.468,29.4,7.362,29.521,7.27,29.642c-0.106,0.139-0.281,0.207-0.453,0.178 S6.502,29.667,6.449,29.5c-0.171-0.524-0.212-1.092-0.047-1.673c0.095-0.341,0.252-0.657,0.452-0.944 c0.772,0.843,1.447,1.321,2.693,1.209c0.78-0.067,1.497-0.039,2.161,0.14C11.098,28.609,10.428,28.635,9.735,28.662z"></path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );

  return (
    <>
      <div
        className="absolute bottom-2 right-2 hover:cursor-pointer"
        style={{ color: theme.mainText }}
        onClick={() => setThemeSelectActive((t) => (t ? false : true))}
      >
        <div className="flex">
          {paintIcon}
          Change Theme
        </div>
      </div>
      {themeSelectActive && (
        <>
          <div
            className="fixed inset-0 z-10 opacity-50 bg-stone-700"
            onClick={() => setThemeSelectActive(false)}
          ></div>
          <div
            className="absolute z-20 w-5/6 rounded-lg h-5/6 top-20"
            style={{ background: theme.secondaryBg }}
          >
            <option
              className="pl-2 rounded-t-lg hover:cursor-pointer"
              style={{ color: theme.mainText }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = theme.textColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = theme.secondaryBg)
              }
              onClick={() => {
                setThemeSelectActive(false);
                setTheme(themes.default);
              }}
            >
              Default
            </option>
            <option
              className="pl-2 hover:cursor-pointer"
              style={{ color: theme.mainText }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = theme.textColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = theme.secondaryBg)
              }
              onClick={() => {
                setThemeSelectActive(false);
                setTheme(themes.bliss);
              }}
            >
              Bliss
            </option>
            <option
              className="pl-2 hover:cursor-pointer"
              style={{ color: theme.mainText }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = theme.textColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = theme.secondaryBg)
              }
              onClick={() => {
                setThemeSelectActive(false);
                setTheme(themes.cherryBlossom);
              }}
            >
              Cherry Blossom
            </option>
          </div>
        </>
      )}
    </>
  );
}
