type FormMessageType = {
  error: string | null;
  message: string | null;
};
export default function FormMessage({ error, message }: FormMessageType) {
  if (!error && !message) return null;
  return (
    <div className={`form-message ${error ? "error" : "success"}`}>
      <div className='form-message-icon'>
        {error ? (
          <svg className='icon'>
            <use href='#svg-icon-x'></use>
          </svg>
        ) : (
          <svg className='icon'>
            <use href='#svg-icon-check'></use>
          </svg>
        )}
      </div>
      <div className='form-message-body'>
        <h4>{error || message}</h4>
        <p>
          {error ? "Try again or contact support" : "Operation was successful"}
        </p>
      </div>
    </div>
  );
}
