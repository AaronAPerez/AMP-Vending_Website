export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="feedback-specific-layout">
      {children}
    </div>
  );
}