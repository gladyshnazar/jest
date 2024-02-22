type InputErrorTypes = {
  error: string | null;
};

export default function InputError({ error }: InputErrorTypes) {
  return <div className='input-error'>{error}</div>;
}
