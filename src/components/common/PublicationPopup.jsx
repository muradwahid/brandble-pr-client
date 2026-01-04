import { Link } from 'react-router';

const PublicationPopup = ({ publications = [], setSearch, isLoading, isFetching }) => {

  return (
    <div className='absolute bg-white shadow-2xl w-full max-h-[40dvh] overflow-auto z-50 top-[100%] border border-[#DCDEDF] p-3 pb-0 rounded-sm'>
      {
        (isLoading || isFetching) ? <div className='h-10 w-full flex items-center justify-center pb-3'>Loading...</div> :  publications?.length > 0 ? publications.map(publication => <div onClick={() => setSearch('')} key={publication?.id} className='mb-3'>
          <Link to={`/admin/publications/${publication?.id}`} className='flex gap-3'>
            <div className='h-12 w-12'>
              <img className='w-full h-auto rounded-sm my-auto' src={publication?.logo}></img>
            </div>
            <div>
              <p className='text-[#5F6368]'>{publication?.title}</p>
              <small className='text-[#B2B5B8]'>Genre: {publication?.genre}</small>
            </div>

          </Link>
        </div>) : <div className='h-10 w-full flex items-center justify-center pb-3' > Publication not found</div>
      }
    </div>
  );
};

export default PublicationPopup;