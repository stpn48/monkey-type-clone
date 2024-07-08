import { useTypingFieldStore } from "@/state/typingFieldStore";
import ModeDisplay from "./ModeDisplay";
import ModeSelector from "./ModeSelector";
import { TypingField } from "./TypingField";

type Props = {};

export function MainPage({}: Props) {
  const { isTyping } = useTypingFieldStore();

  return (
    <div className="mt-10">
      <div className="relative">
        {!isTyping && <ModeSelector />}
        <ModeDisplay />
        <TypingField />
      </div>
    </div>
  );
}
