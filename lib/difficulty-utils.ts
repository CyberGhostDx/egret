export const getDifficultyColor = (level: number) => {
  if (level <= 2) return "bg-[#8ce99a]";
  if (level <= 3) return "bg-[#fcc419]";
  if (level <= 4) return "bg-[#ff922b]";
  return "bg-[#fa5252]";
};
