import Breadcrumbs from "@components/Breadcrumbs";

export default function PageHeader({ page }: { page: string }) {
  return (
    <header className='page-header-section'>
      <div className='container'>
        <div className='page-header-inner'>
          <Breadcrumbs />
          {page && <h2>{page}</h2>}
        </div>
      </div>
    </header>
  );
}
