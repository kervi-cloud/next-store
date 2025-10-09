import { getProductsActions } from "@/actions/products";
import LeftSort from "@/components/LeftSort";
import { Products } from "@/components/Products";

export default async function Page() {
  const {data} = await getProductsActions();
  return (
    <div className="container flex py-6">
      <LeftSort/>
      <Products products={data} />
    </div>
  )
}
