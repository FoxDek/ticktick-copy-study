type Priority = 'common' | 'low' | 'medium' | 'high';

export const priorityColor: Record<Priority, string> = {
  common: "fill-icons text-transparent",
  low: "!fill-[#4772fa] !text-[#4772fa]",
  medium: "!fill-[#faa80c] !text-[#faa80c]",
  high: "!fill-[#d52b24] !text-[#d52b24]",
};

export const priorityColorCheckmark: Record<Priority, string> = {
  common: "fill-icons text-transparent hover:text-gray-200",
  low: "!fill-[#4772fa] hover:text-[#4772fa]/20",
  medium: "!fill-[#faa80c] hover:text-[#faa80c]/20",
  high: "!fill-[#d52b24] hover:text-[#d52b24]/20",
};