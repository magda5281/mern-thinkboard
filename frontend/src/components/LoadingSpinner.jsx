import { LoaderIcon } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className='min-h-screen bg-base-200 flex items-center justify-center'>
      <LoaderIcon className='animate-spin size-10' />
    </div>
  );
};

export default LoadingSpinner;
