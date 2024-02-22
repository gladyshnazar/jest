type HeadingPropsType = {
  children: React.ReactNode;
  render?: React.ReactNode;
};
export default function Heading({ children, render }: HeadingPropsType) {
  return (
    <div className='heading'>
      <h3 className='heading-text'>{children}</h3>
      <div className='heading-render'>{render}</div>
    </div>
  );
}
