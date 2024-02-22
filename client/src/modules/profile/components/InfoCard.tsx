type InfoCardPropsType = {
  label: string;
  value: string;
};
export default function InfoCard({ label, value }: InfoCardPropsType) {
  return (
    <div className='info-card'>
      <div className='info-card-label'>{label}</div>
      <div className='info-card-value'>{value}</div>
    </div>
  );
}
