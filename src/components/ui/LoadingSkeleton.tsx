interface LoadingSkeletonProps {
  messageLoading : string
}

export const LoadingSkeleton = ({messageLoading}: LoadingSkeletonProps) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <div className="h-10 w-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
    <p className="text-slate-500 font-medium animate-pulse">{messageLoading}</p>
  </div>
);
