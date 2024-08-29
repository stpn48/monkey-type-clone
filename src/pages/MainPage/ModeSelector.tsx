import { useModeStore } from "@/state/modeStore";
import { useThemeStore } from "@/state/themeStore";
import { useTypingFieldStore } from "@/state/typingFieldStore";
import { formatTime } from "@/utils/formatTime";
import { useEffect, useState } from "react";

type Props = {};

export default function ModeSelector({}: Props) {
  const theme = useThemeStore((state) => state.theme);
  const { isTyping, setCurrGameMode } = useTypingFieldStore();

  const { timeoutMs, setTimeoutMs, wordCount, setWordCount } = useModeStore();

  const [isHoveringTime, setIsHoveringTime] = useState(false);
  const [isHoveringCount, setIsHoveringCount] = useState(false);

  const [timeSelectActive, setTimeSelectActive] = useState(false);
  const [countSelectActive, setCountSelectActive] = useState(false);

  useEffect(() => {
    setTimeSelectActive(false);
    setCountSelectActive(false);
  }, [isTyping]);

  return (
    <div
      className="absolute px-2 py-1 text-white border rounded-lg -top-10 left-24 w-fit"
      style={{ background: theme.secondaryBg }}
    >
      <button
        className={`transition-all mr-2`}
        style={{ color: isHoveringCount ? theme.mainColor : theme.mainText }}
        onClick={() => {
          if (!isTyping) {
            setCurrGameMode("wordCount");
            setCountSelectActive((c) => {
              if (!c) {
                setTimeSelectActive(false);
                return true;
              }

              return false;
            });
          }
        }}
        onMouseEnter={() => setIsHoveringCount(true)}
        onMouseLeave={() => setIsHoveringCount(false)}
      >
        0/{wordCount}
      </button>
      <button
        className={`transition-all`}
        style={{ color: isHoveringTime ? theme.mainColor : theme.mainText }}
        onClick={() => {
          if (!isTyping) {
            setCurrGameMode("time");
            setTimeSelectActive((c) => {
              if (!c) {
                setCountSelectActive(false);
                return true;
              }

              return false;
            });
          }
        }}
        onMouseEnter={() => setIsHoveringTime(true)}
        onMouseLeave={() => setIsHoveringTime(false)}
      >
        {formatTime(timeoutMs)}
      </button>
      {timeSelectActive && (
        <div className="absolute left-0 z-50 w-full top-6">
          <div
            style={{ color: theme.mainText, background: theme.secondaryBg }}
            className="flex flex-col items-center"
          >
            <option
              className="hover:cursor-pointer"
              onClick={() => {
                setTimeoutMs(120000);
                setTimeSelectActive(false);
              }}
            >
              2 min
            </option>
            <option
              className="hover:cursor-pointer"
              onClick={() => {
                setTimeoutMs(60000);
                setTimeSelectActive(false);
              }}
            >
              1 min
            </option>
            <option
              className="hover:cursor-pointer"
              onClick={() => {
                setTimeoutMs(30000);
                setTimeSelectActive(false);
              }}
            >
              30 sec
            </option>
            <option
              className="hover:cursor-pointer"
              onClick={() => {
                setTimeoutMs(15000);
                setTimeSelectActive(false);
              }}
            >
              15 sec
            </option>
          </div>
        </div>
      )}
      {countSelectActive && (
        <div className="absolute left-0 z-50 w-full border-b border-l border-r rounded-bl-lg top-6">
          <div
            style={{ color: theme.mainText, background: theme.secondaryBg }}
            className="flex flex-col items-center"
          >
            <option
              className="hover:cursor-pointer"
              onClick={() => {
                setWordCount(200);
                setCountSelectActive(false);
              }}
            >
              200
            </option>
            <option
              className="hover:cursor-pointer"
              onClick={() => {
                setWordCount(100);
                setCountSelectActive(false);
              }}
            >
              100
            </option>
            <option
              className="hover:cursor-pointer"
              onClick={() => {
                setWordCount(50);
                setCountSelectActive(false);
              }}
            >
              50
            </option>
            <option
              className="hover:cursor-pointer"
              onClick={() => {
                setWordCount(25);
                setCountSelectActive(false);
              }}
            >
              25
            </option>
          </div>
        </div>
      )}
    </div>
  );
}
