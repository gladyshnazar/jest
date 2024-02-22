import ModalProvider from "@/components/providers/ModalProvider";
import FilterBlock from "@/modules/shop/components/FilterBlock";
import { useAppSelector } from "@/hooks/redux";
import { selectModal } from "@/redux/modal/selectors";
import { FiltersType } from "@/modules/shop/hooks/use-filters";

export default function Filter({ filters }: { filters: FiltersType }) {
  const modal = useAppSelector(selectModal);

  if (modal !== "filter") return null;
  return (
    <ModalProvider position='left'>
      <div className='modal-content-filter'>
        <FilterBlock filters={filters} />
      </div>
    </ModalProvider>
  );
}
