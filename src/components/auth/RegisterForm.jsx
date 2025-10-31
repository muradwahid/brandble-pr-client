import { useForm } from 'react-hook-form';
import { LoadingIcon } from '../../utils/icons';
import { Link, useNavigate } from 'react-router';
import { useCreateUserMutation } from '../../redux/api/authApi';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
      reset
    } = useForm({
      defaultValues: {
        email: '',
        password: '',
        name: ''
      }
    });
  const [createUser, { isLoading }] = useCreateUserMutation();
  const onSubmit = async (data) => {
    const result = await createUser(data);
    if (Object.hasOwn(result, 'data')) {
      toast.success('Registration successful', { duration: 600, id: 'registerSuccess' });
      reset();
      let redirectTime;
      const time = setTimeout(() => {
        toast.dismiss('registerSuccess');
        toast('Redirecting to login page...', { duration: 600, id: 'redirectLogin' });
        redirectTime=setTimeout(() => {
          toast.dismiss('redirectLogin');
          navigate('/auth/login');
        }, 800);
        return () => {
          clearTimeout(redirectTime);
        };
      }, 500);
      return () => clearTimeout(time)
    }
    if (Object.hasOwn(result, 'error')) {
      const errorMessage = result.error.message;
      if (errorMessage == 'User already exists') {
        setError('email', { type: 'manual', message: 'Email is already registered.' });
      }
      // return;
    }
    // reset();
  }
  
  return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-[846px] w-full mx-auto border-l border-t border-b-[5px] border-r-[5px] py-14">
            <div className="w-full">
              <div className="mb-14 text-center">
            <h2 className="text-3xl font-glare text-[#171819]">Create Your PR Success Account</h2>
            <p className="text-[18px] text-[#36383A] mt-2 tracking-[0.15px]">Join today to submit articles, track progress, and access exclusive content.</p>
              </div>
              <div>
                {/* google and apple login */}
                <div>
    
                </div>
                {/* email and password login */}
                <div className="mt-6 max-w-[438px] mx-auto">
                  <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-poppins text-[#5F6368] mb-2">Full Name</label>
                      <input type="name" id="name" {...register('name', { required: 'Full is required.' })} className="w-full text-sm bg-[#F6F7F7] border border-[#DCDEDF] p-3 outline-0" placeholder="Enter your FullName" />
                      {errors.name && (
                        <span className="text-red-400 text-xs">{errors.name.message}</span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-poppins text-[#5F6368] mb-2">Email</label>
                      <input type="email" id="email" {...register('email', { required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address.' } })} className="w-full text-sm bg-[#F6F7F7] border border-[#DCDEDF] p-3 outline-0" placeholder="Enter email" />
                      {errors.email && (
                        <span className="text-red-400 text-xs">{errors.email.message}</span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-sm font-poppins text-[#5F6368] mb-2">Password</label>
                  <input type="password" id="password" {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters long' },
                    pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, message: 'Password must contain at least one letter and one number' }
                      })} className="w-full text-sm bg-[#F6F7F7] border border-[#DCDEDF] p-3 outline-0" placeholder="Enter password" />
                      {errors.password && (
                        <span className="text-red-400 text-xs">{errors.password.message}</span>
                      )}
                    </div>
                <button type="submit"
                  disabled={isLoading}
                  className="w-full flex gap-3 justify-center cursor-pointer bg-[#002447] px-2.5 py-3 text-white hover:bg-[#0c3761] transition duration-300">Sign Up
                  { isLoading && <LoadingIcon fill='#fff' style={{ height: "20px" }} />}</button>
              </form>
              <div className='flex justify-end mt-4'>
                <p className='text-[#2B3D39] text-[16px]'>Already have an account? <Link to={'/auth/login'} className='text-[#008CFF] underline'>Sign In</Link></p>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default RegisterForm;