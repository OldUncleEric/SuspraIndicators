export default function(scores: Map<string, number>) {
  return (scores.get('community') ?? 0)
    + (scores.get('food') ?? 0)
    + (scores.get('water') ?? 0)
    + (scores.get('movement') ?? 0)
    + (scores.get('energy') ?? 0)
    + (scores.get('goods') ?? 0)
    + (scores.get('habitat') ?? 0);
}