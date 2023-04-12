import clsx from 'clsx';

export const VideoPlayerLoadingSkeleton = ({ isLoading = true }: { isLoading: boolean }) => (

  <div
    className={clsx('bg-gray-400/80 p-4', {
      'relative overflow-hidden flex-1 before:absolute h-full before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent w-full ':
      isLoading,
    })}
  >
    <div className="flex flex-col h-full px-4 h-84 ">
      <div className="mt-2 bg-gray-600 h-4/5" />
      <div className="mt-1 mb-2 bg-gray-600 h-1/5" />
    </div>
  </div>
);

export const SegmentListLoadingSkeleton = ({ isLoading = true }: { isLoading: boolean }) => (

  <div
    className={clsx('bg-gray-400/80 p-2', {
      'relative overflow-hidden flex-1 before:absolute h-full before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent w-auto ':
      isLoading,
    })}
  >
    <div className="flex flex-col items-center justify-center p-8 ">
      <div className="w-full h-12 my-2 bg-gray-600" />
      <div className="w-full h-12 my-2 bg-gray-600" />
      <div className="w-full h-12 my-2 bg-gray-600" />
      <div className="w-full h-12 my-2 bg-gray-600" />
    </div>
  </div>
);

export const StreamListLoadingSkeleton = ({ isLoading = true }: { isLoading: boolean }) => (

  <div
    className={clsx('bg-gray-400/80 p-4', {
      'relative overflow-hidden flex-1 before:absolute h-full before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent w-full ':
      isLoading,
    })}
  >
    <div className="flex flex-col items-center justify-center flex-1 p-4 mt-12 ">
      <div className="w-11/12 h-12 my-4 bg-gray-600 " />
      <div className="w-11/12 h-12 my-4 bg-gray-600" />
      <div className="w-11/12 h-12 my-4 bg-gray-600" />
      <div className="w-11/12 h-12 my-4 bg-gray-600" />
      <div className="w-11/12 h-12 my-4 bg-gray-600" />
      <div className="w-11/12 h-12 my-4 bg-gray-600" />
      <div className="w-11/12 h-12 my-4 bg-gray-600" />
      <div className="w-11/12 h-12 my-4 bg-gray-600" />
    </div>
  </div>
);
