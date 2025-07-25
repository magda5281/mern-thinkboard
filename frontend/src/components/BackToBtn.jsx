import { Link } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';

const BackToBtn = ({ to, label }) => {
  return (
    <Link to={to} className='btn btn-ghost mb-6'>
      <ArrowLeftIcon className='size-5' />
      {label}
    </Link>
  );
};

export default BackToBtn;
