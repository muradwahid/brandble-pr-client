import { useForm } from "react-hook-form";
import { useUserLoginMutation } from "../../redux/api/authApi";
import { LoadingIcon } from "../../utils/icons";
import toast from "react-hot-toast";
import { storeUserInfo } from "../../helpers/user/user";
import { Navigate, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [userLogin, { isLoading }] = useUserLoginMutation();

  const onSubmit = async (data) => {
    let time;
    try {
      const result = await userLogin(data);
      console.log(result);
      // Handle successful login (redirect, store token, etc.)
      console.log('Login successful:', result);
      if (result?.error) {
        const err= result.error;
        if (err.message == 'User not found') {
          toast.error('User not found. Please check your email.');
          // setError('email', { type: 'manual', message: 'User not found. Please check your email.' });
        }if (err.message == 'Invalid password') {
          setError('password', { type: 'manual', message: 'Invalid password. Please try again.' });
        } else {
          toast.error(err.message || 'Login failed. Please try again.');
        }
        return; 
      }
      if (result.data?.accessToken) {
        storeUserInfo({ accessToken: result.data.accessToken });
        // Reset form on success
        reset();
        toast.success('Login successful!');
        time=setTimeout(() => {
          navigate("/admin/dashboard", { replace: true });
        }, 500);
      } else {
        toast.error('Login failed. Please try again.');
      }


    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        toast.error('Login failed. Please try again.');
    }
    return () => clearTimeout(time);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-[846px] w-full mx-auto border-l border-t border-b-[5px] border-r-[5px] py-14">
        <div className="w-full">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-glare text-[#171819]">Unlock Full Access to Your PR Success</h2>
            <p className="text-[18px] text-[#36383A] mt-2 tracking-[0.15px]">Log in to submit articles, track progress, or order new content.</p>
          </div>
          <div>
            {/* google and apple login */}
            <div>

            </div>
            {/* email and password login */}
            <div className="mt-6 max-w-[438px] mx-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-poppins text-[#5F6368] mb-2">Email</label>
                  <input type="email" id="email" {...register('email', { required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address.' } })} className="w-full text-sm bg-[#F6F7F7] border border-[#DCDEDF] p-3 outline-0" placeholder="Enter email" />
                  {errors.email && (
                    <span className="text-red-400 text-xs">{errors.email.message}</span>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-poppins text-[#5F6368] mb-2">Password</label>
                  <input type="password" id="password" {...register('password', { required: 'Password is required'
                  })} className="w-full text-sm bg-[#F6F7F7] border border-[#DCDEDF] p-3 outline-0" placeholder="Enter password" />
                  {errors.password && (
                    <span className="text-red-400 text-xs">{errors.password.message}</span>
                  )}
                </div>
                <button type="submit" disabled={isLoading} className="w-full flex gap-3 justify-center cursor-pointer bg-[#002447] px-2.5 py-3 text-white hover:bg-[#0c3761] transition duration-300">Sign In {isLoading &&<LoadingIcon fill='#fff' style={{ height: "20px" }} />}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;