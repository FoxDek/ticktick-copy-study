import { cva } from "class-variance-authority";

const switchButton = cva("switch bg-gray-200 h-4.5 rounded-full aspect-[2/1] flex items-center p-[1px] cursor-pointer duration-300 ease-in-out", {
  variants: {
    active: {
      true: 'bg-purple-400',
      false: '',
    }
  }
});

const switchButtonToggler = cva("switchButtonToggler h-full aspect-square rounded-full bg-white duration-300 ease-in-out", {
  variants: {
    active: {
      true: 'translate-x-4.5',
      false: '',
    }
  }
});

interface SwitchButtonProps {
  active: boolean;
  onToggle: () => void;
}

export default function SwitchButton({active, onToggle}: SwitchButtonProps) {
  return (
    <div className={switchButton({active})} onClick={onToggle}>
      <figure className={switchButtonToggler({active})}></figure>
    </div>
  );
}