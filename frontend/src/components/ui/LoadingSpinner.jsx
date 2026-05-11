export default function LoadingSpinner({ fullPage = false }) {
  const inner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
        style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }}
      />
      <p className="text-sm" style={{ color: "var(--color-secondary)" }}>Loading...</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {inner}
      </div>
    );
  }

  return <div className="py-16 flex justify-center">{inner}</div>;
}
