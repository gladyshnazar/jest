import { Fragment } from "react";
import { useParams } from "react-router-dom";

import FilterBlock from "@/modules/shop/components/FilterBlock";
import ShopToolbar from "@/modules/shop/components/ShopToolbar";

import { ModalTrigger } from "@/components/providers/ModalProvider";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import SpinnerProvider from "@/components/providers/SpinnerProvider";
import Filter from "@/components/modals/Filter";

import useShop from "./hooks/use-shop";
import usePagination from "./hooks/use-pagination";
import useFilters from "./hooks/use-filters";

export default function Shop() {
  const { slug } = useParams();
  const { data, isLoading } = useShop(slug!);

  const { data: paginatedData, pagination } = usePagination(data, 12);

  const filters = useFilters();

  return (
    <Fragment>
      <PageHeader page='Shop' />
      <ShopToolbar
        isLoading={isLoading}
        productsCount={data.length}
        sort={filters.sort}
      />
      <div className='shop-main'>
        <div className='container'>
          <div className='shop-inner'>
            <aside className='mobile-hidden'>
              <FilterBlock filters={filters} />
            </aside>
            <div className='shop-content'>
              <SpinnerProvider isSpinning={isLoading} hideContent variant='lg'>
                <div className='shop-products'>
                  {paginatedData.map(product => (
                    <ProductCard data={product} key={product._id} />
                  ))}
                </div>
              </SpinnerProvider>

              <ModalTrigger
                modal='filter'
                className='filter-button red desktop-hidden'
              >
                Filter
              </ModalTrigger>

              {pagination}
            </div>
          </div>
        </div>
      </div>
      <Filter filters={filters} />
    </Fragment>
  );
}
