import { CartCounter } from "@/app/shopping-cart/CartCounter";

export const metadata = {
  title: 'Counter Page',
  description: 'Counter Page',
};

export default function CounterPage() {

  
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span>Prodcutos en el carrito</span>
      <CartCounter/>
    </div>

  );
}