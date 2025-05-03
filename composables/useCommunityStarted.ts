export const useCommunityStarted = () => {
  const indicators = useCommunityIndicators();
  return computed(() => communityStarted(indicators.value));
}
